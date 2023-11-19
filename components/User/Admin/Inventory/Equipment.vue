<script setup>
import dayjs from "dayjs";

const user = inject("user");

// Do the thing where you can add more columns to the table
const startingColumns = [
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
    },
    {
        key: "modelOrManufacturer",
        label: "Model/Manufacturer",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
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
        key: "modelOrManufacturer",
        label: "Model/Manufacturer",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Quantity",
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
];
</script>

<template>
    <div>
        <TablesInventory
            title="EQUIPMENT"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllEquipment"
        >
            <template #modal-content>
                <div>This is the editing modal</div>
            </template>
        </TablesInventory>
    </div>
</template>
