<script setup>
const startingColumns = [
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "requestor-lastName",
        label: "Student LN",
        sortable: true,
    },
    {
        key: "requestor-firstName",
        label: "Student FN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-firstName",
        label: "Teacher FN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-lastName",
        label: "Teacher LN",
        sortable: true,
    },
    {
        key: "isSignedByTeacher",
        label: "Signed by Teacher",
        sortable: true,
    },
    {
        key: "isSignedByAdmin",
        label: "Signed by Admin",
        sortable: true,
    },
];

// TODO: Add labels
const listOfAllColumns = [
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "requestor-lastName",
        label: "Student LN",
        sortable: true,
    },
    {
        key: "requestor-firstName",
        label: "Student FN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-firstName",
        label: "Teacher FN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-lastName",
        label: "Teacher LN",
        sortable: true,
    },
    {
        key: "isSignedByTeacher",
        label: "Signed by Teacher",
        sortable: true,
    },
    {
        key: "isSignedByAdmin",
        label: "Signed by Admin",
        sortable: true,
    },
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

const editModeIsOpen = ref(false);
function toggleEditModal() {
    editModeIsOpen.value = !editModeIsOpen.value;
}
</script>

<template>
    <div>
        <TablesRequests
            title="All Requests"
            fetch-path="/api/user/admin/requests/getAllRequests"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            :editModeIsOpen="editModeIsOpen"
            @selectedRow="selectedRow"
        >
            <template #detailsModal>
                <UCard>
                    <template #header> </template>
                    <pre>{{ selectedData }}</pre>
                    <template #footer>
                        <UButton label="EDIT" @click="toggleEditModal()" />
                    </template>
                </UCard>
            </template>
            <template #editModeModal>
                <UCard>
                    <template #header> </template>
                    <div>EDITING</div>
                    <template #footer>
                        <UButton label="EDIT" @click="toggleEditModal()" />
                    </template>
                </UCard>
            </template>
        </TablesRequests>
    </div>
</template>

<style scoped></style>
