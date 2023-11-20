<script setup>
import dayjs from "dayjs";
const user = inject("user");

// Do the thing where you can add more columns to the table
const startingColumns = [
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
    },
    {
        key: "modelNoOrManufacturer",
        label: "Model/Manufacturer",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
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

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

const editModeIsOpen = ref(false);
function toggleEditModal() {
    editModeIsOpen.value = !editModeIsOpen.value;
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
        >
            <template #detailsModal>
                <UCard>
                    <template #header> </template>
                    <div>{{ selectedData }}</div>
                    <template #footer>
                        <UButton label="EDIT" @click="toggleEditModal()" />
                    </template>
                </UCard>
            </template>
            <template #editModeModal>
                <UCard>
                    <template #header> </template>
                    <div>EDITING</div>
                    <template #footer>
                        <UButton label="EDIT" @click="toggleEditModal()" />
                    </template>
                </UCard>
            </template>
        </TablesInventory>
    </div>
</template>
