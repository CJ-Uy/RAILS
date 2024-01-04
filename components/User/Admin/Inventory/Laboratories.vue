<script setup>
const startingColumns = ["name", "description", "locationName"]; // Key of starting columns in list of all columns

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
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

const allowedEditing = ref(true);
const editModeIsOpen = ref(false);
function toggleEditModal() {
    editModeIsOpen.value = !editModeIsOpen.value;
}
</script>

<template>
    <div>
        <TablesInventory
            title="LABORATORIES"
            default-sort-key="itemName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            :editModeIsOpen="editModeIsOpen"
            fetch-path="/api/db/rawData/getAllLaboratories"
            @selectedRow="selectedRow"
            :allowedEditing="allowedEditing"
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

<style scoped></style>
