<script setup>
import dayjs from "dayjs";

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
];

const allLabLocationNames = ref([]); // initialize an empty array as the default value
const { data: locations } = await useFetch("/api/db/rawData/getAllLocations");
watchEffect(() => {
    // use a watcher to update the ref when the data changes
    if (locations.value) {
        // check if the data is available
        allLabLocationNames.value = locations.value
            .map((location) => location.name)
            .sort(); // map the data to get the names
    }
});

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
            title="LABORATORIES"
            default-sort-key="name"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/publicData/getAllLaboratories"
            :allowedEditing="false"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div class="flex flex-row items-center space-x-3">
                            <h1 class="text-xl">
                                {{ selectedData.name }}
                            </h1>
                        </div>
                    </template>

                    <div class="grid grid-cols-3">
                        <div
                            class="border-1 flex items-center border p-3 font-bold"
                        >
                            Name
                        </div>
                        <div
                            class="border-1 col-span-2 border p-3 text-gray-700"
                        >
                            {{ selectedData.name }}
                        </div>

                        <div
                            class="border-1 flex items-center border p-3 font-bold"
                        >
                            Location
                        </div>
                        <div
                            class="border-1 col-span-2 border p-3 text-gray-700"
                        >
                            {{ selectedData.location.name }}
                        </div>

                        <div
                            class="border-1 flex items-center border p-3 font-bold"
                        >
                            Description
                        </div>
                        <div
                            class="border-1 col-span-2 border p-3 text-gray-700"
                        >
                            {{ selectedData.description || "No Description" }}
                        </div>
                    </div>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
