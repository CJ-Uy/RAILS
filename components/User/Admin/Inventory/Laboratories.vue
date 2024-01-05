<script setup>
const user = inject("user");

const startingColumns = ["name", "description", "locationName"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "locationName",
        label: "Location",
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
            title="LABORATORIES"
            default-sort-key="itemName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllLaboratories"
            update-path="/api/db/updateData/updateLaboratories"
            :allowedEditing="allowedEditing"
        />
    </div>
</template>

<style scoped></style>
