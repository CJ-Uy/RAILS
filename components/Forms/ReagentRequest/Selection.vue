<script setup>
const requestedReagents = inject("requestedReagents");

// Table Columns
const columns = [
    { key: "chemicalName", label: "Name", sortable: true, direction: "asc" },
    { key: "description", label: "Description" },
    { key: "maxQuantity", label: "Stock" },
    { key: "unit", label: "Units" },
];
const selectedColumns = ref(columns);

// Pagination
const page = ref(1);
const pageCount = 10;
const totalItems = ref();

// Searching Rows
const { pending, data: allReagents } = await useLazyFetch(
    "/api/db/forms/getAllReagents",
);
const allReagentsData = ref([]);
watch(allReagents, (updatedValues) => {
    allReagentsData.value = updatedValues;
});

async function updateTable() {
    const allReagents = await useFetch("/api/db/forms/getAllReagents");
    allReagentsData.value = allReagents.data.value;
}

//let filteredRows = ref(allReagents);
// Filter rows
const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allReagentsData.value.length;
        return filterSelectedEquipment(
            allReagentsData.value.slice(
                (page.value - 1) * pageCount,
                page.value * pageCount,
            ),
        );
    }
    // filtering the rows
    let filtered = filterSelectedEquipment(
        allReagentsData.value.filter((item) => {
            return Object.values(item).some((value) => {
                return String(value)
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
            });
        }),
    );
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered.slice((page.value - 1) * pageCount, page.value * pageCount);
});

function filterSelectedEquipment(arr) {
    return arr.filter((item) => {
        return !requestedReagents.value.includes(item);
    });
}

function addItem(item) {
    item.requestedQuantity = 5;
    requestedReagents.value.push(item);
}
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">
                SELECT REAGENTS
            </h2>
            <p>
                Select any reagent you would like to add to this
                request.
            </p>
        </div>
        <!-- Equipment Search table -->
        <div class="my-7">
            <UCard>
                <!-- SEARCH TABLE -->
                <div class="flex flex-row">
                    <!-- Refresh table -->
                    <UButton
                        icon="i-material-symbols-refresh"
                        @click="updateTable"
                    />

                    <!-- Select columns -->
                    <div class="mx-2 w-[115px]">
                        <USelectMenu
                            v-model="selectedColumns"
                            :options="columns"
                            multiple
                            placeholder="Columns"
                        />
                    </div>

                    <!-- Search bar filter -->
                    <div class="w-[150px]">
                        <UInput
                            v-model="searchQuery"
                            placeholder="Search..."
                            size="sm"
                            icon="i-heroicons-magnifying-glass-20-solid"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                        >
                            <template #trailing>
                                <UButton
                                    v-show="searchQuery !== ''"
                                    color="gray"
                                    variant="link"
                                    icon="i-heroicons-x-mark-20-solid"
                                    :padded="false"
                                    @click="searchQuery = ''"
                                />
                            </template>
                        </UInput>
                    </div>
                </div>

                <!-- Table -->
                <UTable
                    :columns="selectedColumns"
                    :rows="filteredRows"
                    @select="addItem"
                    :loading="pending"
                />
                <!-- Pagination -->
                <div class="mt-2 flex w-[100%] items-center justify-end">
                    <p class="mr-3 text-sm text-main-300">
                        {{ allReagentsData.length }} TOTAL ITEMS
                    </p>

                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="totalItems"
                    />
                </div>
            </UCard>
        </div>
    </div>
</template>
