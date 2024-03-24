<script setup>
import dayjs from "dayjs";

const startingColumns = [
    "itemName",
    "description",
    "classification",
    "quantity",
]; // Key of starting columns in list of all columns

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
        key: "classification",
        label: "Class",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "make",
        label: "Make",
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
    selectedData.value.createdAt = dayjs(data.createdAt).format(
        "MMM DD, YYYY ; HH:mm",
    );
    selectedData.value.updatedAt = dayjs(data.updatedAt).format(
        "MMM DD, YYYY ; HH:mm",
    );
}

const tableRef = ref();
</script>

<template>
    <div>
        <TablesWSlottedModals
            ref="tableRef"
            title="MATERIALS"
            default-sort-key="itemName"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/publicData/getAllMaterials"
            :allowed-editing="false"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div
                            class="flex flex-row items-center justify-between space-x-3"
                        >
                            <h1 class="text-xl">
                                {{ selectedData.itemName }}
                            </h1>
                        </div>
                    </template>

                    <div
                        v-for="item in listOfAllColumns"
                        :key="item.key"
                        class="grid grid-cols-3 break-all"
                    >
                        <div
                            v-if="selectedData[item.key]"
                            class="border-1 col-span-1 flex items-center border p-3 font-bold"
                        >
                            {{ item.label }}
                        </div>
                        <div
                            v-if="selectedData[item.key]"
                            class="border-1 col-span-2 border p-3 text-gray-700"
                        >
                            {{ selectedData[item.key] }}
                        </div>
                    </div>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
