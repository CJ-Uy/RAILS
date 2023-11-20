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
        key: "currentQuantity",
        label: "Inventory Quantity",
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
        key: "maxRequestableQuantity",
        label: "Max Requestable Quantity",
        sortable: true,
    },
    {
        key: "currentQuantity",
        label: "Inventory Quantity",
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

const editModeIsOpen = ref(false);
function toggleEditModal() {
    editModeIsOpen.value = !editModeIsOpen.value;
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
            fetch-path="/api/db/rawData/getAllReagents"
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
                    <div>EDITING MODE</div>
                </UCard>
            </template>
        </TablesInventory>
    </div>
</template>
