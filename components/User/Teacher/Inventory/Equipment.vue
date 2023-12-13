
import type getAllEquipment from '~/server/api/db/forms/getAllEquipment';
<script setup>
const startingColumns = ref([
    {
        key: "equipmentName",
        label: "Name",
        sortable: true,
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
]);

// TODO: add location Names
const listOfAllColumns = ref([
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
        key: "modelNoOrManufacturer",
        label: "Model/Manufacturer",
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
        label: "property Number",
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
        key: "available",
        label: "Availability",
        sortable: true,
    },
]);

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}
</script>

<template>
    <div>
        <TablesInventory
            title="EQUIPMENT"
            default-sort-key="equipmentName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            :editModeIsOpen="editModeIsOpen"
            fetch-path="/api/db/rawData/getAllEquipment"
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
