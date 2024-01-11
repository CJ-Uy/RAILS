<script setup>
const user = inject("user");

const startingColumns = [
    "equipmentName",
    "description",
    "serialNumber",
    "quantity",
    "currentlyInUse",
    "available",
]; // Key of starting columns in list of all columns

// TODO: add location Names
// Index of each object dictates its position in the Select Menu
const listOfAllColumns = [
    {
        key: "equipmentName",
        label: "Name",
        sortable: true,
        direction: "asc",
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "serialNumber",
        label: "Serial Number",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Quantity",
        sortable: true,
    },
    {
        key: "currentlyInUse",
        label: "In Use",
        sortable: true,
    },
    {
        key: "available",
        label: "Availability",
        sortable: true,
    },
    {
        key: "code",
        label: "Code",
        sortable: true,
    },
    {
        key: "modelNoOrManufacturer",
        label: "Model/Manufacturer",
        sortable: true,
    },
    {
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "unitCost",
        label: "Unit Cost",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
        sortable: true,
    },
    {
        key: "propertyNumber",
        label: "Property Number",
        sortable: true,
    },
    {
        key: "acquisitionType",
        label: "Acquisition Type",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
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
            title="EQUIPMENT"
            default-sort-key="equipmentName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllEquipment"
            update-path="/api/db/updateData/updateEquipment"
            :allowedEditing="allowedEditing"
        >
        </TablesInventory>
    </div>
</template>
