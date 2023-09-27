import editFormsVue from '~/pages/admin/edit-forms.vue'; import { request } from
'http'; import { table } from 'console';
<script setup>
const user = inject("user");

const requests = await useFetch("/api/user/teacher/getAllStudentRequests", {
    method: "POST",
    body: user,
});

const studentRequests = ref(requests.data);

async function downloadRequest(id) {
    const pdfBuffers_rawData = await useFetch("/api/forms/create-pdf-buffers", {
        method: "POST",
        body: { id, requestedForms: [5, 19, 20] },
    });

    const pdfBuffers = pdfBuffers_rawData.data.value;
    downloadPDF(pdfBuffers, user.lastName);
}

const editRequestModalIsOpen = ref(false);
const currentOpenRequest = ref(null);
function openEditRequestModal(request) {
    currentOpenRequest.value = request;
    editRequestModalIsOpen.value = true;
}

function downloadPDF(pdfBuffers, lastname) {
    for (const property in pdfBuffers) {
        const buffer = pdfBuffers[property].data;
        const url = window.URL.createObjectURL(
            new Blob([new Uint8Array(buffer).buffer]),
        );
        const link = document.createElement("a");
        link.href = url;
        const filename = `${lastname}-${property}-Request.pdf`;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
}
</script>

<template>
    <div>
        <h1 class="mb-2 text-xl font-bold">STUDENT REQUESTS</h1>
        <table class="w-[100%] table-auto text-left">
            <thead>
                <tr>
                    <th class="border-2 px-4 py-2 text-center">Request ID</th>
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
                    <td class="border-2" @click="openEditRequestModal(request)">
                        {{ request.id }}
                    </td>
                    <td class="border-2" @click="openEditRequestModal(request)">
                        {{ request.isSignedByTeacher }}
                    </td>
                    <td class="border-2" @click="openEditRequestModal(request)">
                        {{ request.isSignedByAdmin }}
                    </td>
                    <td class="px-2">
                        <UButton
                            label="Download"
                            variant="outline"
                            @click="downloadRequest(request.id)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <UModal v-model="editRequestModalIsOpen">
            <UCard>
                <pre>
                    {{ currentOpenRequest }}
                </pre>
            </UCard>
        </UModal>
    </div>
</template>
