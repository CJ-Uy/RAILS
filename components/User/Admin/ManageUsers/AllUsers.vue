<script setup>
const user = inject("user");

const startingColumns = ["role", "firstName", "lastName", "email"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "role",
        label: "Role",
        sortable: true,
    },
    {
        key: "firstName",
        label: "First Name",
        sortable: true,
    },
    {
        key: "lastName",
        label: "Last Name",
        sortable: true,
    },
    {
        key: "email",
        label: "Email",
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

const allowedEditing = ref(false);
</script>

<template>
    <div>
        <TablesInventory
            title="ALL USERS"
            default-sort-key="role"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/manageUsers/getAll"
            update-path="/api/db/updateData/updateLaboratories"
            :allowed-editing="allowedEditing"
        />
    </div>
</template>

<style scoped></style>
