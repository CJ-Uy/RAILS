<script setup>
import dayjs from "dayjs";
import { useDownloader } from "~/composables/useDownloader";
const { loading, loadingMessage, download } = useDownloader();

const user = inject("user");

const { pending, data: allRequests } = await useLazyFetch(
    "/api/user/student/getAllRequests",
    {
        method: "POST",
        body: {
            userId: user.id,
        },
    },
);
const allRequestsData = ref([]);
const allRequestsRawData = ref([]);
watch(allRequests, (updatedValues) => {
    allRequestsData.value = updatedValues;
    allRequestsRawData.value = allRequestsData.value;
});

async function getAllRequests() {
    const allRequests = await useFetch("/api/user/student/getAllRequests", {
        method: "POST",
        body: {
            userId: user.id,
        },
    });
    allRequestsData.value = allRequests.data.value;
    allRequestsRawData.value = allRequestsData.value;
}

// Sort requests into pending, approved, or for revision
const materialRevision = ref();
const equipmentRevision = ref();
const reagentRevision = ref();
const laboratoryRevision = ref();
function sortRequest(i) {
    if (
        i.equipmentRequestsTeacherApproval === "REVISION_NEEDED" ||
        i.reagentRequestsTeacherApproval === "REVISION_NEEDED" ||
        i.materialRequestsTeacherApproval === "REVISION_NEEDED" ||
        i.laboratoryReservationsTeacherApproval === "REVISION_NEEDED"
    ) {
        materialRevision.value = i.materialRequestsTeacherAnnotation;
        equipmentRevision.value = i.equipmentRequestsTeacherAnnotation;
        reagentRevision.value = i.reagentRequestsTeacherAnnotation;
        laboratoryRevision.value = i.laboratoryReservationsTeacherAnnotation;
        return "teacherRevision";
    }
    if (
        i.equipmentRequestsAdminApproval === "REVISION_NEEDED" ||
        i.reagentRequestsAdminApproval === "REVISION_NEEDED" ||
        i.materialRequestsAdminApproval === "REVISION_NEEDED" ||
        i.laboratoryReservationsAdminApproval === "REVISION_NEEDED"
    ) {
        materialRevision.value = i.materialRequestsAdminAnnotation;
        equipmentRevision.value = i.equipmentRequestsAdminAnnotation;
        reagentRevision.value = i.reagentRequestsAdminAnnotation;
        laboratoryRevision.value = i.laboratoryReservationsAdminAnnotation;
        return "adminRevision";
    }
    if (
        i.equipmentRequestsTeacherApproval === "PENDING" &&
        i.reagentRequestsTeacherApproval === "PENDING" &&
        i.materialRequestsTeacherApproval === "PENDING" &&
        i.laboratoryReservationsTeacherApproval === "PENDING" &&
        i.equipmentRequestsAdminApproval === "PENDING" &&
        i.reagentRequestsAdminApproval === "PENDING" &&
        i.materialRequestsAdminApproval === "PENDING" &&
        i.laboratoryReservationsAdminApproval === "PENDING"
    ) {
        return "teacherPending";
    }
    if (
        i.equipmentRequestsTeacherApproval === "APPROVED" &&
        i.reagentRequestsTeacherApproval === "APPROVED" &&
        i.materialRequestsTeacherApproval === "APPROVED" &&
        i.laboratoryReservationsTeacherApproval === "APPROVED" &&
        i.equipmentRequestsAdminApproval === "PENDING" &&
        i.reagentRequestsAdminApproval === "PENDING" &&
        i.materialRequestsAdminApproval === "PENDING" &&
        i.laboratoryReservationsAdminApproval === "PENDING"
    ) {
        return "adminPending";
    }
    if (
        i.equipmentRequestsAdminApproval === "APPROVED" &&
        i.reagentRequestsAdminApproval === "APPROVED" &&
        i.materialRequestsAdminApproval === "APPROVED" &&
        i.laboratoryReservationsAdminApproval === "APPROVED"
    ) {
        return "approved";
    }
}

const modalIsOpen = ref(false);
const selectedData = ref();
const confirmDelete = ref(false);
function openModal(row) {
    modalIsOpen.value = true;
    selectedData.value = row;
}

async function navigateToRevision() {
    const revisionId = useRevisionId();
    revisionId.value = selectedData.value.id;
    await navigateTo({
        path: "/revisions",
    });
}

