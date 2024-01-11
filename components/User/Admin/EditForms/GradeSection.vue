<script setup>
const user = inject("user");

const startingColumns = ["grade", "section"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "grade",
        label: "Grade Level",
        sortable: true,
    },
    {
        key: "section",
        label: "Section",
        sortable: true,
    },
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
];

// Only allow editing if the user is an administrator
const allowedEditing = ref(user.role === "ADMIN");
</script>

<template>
    <div>
        <TablesInventory
            title="GRADE & SECTIONS"
            default-sort-key="grade"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllGradeSections"
            update-path="/api/db/updateData/updateLaboratories"
            :allowedEditing="allowedEditing"
        />
    </div>
</template>

<style scoped></style>
