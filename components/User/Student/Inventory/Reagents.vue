
import type getAllReagents from '~/server/api/db/forms/getAllReagents';
<script setup>
const startingColumns = [
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
        key: "available",
        label: "Availability",
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
        key: "unit",
        label: "Unit",
        sortable: true,
    },
];

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
        key: "available",
        label: "Availability",
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
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}
</script>

<template>
    <div>
        <TablesInventory
            title="REAGENTS"
            default-sort-key="chemicalName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            :editModeIsOpen="editModeIsOpen"
            fetch-path="/api/db/rawData/getAllReagents  "
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
