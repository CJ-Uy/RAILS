<script setup>
const user = inject("user");

const startingColumns = [
    "itemName",
    "description",
    "classification",
    "quantity",
    "currentlyInUse",
    "available",
]; // Key of starting columns in list of all columns

// TODO: add location Names
const listOfAllColumns = [
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
    {
        key: "code",
        label: "Code",
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

const editModeIsOpen = ref(false);

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

// Only allow editing if the user is an administrator
const allowedEditing = ref(user.role === "ADMIN");

const tableRef = ref();
</script>

<template>
    <div>
        <TablesWSlottedModals
            ref="tableRef"
            title="MATERIALS"
            default-sort-key="itemName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllMaterials"
            :allowedEditing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <div>
                    <h3 class="text-center">Laboratory Information</h3>
                </div>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
