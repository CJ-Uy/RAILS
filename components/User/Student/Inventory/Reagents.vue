<script setup>
import dayjs from "dayjs";

const startingColumns = [
    "chemicalName",
    "description",
    "classification",
    "quantity",
]; // Key of starting columns in list of all columns

const listOfAllColumns = [
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
        key: "quantity",
        label: "Quantity",
        sortable: true,
    },
    {
        key: "casNumber",
        label: "CAS Number",
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
        key: "expiryDate",
        label: "Expiry Date",
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
            title="REAGENTS"
            default-sort-key="chemicalName"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/publicData/getAllReagents"
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
                                {{ selectedData.chemicalName }}
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