async function deleteRequest() {
    try {
        await useFetch("/api/user/student/deleteRequest", {
            method: "POST",
            body: {
                requestId: selectedData.value.id,
            },
        });
        modalIsOpen.value = false;
        confirmDelete.value = false;
        await getAllRequests(); // Refresh the list of requests
    } catch (error) {
        console.error("Error deleting request:", error);
        // Handle error, maybe show a toast notification
    }
}

getAllRequests();
</script>

<template>
    <div>
        <UContainer>
            <div
                v-if="allRequestsData.length == 0"
                class="mt-20 flex items-center justify-center text-3xl"
            >
                <h1>YOU CURRENTLY HAVE NO REQUESTS</h1>
            </div>
            <div
                v-else
                class="m-auto flex w-[95%] flex-col items-start justify-between lg:flex-row"
            >
                <!-- Display Pending Requests -->
                <div class="relative mb-6 w-full lg:mb-0 lg:w-[31%]">
                    <span class="bold mb-[-15px] block text-lg text-gray-500"
                        >Pending</span
                    >
                    <div
                        v-for="request in allRequestsData"
                        :key="request.id"
                        class="mt-5 cursor-pointer"
                        @click="openModal(request)"
                    >
                        <UCard
                            v-if="
                                sortRequest(request) === 'teacherPending' ||
                                sortRequest(request) === 'adminPending'
                            "
                            :ui="{
                                header: { padding: '' },
                                body: { padding: '' },
                                footer: { padding: '' },
                            }"
                            class="shadow-md"
                        >
                            <template #header>
                                <div class="flex flex-row justify-between">
                                    <div
                                        class="flex flex-row items-center justify-start"
                                    >
                                        <div
                                            class="m-2 h-[35px] min-h-[35px] w-[35px] min-w-[35px] rounded border-2"
                                        ></div>
                                        <div class="flex flex-col">
                                            <div
                                                class="mb-[-6px] text-base font-black"
                                            >
                                                Lab Activity
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                {{
                                                    request[
                                                        "gradeSection-grade"
                                                    ]
                                                }}
                                                -
                                                {{
                                                    request[
                                                        "gradeSection-section"
                                                    ]
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="m-2 flex h-[20px] min-h-[20px] w-[70px] min-w-[70px] items-center justify-center self-end rounded text-[10px]"
                                        :class="
                                            sortRequest(request) ===
                                            'teacherPending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'
                                        "
                                    >
                                        TEACHER
                                    </div>
                                </div>
                            </template>

                            <div class="p-1 pl-4">
                                <span class="text-sm font-black"
                                    >Requests:</span
                                >
                                <div
                                    v-for="materialRequest in request.materialsRequested"
                                    :key="materialRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    x{{ materialRequest.quantity }}
                                    {{ materialRequest.name }}
                                </div>
                                <div
                                    v-for="equipmentRequest in request.equipmentRequested"
                                    :key="equipmentRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    x{{ equipmentRequest.quantity }}
                                    {{ equipmentRequest.name }}
                                </div>
                                <div
                                    v-for="reagentRequest in request.reagentsRequested"
                                    :key="reagentRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    {{ reagentRequest.quantity }}
                                    {{ reagentRequest.unit }}
                                    {{ reagentRequest.name }}
                                </div>
                            </div>

                            <template #footer>
                                <!-- Has Custom Venue -->
                                <div
                                    v-if="request.independentLocation"
                                    class="p-1 pl-4"
                                >
                                    <span class="text-sm font-black">
                                        CUSTOM Venue:
                                    </span>
                                    <div
                                        class="pl-5 text-sm text-sm font-black text-gray-700"
                                    >
                                        {{ request.independentLocation }}
                                    </div>
                                    <span class="text-sm font-black">
                                        Date & Time:
                                    </span>
                                    <div
                                        v-for="(startDate, index) in request[
                                            'independentDates-startDate'
                                        ]"
                                        :key="index"
                                    >
                                        <span
                                            class="pl-5 text-sm text-gray-700"
                                        >
                                            {{
                                                dayjs(startDate).format(
                                                    "MMM DD, YYYY",
                                                )
                                            }}
                                            -
                                            {{
                                                dayjs(
                                                    request[
                                                        "independentDates-endDate"
                                                    ][index],
                                                ).format("MMM DD, YYYY")
                                            }}
                                        </span>
                                        <div class="pl-8 text-sm text-gray-700">
                                            {{
                                                request[
                                                    "independentTime-startTime"
                                                ][index]
                                            }}
                                            -
                                            {{
                                                request[
                                                    "independentTime-endTime"
                                                ][index]
                                            }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Has Laboratory Reservation -->
                                <div
                                    v-if="
                                        request.laboratoryReservations.length >
                                        0
                                    "
                                    class="p-1 pl-4"
                                >
                                    <span class="text-sm font-black">
                                        Venue:
                                    </span>
                                    <div
                                        v-for="labReservation in request.laboratoryReservations"
                                        :key="labReservation.id"
                                        class="pl-5 text-sm text-gray-700"
                                    >
                                        {{
                                            labReservation.laboratoryReserved
                                                .name
                                        }}
                                    </div>
                                    <span class="text-sm font-black">
                                        Date & Time:
                                    </span>
                                    <div
                                        v-for="(startDate, index) in request
                                            .laboratoryReservations[0].dates
                                            .startDate"
                                        :key="startDate.id"
                                        class="pl-5 text-sm text-gray-700"
                                    >
                                        {{
                                            dayjs(startDate).format(
                                                "MMM DD, YYYY",
                                            )
                                        }}
                                        -
                                        {{
                                            dayjs(
                                                request
                                                    .laboratoryReservations[0]
                                                    .dates.endDate[index],
                                            ).format("MMM DD, YYYY")
                                        }}
                                        <br />
                                        <div class="mb-1 pl-5">
                                            {{
                                                request
                                                    .laboratoryReservations[0]
                                                    .time.startTime[index]
                                            }}
                                            -
                                            {{
                                                request
                                                    .laboratoryReservations[0]
                                                    .time.endTime[index]
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </div>

                <!-- Display Approved Requests -->
                <div class="mb-6 w-full lg:mb-0 lg:w-[31%]">
                    <span class="bold mb-[-15px] block text-lg text-gray-500"
                        >Scheduled</span
                    >
                    <div
                        v-for="request in allRequestsData"
                        :key="request.id"
                        class="mt-5 cursor-pointer"
                        @click="openModal(request)"
                    >
                        <UCard
                            v-if="sortRequest(request) === 'approved'"
                            :ui="{
                                header: { padding: '' },
                                body: { padding: '' },
                                footer: { padding: '' },
                            }"
                            class="shadow-md"
                        >
                            <div class="flex flex-row justify-between">
                                <div
                                    class="flex flex-row items-center justify-start"
                                >
                                    <div
                                        class="m-2 h-[35px] min-h-[35px] w-[35px] min-w-[35px] rounded border-2"
                                    ></div>
                                    <div class="flex flex-col">
                                        <div
                                            class="mb-[-6px] text-base font-black"
                                        >
                                            Lab Activity
                                        </div>
                                        <div class="text-xs text-gray-400">
                                            {{ request["gradeSection-grade"] }}
                                            -
                                            {{
                                                request["gradeSection-section"]
                                            }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="
                                        request.laboratoryReservations.length >
                                        0
                                    "
                                    class="flex flex-col items-end justify-center p-2 text-xs text-blue-500"
                                >
                                    <div>
                                        {{
                                            request.laboratoryReservations[0]
                                                .laboratoryReserved.name
                                        }}
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>
                <!-- Display Requests for Revision -->
                <div class="w-full lg:w-[31%]">
                    <span class="bold mb-[-15px] block text-lg text-gray-500"
                        >Revision Needed</span
                    >
                    <div
                        v-for="request in allRequestsData"
                        :key="request.id"
                        class="mt-5 cursor-pointer"
                        @click="openModal(request)"
                    >
                        <UCard
                            v-if="
                                sortRequest(request) === 'teacherRevision' ||
                                sortRequest(request) === 'adminRevision'
                            "
                            :ui="{
                                header: { padding: '' },
                                body: { padding: '' },
                                footer: { padding: '' },
                            }"
                            class="shadow-md"
                        >
                            <template #header>
                                <div class="flex flex-row justify-between">
                                    <div
                                        class="flex flex-row items-center justify-start"
                                    >
                                        <div
                                            class="m-2 h-[35px] min-h-[35px] w-[35px] min-w-[35px] rounded border-2"
                                        ></div>
                                        <div class="flex flex-col">
                                            <div
                                                class="mb-[-6px] text-base font-black"
                                            >
                                                Lab Activity
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                {{
                                                    request[
                                                        "gradeSection-grade"
                                                    ]
                                                }}
                                                -
                                                {{
                                                    request[
                                                        "gradeSection-section"
                                                    ]
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="m-2 flex h-[20px] min-h-[20px] w-[70px] min-w-[70px] items-center justify-center self-end rounded bg-red-500 text-[10px]"
                                    >
                                        {{
                                            sortRequest(request) ===
                                            "teacherRevision"
                                                ? "TEACHER"
                                                : "ADMIN"
                                        }}
                                    </div>
                                </div>
                            </template>

                            <div class="p-1 pl-4">
                                <span class="text-sm font-black"
                                    >Requests:</span
                                >
                                <div
                                    v-for="materialRequest in request.materialsRequested"
                                    :key="materialRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    x{{ materialRequest.quantity }}
                                    {{ materialRequest.name }}
                                </div>
                                <div
                                    v-for="equipmentRequest in request.equipmentRequested"
                                    :key="equipmentRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    x{{ equipmentRequest.quantity }}
                                    {{ equipmentRequest.name }}
                                </div>
                                <div
                                    v-for="reagentRequest in request.reagentsRequested"
                                    :key="reagentRequest.id"
                                    class="pl-5 text-sm text-gray-700"
                                >
                                    {{ reagentRequest.quantity }}
                                    {{ reagentRequest.unit }}
                                    {{ reagentRequest.name }}
                                </div>
                            </div>

                            <template #footer>
                                <div
                                    v-if="
                                        request.laboratoryReservations.length >
                                        0
                                    "
                                    class="p-1 pl-4"
                                >
                                    <span class="text-sm font-black"
                                        >Venue:</span
                                    >
                                    <div
                                        v-for="labReservation in request.laboratoryReservations"
                                        :key="labReservation.id"
                                        class="pl-5 text-sm text-gray-700"
                                    >
                                        {{
                                            labReservation.laboratoryReserved
                                                .name
                                        }}
                                    </div>
                                    <span class="text-sm font-black"
                                        >Date & Time:</span
                                    >
                                    <div
                                        v-for="(startDate, index) in request
                                            .laboratoryReservations[0].dates
                                            .startDate"
                                        :key="startDate.id"
                                        class="pl-5 text-sm text-gray-700"
                                    >
                                        {{
                                            dayjs(startDate).format(
                                                "MMM DD, YYYY",
                                            )
                                        }}
                                        -
                                        {{
                                            dayjs(
                                                request
                                                    .laboratoryReservations[0]
                                                    .dates.endDate[index],
                                            ).format("MMM DD, YYYY")
                                        }}
                                        <br />
                                        <div class="mb-1 pl-5">
                                            {{
                                                request
                                                    .laboratoryReservations[0]
                                                    .time.startTime[index]
                                            }}
                                            -
                                            {{
                                                request
                                                    .laboratoryReservations[0]
                                                    .time.endTime[index]
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </div>
            </div>
        </UContainer>
        <UModal
            v-model="modalIsOpen"
            :ui="{ transition: { leave: 'duration-0', enter: 'duration-0' } }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <div
                            class="flex flex-row items-center justify-start space-x-3"
                        >
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                {{
                                    selectedData["requestor-lastName"] +
                                    ", " +
                                    selectedData["requestor-firstName"] +
                                    " (" +
                                    selectedData["gradeSection-grade"] +
                                    " - " +
                                    selectedData["gradeSection-section"] +
                                    ")"
                                }}
                            </h3>
                        </div>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="modalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="mb-5 font-thin">
                    {{ selectedData["requestor-lastName"] }},
                    {{ selectedData["requestor-firstName"] }}<br />
                    {{ selectedData["gradeSection-grade"] }} -
                    {{ selectedData["gradeSection-section"] }}<br />
                    <span class="font-bold">Subject:</span>
                    {{ selectedData.forSubject }}<br />
                    <span class="font-bold">Topic:</span>
                    {{ selectedData.concurrentTopic }}<br />
                    <span class="font-bold">Unit:</span>
                    {{ selectedData["unit-name"] }}<br /><br />
                    <span class="font-bold">Supervising Teacher:</span>
                    {{ selectedData["teacherInCharge-userProfile-lastName"] }},
                    {{ selectedData["teacherInCharge-userProfile-firstName"] }}
                </div>

                <div class="flex items-center justify-between">
                    <UButton
                        :label="loading ? loadingMessage : 'Download Request'"
                        :loading="loading"
                        icon="i-heroicons-arrow-down-tray"
                        @click="download(selectedData.id)"
                    />
                    <UButton
                        v-if="
                            sortRequest(selectedData) === 'teacherPending' ||
                            sortRequest(selectedData) === 'adminPending'
                        "
                        color="red"
                        label="Delete Request"
                        icon="i-heroicons-trash-20-solid"
                        @click="confirmDelete = true"
                    />
                </div>

                <!-- Materials Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Materials
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="material in selectedData.materialsRequested"
                                :key="material.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="flex-1">
                                    {{ material.name }}
                                </div>
                                <div class="flex-1 text-gray-400">
                                    {{ material.description }}
                                </div>
                                <div class="w-[60px] text-right">
                                    x{{ material.quantity }}
                                </div>
                            </div>
                        </div>

                        <template
                            v-if="
                                sortRequest(selectedData) ===
                                    'teacherRevision' ||
                                sortRequest(selectedData) === 'adminRevision'
                            "
                            #footer
                        >
                            <div class="mb-4">
                                <UTextarea
                                    v-model="materialRevision"
                                    disabled
                                    :placeholder="annotationPlaceholder"
                                    color="red"
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Equipment Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Equipment
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="equipment in selectedData.equipmentRequested"
                                :key="equipment.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="basis-[180px]">
                                    {{ equipment.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ equipment.description }}
                                </div>
                                <div class="basis-[60px]">
                                    x{{ equipment.quantity }}
                                </div>
                            </div>
                        </div>

                        <template
                            v-if="
                                sortRequest(selectedData) ===
                                    'teacherRevision' ||
                                sortRequest(selectedData) === 'adminRevision'
                            "
                            #footer
                        >
                            <div class="mb-4">
                                <UTextarea
                                    v-model="equipmentRevision"
                                    disabled
                                    :placeholder="annotationPlaceholder"
                                    color="red"
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Reagents Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Reagents
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="reagent in selectedData.reagentsRequested"
                                :key="reagent.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="basis-[180px]">
                                    {{ reagent.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ reagent.description }}
                                </div>
                                <div class="basis-[60px]">
                                    {{ reagent.quantity }} {{ reagent.unit }}
                                </div>
                            </div>
                        </div>

                        <template
                            v-if="
                                sortRequest(selectedData) ===
                                    'teacherRevision' ||
                                sortRequest(selectedData) === 'adminRevision'
                            "
                            #footer
                        >
                            <div class="mb-4">
                                <UTextarea
                                    v-model="reagentRevision"
                                    disabled
                                    :placeholder="annotationPlaceholder"
                                    color="red"
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Laboratory Reserved -->
                <div
                    v-if="selectedData.laboratoryReservations.length > 0"
                    class="mt-5"
                >
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Laboratory
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="laboratory in selectedData.laboratoryReservations"
                                :key="laboratory.id"
                                class="text-sm"
                            >
                                <div class="border-b-2 p-3">
                                    {{ laboratory.laboratoryReserved.name }}
                                </div>
                                <div class="border-b-2 p-3 pl-8">
                                    <div
                                        v-for="(startDate, index) in laboratory
                                            .dates.startDate"
                                        :key="index"
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            {{
                                                dayjs(startDate).format(
                                                    "MMM DD, YYYY",
                                                )
                                            }}
                                            -
                                            {{
                                                dayjs(
                                                    laboratory.dates.endDate[
                                                        index
                                                    ],
                                                ).format("MMM DD, YYYY")
                                            }}
                                        </div>
                                        <div>
                                            {{
                                                laboratory.time.startTime[index]
                                            }}
                                            -
                                            {{ laboratory.time.endTime[index] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <template
                            v-if="
                                sortRequest(selectedData) ===
                                    'teacherRevision' ||
                                sortRequest(selectedData) === 'adminRevision'
                            "
                            #footer
                        >
                            <div class="mb-4">
                                <UTextarea
                                    v-model="laboratoryRevision"
                                    disabled
                                    :placeholder="annotationPlaceholder"
                                    color="red"
                                />
                            </div>
                        </template>
                    </UCard>
                </div>

                <template #footer>
                    <div
                        v-if="
                            sortRequest(selectedData) === 'teacherRevision' ||
                            sortRequest(selectedData) === 'adminRevision'
                        "
                        class="flex items-center justify-center"
                    >
                        <UButton
                            color="blue"
                            label="REVISE"
                            variant="solid"
                            icon="i-material-symbols-edit"
                            @click="navigateToRevision()"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>

        <UModal v-model="confirmDelete">
            <UCard>
                <template #header>
                    <h3
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                        Confirm Deletion
                    </h3>
                </template>
                <p>
                    Are you sure you want to delete this request? This action
                    cannot be undone.
                </p>
                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton
                            color="gray"
                            variant="ghost"
                            @click="confirmDelete = false"
                            >Cancel</UButton
                        >
                        <UButton color="red" @click="deleteRequest"
                            >Delete</UButton
                        >
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
