<script setup>
import dayjs from "dayjs";

const user = inject("user");

const requests = await useFetch("/api/user/teacher/requests/getAllRequests", {
    method: "POST",
    body: user,
});

const studentRequests = ref(requests.data.value);

async function updateTable() {
    const requests = await useFetch(
        "/api/user/teacher/requests/getAllRequests",
        {
            method: "POST",
            body: user,
        },
    );
    studentRequests.value = requests.data.value;
}

import { useDownloader } from "~/composables/useDownloader";
const { loading, loadingMessage, download } = useDownloader();

const editRequestModalIsOpen = ref(false);
const currentOpenRequest = ref(null);
function openEditRequestModal(request) {
    currentOpenRequest.value = request;
    editRequestModalIsOpen.value = true;
}
async function approve() {
    editRequestModalIsOpen.value = false;
    await useFetch("/api/user/teacher/requests/approveRequest", {
        method: "POST",
        body: { ...currentOpenRequest.value, user },
    });
    await useFetch("/api/db/notifications/addNotification", {
        method: "POST",
        body: {
            ...currentOpenRequest.value,
            notificationType: "teacherApprove",
        },
    });
    updateTable();
}
async function decline() {
    editRequestModalIsOpen.value = false;
    await useFetch("/api/user/teacher/requests/declineRequest", {
        method: "POST",
        body: currentOpenRequest.value,
    });
    await useFetch("/api/db/notifications/addNotification", {
        method: "POST",
        body: {
            ...currentOpenRequest.value,
            notificationType: "teacherDecline",
        },
    });
    updateTable();
}
</script>

<template>
    <div>
        <h1 class="mb-2 text-xl font-bold">STUDENT REQUESTS</h1>
        <table class="w-[100%] table-auto text-left">
            <thead>
                <tr>
                    <th class="border-2 px-4 py-2 text-center">
                        Date Requested
                    </th>
                    <th class="border-2 px-4 py-2 text-center">Subject</th>
                    <th class="border-2 px-4 py-2 text-center">
                        Grade Section
                    </th>
                    <th class="border-2 px-4 py-2 text-center">Requestor</th>
                    <th class="border-2 px-4 py-2 text-center">
                        No. of People
                    </th>
                    <th class="border-2 px-4 py-2 text-center">
                        Teacher Approved
                    </th>
                    <th class="border-2 px-4 py-2 text-center">
                        Admin Approved
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="request in studentRequests"
                    :key="request.id"
                    class="text-center"
                >
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{
                            dayjs(request.createdAt).format(
                                "MMM DD, YYYY - HH:mm",
                            )
                        }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.forSubject }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.gradeSection.grade }} -
                        {{ request.gradeSection.section }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.requestor.lastName }},
                        {{ request.requestor.firstName }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.noOfStudents }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.isSignedByTeacher }}
                    </td>
                    <td
                        class="cursor-default border-2 px-2"
                        @click="openEditRequestModal(request)"
                    >
                        {{ request.isSignedByAdmin }}
                    </td>
                    <td class="px-2">
                        <UButton
                            :label="loading ? loadingMessage : 'Download'"
                            :loading="loading"
                            @click="download(request.id)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <UModal v-model="editRequestModalIsOpen">
            <UCard>
                <template #header></template>
                <h1>TIME</h1>
                <table>
                    <tr>
                        <td>Start Time</td>
                        <td>
                            {{
                                dayjs(
                                    currentOpenRequest.laboratoryReservations[0]
                                        .startTime,
                                ).format("MMM DD, YYYY - HH:mm")
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>Start Time</td>
                        <td>
                            {{
                                dayjs(
                                    currentOpenRequest.laboratoryReservations[0]
                                        .endTime,
                                ).format("MMM DD, YYYY - HH:mm")
                            }}
                        </td>
                    </tr>
                </table>
                <pre>
                    {{ currentOpenRequest }}
                </pre>

                <template #footer>
                    <div>
                        <UButton
                            label="DECLINE"
                            color="red"
                            variant="outline"
                            @click="decline()"
                        />
                        <UButton
                            label="APPROVE"
                            color="green"
                            class="ml-3"
                            @click="approve()"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
