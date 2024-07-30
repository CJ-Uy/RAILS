<script setup>
const startingColumns = [
    "requestor-lastName",
    "requestor-firstName",
    "gradeSection-grade",
    "gradeSection-section",
    "teacherInCharge-userProfile-lastName",
    "forSubject",
    "updatedAt",
];

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
    {
        key: "laboratoryReservationsAdminApproval",
        label: "Laboratory Reservation - Admin Approval",
        sortable: true,
    },
    {
        key: "laboratoryReservationsTeacherApproval",
        label: "Laboratory Reservation - Teacher Approval",
        sortable: true,
    },
    {
        key: "equipmentRequestsAdminApproval",
        label: "Material Request - Admin Approval",
        sortable: true,
    },
    {
        key: "equipmentRequestsTeacherApproval",
        label: "Material Request - Teacher Approval",
        sortable: true,
    },
    {
        key: "materialRequestsAdminApproval",
        label: "Material Request - Admin Approval",
        sortable: true,
    },
    {
        key: "materialRequestsTeacherApproval",
        label: "Material Request - Teacher Approval",
        sortable: true,
    },
    {
        key: "reagentRequestsAdminApproval",
        label: "Reagent Request - Admin Approval",
        sortable: true,
    },
    {
        key: "reagentRequestsTeacherApproval",
        label: "Reagent Request - Teacher Approval",
        sortable: true,
    },
    { key: "forSubject", label: "Subject", sortable: true },
    { key: "concurrentTopic", label: "Topic", sortable: true },
    { key: "noOfStudents", label: "No. of Stu", sortable: true },
    { key: "otherGroupMembers", label: "Groupmates", sortable: true },
    { key: "independentTime", label: "INDP Time", sortable: true },
    { key: "independentLocation", label: "INDP Location", sortable: true },
    { key: "requestor-email", label: "Requestor Email", sortable: true },
    { key: "requestor-role", label: "Requestor Role", sortable: true },
    { key: "gradeSection-grade", label: "Grade", sortable: true },
    { key: "gradeSection-section", label: "Section", sortable: true },
    { key: "unit-name", label: "Unit", sortable: true },
    { key: "materialsRequested", label: "Materials", sortable: true },
    { key: "equipmentRequested", label: "Equipment", sortable: true },
    { key: "reagentsRequested", label: "Reagents", sortable: true },
    { key: "laboratoryReservations", label: "Lab Resv", sortable: true },
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
            title="Users Not Cleared"
            fetch-path="/api/user/admin/requests/getAllUnclearedRequests"
            update-path="/api/user/admin/requests/update"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
        >
        </TablesRequests>
    </div>
</template>
