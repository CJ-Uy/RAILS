<script setup>
const startingColumns = [
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "requestor.lastName",
        label: "Last Name",
        sortable: true,
    },
    {
        key: "requestor.firstName",
        label: "First Name",
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

const listOfAllColumns = [
    // Identification
    {
        key: "id",
        label: "ID",
        sortable: true,
    },
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "updatedAt",
        label: "Entry Updated",
        sortable: true,
    },

    // Requestor
    {
        key: "requestor",
        label: "Requestor",
        sortable: true,
    },

    // General Details
    {
        key: "forSubject",
        label: "Subject",
        sortable: true,
    },
    {
        key: "concurrentTopic",
        label: "Concurrent Topic",
        sortable: true,
    },
    {
        key: "noOfStudents",
        label: "No. of Students",
        sortable: true,
    },
    {
        key: "otherGroupMembers",
        label: "Other Group Members",
        // Note: This might require special handling based on the Json format
        sortable: false,
    },

    // Grade & Section
    {
        key: "gradeSection",
        label: "Grade & Section",
        sortable: true,
    },

    // Unit & Teacher
    {
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "teacherInCharge",
        label: "Teacher In Charge",
        sortable: true,
    },

    // Requested Materials, Equipment, & Reagents
    {
        key: "materialsRequested",
        label: "Materials Requested",
        // Note: This might require special handling based on the MaterialRequests model
        sortable: false,
    },
    {
        key: "equipmentRequested",
        label: "Equipment Requested",
        // Note: This might require special handling based on the EquipmentRequests model
        sortable: false,
    },
    {
        key: "reagentsRequested",
        label: "Reagents Requested",
        // Note: This might require special handling based on the ReagentRequests model
        sortable: false,
    },

    // Reservation & Location
    {
        key: "laboratoryReservations",
        label: "Laboratory Reservations",
        // Note: This might require special handling based on the LaboratoryReservations model
        sortable: false,
    },
    {
        key: "independentTime",
        label: "Independent Time",
        // Note: This might require special handling based on the Json format
        sortable: false,
    },
    {
        key: "independentLocation",
        label: "Independent Location",
        sortable: true,
    },

    // Approval Status
    {
        key: "signedByTeacher",
        label: "Signed by Teacher",
        sortable: true,
    },
    {
        key: "signedByAdmin",
        label: "Signed by Admin",
        sortable: true,
    },
    {
        key: "teacherAnnotation",
        label: "Teacher Annotation",
        // Note: This might require special handling based on the @db.MediumText annotation
        sortable: false,
    },
    {
        key: "adminAnnotation",
        label: "Admin Annotation",
        // Note: This might require special handling based on the @db.MediumText annotation
        sortable: false,
    },

    // School Year
    {
        key: "schoolYear",
        label: "School Year",
        sortable: true,
    },
];
</script>

<template>
    <div>
        <TablesRequests
            title="All Requests"
            fetch-path="/api/user/admin/requests/getAllRequests"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
        />
    </div>
</template>

<style scoped></style>
