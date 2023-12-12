<script setup>
const startingColumns = [
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "requestor-lastName",
        label: "Requestor LN",
        sortable: true,
    },
    {
        key: "requestor-firstName",
        label: "Requestor FN",
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
    { key: "id", label: "ID", sortable: true },
    { key: "createdAt", label: "Entry Created", sortable: true },
    { key: "updatedAt", label: "Last Update", sortable: true },
    { key: "forSubject", label: "Subject", sortable: true },
    { key: "concurrentTopic", label: "Topic", sortable: true },
    { key: "noOfStudents", label: "No. of Stu", sortable: true },
    { key: "otherGroupMembers", label: "Groupmates", sortable: true },
    { key: "independentTime", label: "INDP Time", sortable: true },
    { key: "independentLocation", label: "INDP Location", sortable: true },
    { key: "isSignedByTeacher", label: "Signed by Teacher", sortable: true },
    { key: "isSignedByAdmin", label: "Signed by Admin", sortable: true },
    { key: "teacherAnnotation", label: "Teacher Notes", sortable: true },
    { key: "adminAnnotation", label: "Admin Notes", sortable: true },
    { key: "requestor-email", label: "Requestor Email", sortable: true },
    { key: "requestor-firstName", label: "Requestor FN", sortable: true },
    { key: "requestor-lastName", label: "Requestor LN", sortable: true },
    { key: "requestor-role", label: "Requestor Role", sortable: true },
    { key: "gradeSection-grade", label: "Grade", sortable: true },
    { key: "gradeSection-section", label: "Section", sortable: true },
    { key: "unit-name", label: "Unit", sortable: true },
    { key: "materialsRequested", label: "Materials", sortable: true },
    { key: "equipmentRequested", label: "Equipment", sortable: true },
    { key: "reagentsRequested", label: "Reagents", sortable: true },
    { key: "laboratoryReservations", label: "Lab Resv", sortable: true },
    { key: "signedTeacher", label: "Signed Teacher", sortable: true },
    { key: "signedAdmin", label: "Signed Admin", sortable: true },
    { key: "schoolYear-yearStart", label: "SY A", sortable: true },
    { key: "schoolYear-yearEnd", label: "SY B", sortable: true },
    {
        key: "schoolYear-currentSchoolYear",
        label: "In Current SY",
        sortable: true,
    },
    {
        key: "schoolYear-materialEquipmentRequestControlNumberCounter",
        label: "Mat & Equi Ctrl No",
        sortable: true,
    },
    {
        key: "schoolYear-reagentRequestControlNumberCounter",
        label: "Reagent Ctrl No",
        sortable: true,
    },
    {
        key: "schoolYear-laboratoryRequestControlNumberCounter",
        label: "Lab Resv Ctrl No",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-firstName",
        label: "Teacher In Charge FN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-lastName",
        label: "Teacher In Charge LN",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-role",
        label: "Teacher In Charge Role",
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
            update-path="/api/user/admin/requests/update"
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
