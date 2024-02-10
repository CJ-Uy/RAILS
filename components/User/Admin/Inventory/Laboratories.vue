<script setup>
const user = inject("user");

const startingColumns = ["name", "description", "locationName"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "locationName",
        label: "Location",
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
            title="LABORATORIES"
            default-sort-key="name"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllLaboratories"
            :allowedEditing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <div>
                    <h3 class="text-center">MATERIALS Information</h3>
                </div>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
