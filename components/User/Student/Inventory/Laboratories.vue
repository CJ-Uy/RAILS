<script setup>
const startingColumns = [
    {
        key: "itemName",
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
];

// TODO: add location Names
const listOfAllColumns = [
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
    {
        key: "code",
        label: "Code",
        sortable: true,
    },
    {
        key: "itemName",
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
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
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
        key: "additionalPurchase",
        label: "Additional Purchase",
        sortable: true,
    },
    {
        key: "make",
        label: "Make",
        sortable: true,
    },
    {
        key: "unitCost",
        label: "Unit Cost",
        sortable: true,
    },
    {
        key: "damage",
        label: "Damage",
        sortable: true,
    },
    {
        key: "balancePerCard",
        label: "Balance per Card",
        sortable: true,
    },
    {
        key: "balancePerCount",
        label: "Balance per Count",
        sortable: true,
    },
    {
        key: "available",
        label: "Availability",
        sortable: true,
    },
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}
</script>

<template>
    <div>
        <TablesInventory
            title="MATERIALS"
            default-sort-key="itemName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            :editModeIsOpen="editModeIsOpen"
            fetch-path="/api/db/rawData/getAllMaterials"
            @selectedRow="selectedRow"
            allowed-editing="false"
        >
            <template #detailsModal>
                <UCard>
                    <template #header> </template>
                    <div>{{ selectedData }}</div>
                </UCard>
            </template>
        </TablesInventory>
    </div>
</template>

<style scoped></style>
