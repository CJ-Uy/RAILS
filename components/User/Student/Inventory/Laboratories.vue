<script setup>
const columns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
        direction: "asc",
    },
    {
        key: "locationName",
        label: "Location",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}
const allowedEditing = ref(false);
</script>

<template>
    <div>
        <TablesInventory
            title="LABORATORIES"
            default-sort-key="itemName"
            :startingColumns="columns"
            :listOfAllColumns="columns"
            :editModeIsOpen="editModeIsOpen"
            fetch-path="/api/db/rawData/getAllLaboratories"
            @selectedRow="selectedRow"
            :allowed-editing="allowedEditing"
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
