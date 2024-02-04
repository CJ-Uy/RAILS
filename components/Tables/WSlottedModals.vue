<!-- 
    DOCUMENTATION: HOW TO USE THIS COMPONENT

    Parent Component (e.g. User/Admin/ManageUsers/AllUsers):
    <script>
        const startingColumns = [] // "key" of starting columns in list of all columns in strings
        const listOfAllColumns = [{ key: "", label: "", sortable: bool }, ... ] // All the columns
        
        const selectedData = ref();
        function selectedRow(data) {
            selectedData.value = data;
        }
        
        const tableRef = ref();
        tableRef.value.updateTable(); // This updated the table
        tableRef.value.closeDataModal(); // This closes the modal
    </script>
    <template>
        <TablesSlottedInventory
            ref="tableRef"
            title=""
            default-sort-key=""                         // This should be in startingColumns
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path=""                               // API path to fetch data
            :allowed-editing=""                         // To be checked with user.ROLE
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <div>
                    < Code on Modal for viewing and editing data >
                </div>
            </template>
        </TablesSlottedInventory>
    </template>
 -->
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    defaultSortKey: {
        type: String,
        required: false,
        default: "name",
    },
    startingColumns: {
        type: Array,
        required: true,
    },
    listOfAllColumns: {
        type: Array,
        required: true,
    },
    fetchPath: {
        type: String,
        required: true,
    },
    allowedEditing: {
        type: Boolean,
        required: true,
    },
    editModeIsOpen: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(["selected-row"]); // This allows the sending of data from the child to the parent

defineExpose({ updateTable, closeDataModal }); // This allows the use of this function in a parent component

const sort = ref({ column: props.defaultSortKey, direction: "asc" });

const selectedColumns = ref([]);
// Initial starting columns
for (const i of props.startingColumns) {
    selectedColumns.value.push(
        props.listOfAllColumns.find((object) => object.key === i),
    );
}
const selectedColumnsTable = ref(selectedColumns.value);

function toggleAddRecord() {}

// Sort table columns according to the order of columns in list of all columns
// Selected columns keys are also used in filtering search results
const selectedColumnsKeys = ref([]);
for (const i of props.startingColumns) {
    selectedColumnsKeys.value.push(i);
}
watch(selectedColumns, () => {
    selectedColumnsKeys.value = [];
    const listOfAllColumnsKeys = ref([]);
    const selectedColumnsTableTemp = ref([]);
    for (const i of props.listOfAllColumns) {
        listOfAllColumnsKeys.value.push(i.key);
    }
    for (const i of selectedColumns.value) {
        selectedColumnsKeys.value.push(i.key);
    }
    selectedColumnsKeys.value = selectedColumnsKeys.value.sort(
        (a, b) =>
            listOfAllColumnsKeys.value.indexOf(a) -
            listOfAllColumnsKeys.value.indexOf(b),
    );
    for (const i of selectedColumnsKeys.value) {
        selectedColumnsTableTemp.value.push(
            props.listOfAllColumns.find((column) => {
                return column.key === i;
            }),
        );
    }
    selectedColumnsTable.value = selectedColumnsTableTemp.value;
});

const { pending, data: allItems } = await useLazyFetch(props.fetchPath);
const allItemsData = ref([]);
const allItemsRawData = ref([]);
watch(allItems, (updatedValues) => {
    allItemsData.value = updatedValues;
    allItemsRawData.value = allItemsData.value;
    if (props.title === "LABORATORIES") {
        for (let i = 0; i < allItemsData.value.length; i++) {
            allItemsData.value[i].locationName =
                allItemsData.value[i].location.name;
        }
    }
});

const totalItems = ref(allItemsData.value.length);

async function updateTable() {
    const allItems = await useFetch(props.fetchPath);
    allItemsData.value = allItems.data.value;
    if (props.title === "LABORATORIES") {
        for (let i = 0; i < allItemsData.value.length; i++) {
            allItemsData.value[i].locationName =
                allItemsData.value[i].location.name;
        }
    }
    allItemsRawData.value = allItemsData.value;
    totalItems.value = allItemsData.value.length;
}

const page = ref(1);
const pageCount = 8;
const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        // console.log(allItemsData.value);
        totalItems.value = allItemsData.value.length;
        if (sort.value.direction === "desc") {
            allItemsData.value = allItemsRawData.value.sort((a, b) => {
                if (typeof a[sort.value.column] === "number") {
                    return b[sort.value.column] - a[sort.value.column];
                }
                return b[sort.value.column].localeCompare(a[sort.value.column]);
            });
        } else {
            allItemsData.value = allItemsRawData.value.sort((a, b) => {
                if (typeof a[sort.value.column] === "number") {
                    return a[sort.value.column] - b[sort.value.column];
                }
                return a[sort.value.column].localeCompare(b[sort.value.column]);
            });
        }
        return allItemsData.value.slice(
            (page.value - 1) * pageCount,
            page.value * pageCount,
        );
    }
    const filtered = allItemsData.value.filter((item) => {
        // Only search record data of keys selected in selectedColumns
        return Object.values(item).some((value) => {
            const skip = Object.keys(item).find((key) => item[key] === value);
            if (selectedColumnsKeys.value.includes(skip)) {
                return String(value)
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
            }
            return false;
        });
    });

    // TODO: Slice the values into pages
    totalItems.value = filtered.length;
    if (sort.value.direction === "desc") {
        return filtered
            .sort((a, b) => {
                return a[sort.value.column].localeCompare(
                    b[sort.value.column] * -1,
                );
            })
            .slice((page.value - 1) * pageCount, page.value * pageCount);
    }
    return filtered
        .sort((a, b) => {
            return a[sort.value.column].localeCompare(b[sort.value.column]);
        })
        .slice((page.value - 1) * pageCount, page.value * pageCount);
});

// ---------- MODAL ---------- //
const modalIsOpen = ref(false);
function openModal(row) {
    modalIsOpen.value = true;
    emit("selected-row", row);
}

function closeDataModal() {
    modalIsOpen.value = false;
}

updateTable();
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">{{ title }}</h2>
            </template>

            <div class="flex flex-row justify-between">
                <div class="flex flex-row">
                    <!-- Refresh Button -->
                    <UButton
                        icon="i-material-symbols-refresh"
                        class="mr-2"
                        @click="updateTable"
                    />
                    <!-- Search and Filter -->
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
                    <!-- Select Columns -->
                    <div class="ml-2 w-[200px]">
                        <USelectMenu
                            v-model="selectedColumns"
                            :options="listOfAllColumns"
                            searchable
                            searchable-placeholder="Search Columns"
                            multiple
                            placeholder="Columns"
                        />
                    </div>
                </div>
                <div v-if="allowedEditing == true">
                    <UButton
                        label="ADD RECORD"
                        icon="i-material-symbols-add"
                        class=""
                        @click="toggleAddRecord"
                    />
                </div>
            </div>

            <!-- DATA TABLE -->
            <div class="min-h-[470px]">
                <UTable
                    v-model:sort="sort"
                    :columns="selectedColumnsTable"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="openModal"
                    @update:sort="test"
                />
                <!--TODO: @toffee05 wat is theis @update:sort="test"-->
            </div>

            <template #footer>
                <div class="my-2 flex justify-end">
                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="totalItems"
                    />
                </div>
            </template>
        </UCard>
        <UModal
            v-model="modalIsOpen"
            :ui="{ transition: { leave: 'duration-0', enter: 'duration-0' } }"
            :prevent-close="props.editModeIsOpen"
        >
            <slot name="dataModal" />
        </UModal>
    </div>
</template>
