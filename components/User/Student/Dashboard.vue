<script setup>
import dayjs from "dayjs";

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

getAllRequests();
</script>

<template>
    <div>
        <UContainer>
            <div
                class="m-auto flex w-[95%] flex-row items-start justify-between"
            >
                <!-- Display Pending Requests -->
                <div class="relative w-[31%]">
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
                                <div class="p-1 pl-4">
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
                <!-- Display Approved Requests -->
                <div class="w-[31%]">
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
                <div class="w-[31%]">
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
                                <div class="p-1 pl-4">
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
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="modalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="ml-5 font-thin">
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
                                <div class="basis-[180px]">
                                    {{ material.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ material.description }}
                                </div>
                                <div class="basis-[60px]">
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
                                    placeholder="Annotation for revisions..."
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
                                    placeholder="Annotation for revisions..."
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
                                    placeholder="Annotation for revisions..."
                                    color="red"
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Laboratory Reserved -->
                <div class="mt-5">
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
                                    placeholder="Annotation for revisions..."
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
    </div>
</template>
