<script setup>
const startingColumns = [
    "requestor-lastName",
    "requestor-firstName",
    "teacherInCharge-userProfile-lastName",
    "teacherInCharge-userProfile-firstName",
    "isSignedByTeacher",
    "isSignedByAdmin",
    "createdAt",
];

// TODO: Add labels
const listOfAllColumns = [
    { key: "requestor-lastName", label: "Requestor Last Name", sortable: true },
    {
        key: "requestor-firstName",
        label: "Requestor First Name",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-lastName",
        label: "Teacher In Charge Last Name",
        sortable: true,
    },
    {
        key: "teacherInCharge-userProfile-firstName",
        label: "Teacher In Charge First Name",
        sortable: true,
    },
    { key: "isSignedByTeacher", label: "Signed by Teacher", sortable: true },
    { key: "isSignedByAdmin", label: "Signed by Admin", sortable: true },
    { key: "forSubject", label: "Subject", sortable: true },
    { key: "concurrentTopic", label: "Topic", sortable: true },
    { key: "noOfStudents", label: "No. of Stu", sortable: true },
    { key: "otherGroupMembers", label: "Groupmates", sortable: true },
    { key: "independentTime", label: "INDP Time", sortable: true },
    { key: "independentLocation", label: "INDP Location", sortable: true },
    { key: "teacherAnnotation", label: "Teacher Notes", sortable: true },
    { key: "adminAnnotation", label: "Admin Notes", sortable: true },
    { key: "requestor-email", label: "Requestor Email", sortable: true },
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
        key: "teacherInCharge-userProfile-role",
        label: "Teacher In Charge Role",
        sortable: true,
    },
    { key: "id", label: "ID", sortable: true },
    { key: "createdAt", label: "Entry Created", sortable: true },
    { key: "updatedAt", label: "Last Update", sortable: true },
];
</script>

<template>
    <div>
        <TablesRequests
            title="Pending Requests"
            fetch-path="/api/user/admin/requests/getAllRequests"
            update-path="/api/user/admin/requests/update"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
        >
        </TablesRequests>
    </div>
</template>

<style scoped></style>
