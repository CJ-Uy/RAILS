<script setup>
const user = inject("user");

const startingColumns = [
    "chemicalName",
    "description",
    "classification",
    "quantity",
    "reservedQuantity",
    "available",
]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "chemicalName",
        label: "Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "classification",
        label: "Class",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Inventory Quantity",
        sortable: true,
    },
    {
        key: "reservedQuantity",
        label: "Reserved Quantity",
        sortable: true,
    },
    {
        key: "available",
        label: "Availability",
        sortable: true,
    },
    {
        key: "casNumber",
        label: "CAS Number",
        sortable: true,
    },
    {
        key: "code",
        label: "Code",
        sortable: true,
    },
    {
        key: "manufacturerName",
        label: "Manufacturer",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "DGClass",
        label: "DG Class",
        sortable: true,
    },
    {
        key: "subRisk",
        label: "Sub Risk",
        sortable: true,
    },
    {
        key: "PG",
        label: "PG",
        sortable: true,
    },
    {
        key: "riskPhrase",
        label: "Risk Phrase",
        sortable: true,
    },
    {
        key: "safetyPhrase",
        label: "Safety Phrase",
        sortable: true,
    },
    {
        key: "hazSub",
        label: "Haz Sub",
        sortable: true,
    },
    {
        key: "poisonSchedule",
        label: "Poison Schedule",
        sortable: true,
    },
    {
        key: "currentSDS",
        label: "Current SDS",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
        sortable: true,
    },
    {
        key: "expiryDate",
        label: "Expiry Date",
        sortable: true,
    },
    {
        key: "dateOpened",
        label: "Date Opened",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
    },
    {
        key: "laboratoriesId",
        label: "LaboratoryID",
        sortable: true,
    },
    {
        key: "schoolYearId",
        label: "School Year ID",
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
            title="REAGENTS"
            default-sort-key="itemName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllReagents"
            update-path="/api/db/updateData/updateReagents"
            :allowedEditing="allowedEditing"
        >
        </TablesInventory>
    </div>
</template>
