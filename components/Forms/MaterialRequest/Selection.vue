<script setup>
const requestedMaterials = inject("requestedMaterials");

// Table Columns
const columns = [
    { key: "itemName", label: "Name", sortable: true, direction: "asc" },
    { key: "description", label: "Description" },
    {
        key: "classification",
        label: "classification",
        sortable: true,
        direction: "asc",
    },
    { key: "quantity", label: "Stock" },
    { key: "unit", label: "Unit" },
];
const selectedColumns = ref(columns.filter((column) => column.key !== "unit"));

// Pagination
const page = ref(1);
const pageCount = 10;
const totalItems = ref();

// Searching Rows
const { pending, data: allMaterials } = await useLazyFetch(
    "/api/db/forms/getAllMaterials",
);

const allMaterialsData = ref([]);
watch(allMaterials, (updatedValues) => {
    allMaterialsData.value = updatedValues;
});

async function updateTable() {
    const allMaterials = await useFetch("/api/db/forms/getAllMaterials");
    allMaterialsData.value = allMaterials.data.value;
}

// Filter rows
const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allMaterialsData.value.length;
        return filterSelectedMaterials(
            allMaterialsData.value.slice(
                (page.value - 1) * pageCount,
                page.value * pageCount,
            ),
        );
    }
    // filtering the rows
    const filtered = filterSelectedMaterials(
        allMaterialsData.value.filter((item) => {
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

function filterSelectedMaterials(arr) {
    return arr.filter((item) => {
        return !requestedMaterials.value.includes(item);
    });
}

function addItem(item) {
    item.requestedQuantity = 1;
    requestedMaterials.value.push(item);
}

updateTable();
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">SELECT MATERIALS</h2>
            <p>Select any materials you would like to add to this request.</p>
            <div v-if="requestedMaterials.length != 0">
                <p class="text-red-600">
                    Finalize Materials and Materials Request in the
                    <span class="font-bold"
                        >Orders ({{ requestedMaterials.length }})</span
                    >
                    tab
                </p>
            </div>
        </div>

        <!-- Materials Search table -->
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
                    :loading="pending"
                    @select="addItem"
                />
                <!-- Pagination -->
                <div class="mt-2 flex w-[100%] items-center justify-end">
                    <p class="mr-3 text-sm text-main-300">
                        {{ allMaterialsData.length }} TOTAL ITEMS
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
