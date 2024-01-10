<script setup>
const user = inject("user");

const startingColumns = ["yearStart", "yearEnd", "campus"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "yearStart",
        label: "Starting Year",
        sortable: true,
    },
    {
        key: "yearEnd",
        label: "Ending Year",
        sortable: true,
    },
    {
        key: "campus",
        label: "Campus",
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
            title="SCHOOL YEARS"
            default-sort-key="yearStart"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllSY"
            update-path="/api/db/updateData/updateLaboratories"
            :allowedEditing="allowedEditing"
        />
    </div>
</template>

<style scoped></style>
