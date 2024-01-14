<script setup>
const user = inject("user");

const startingColumns = ["name", "frequencyRank"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "name",
        label: "Unit Name",
        sortable: true,
    },
    {
        key: "frequencyRank",
        label: "Frequency Rank",
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
            title="UNITS"
            default-sort-key="frequencyRank"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllUnits"
            update-path="/api/db/updateData/updateLaboratories"
            :allowedEditing="allowedEditing"
        />
    </div>
</template>

<style scoped></style>
