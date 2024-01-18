<script setup>
import downloadPDF from "~/utils/forms/downloadPDF.js";

const user = inject("user");

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
    updatePath: {
        type: String,
        required: true,
    },
});

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
    try {
        totalItems.value = allItemsData.value.length;
    } catch (e) {
        totalItems.value = 0;
    }
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

function test(tester) {
    // console.log(allItemsData.value);
}

// ---------- MODAL ---------- //
const modalIsOpen = ref(false);
const selectedData = ref();
function openModal(row) {
    modalIsOpen.value = true;
    selectedData.value = row;
}

const editModeIsOpen = ref(false);
function enableEditMode() {
    editModeIsOpen.value = true;
}

function discardChanges() {
    editModeIsOpen.value = false;
}

function saveChanges() {}

// ----- Multiple Selection Mode ----- //
const allowMultipleSelection = ref(false);
const selectedRows = ref([]);
function addToSelectedRows(row) {
    selectedRows.value.push(row);
}

// ----- Table Control Panel ---- //
async function approveAll() {
    await useFetch(props.updatePath, {
        method: "POST",
        body: {
            action: "APPROVE",
            items: selectedRows.value.map((element) => element.id),
            user: user.adminsId,
        },
    });
    updateTable();
}

async function rejectAll() {
    await useFetch(props.updatePath, {
        method: "POST",
        body: {
            action: "REJECT",
            items: selectedRows.value.map((element) => element.id),
            user: user.adminsId,
        },
    });
    updateTable();
}

async function downloadAll() {
    const requests = selectedRows.value.map((element) => element.id);
    for (const request of requests) {
        const rawPDFBuffers = await useFetch("/api/forms/create-pdf-buffers", {
            method: "POST",
            body: {
                id: request,
            },
        });

        downloadPDF(rawPDFBuffers.data.value[0], rawPDFBuffers.data.value[1]);
    }
}
updateTable();
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">{{ title }}</h2>
            </template>

            <div class="flex flex-col">
                <div class="mb-5 mt-1 flex flex-col items-center">
                    <!-- TODO: Maybe have the control panel in an accorion drop down if it gets too big? -->
                    <div class="mb-2 flex flex-row align-top">
                        <h3>Table Control Panel</h3>
                        <UTooltip>
                            <UButton
                                icon="i-material-symbols-info-outline-rounded"
                                size="2xs"
                                variant="link"
                                square
                            />
                            <template #text>
                                <div>
                                    Enable Selection mode to allow multiple
                                    selections.
                                </div>
                            </template>
                        </UTooltip>
                    </div>
                    <div class="my-1 flex w-full flex-row items-start">
                        <div class="flex h-[32px] flex-row items-center">
                            <h4 class="mr-2">Selection</h4>
                            <UToggle
                                v-model="allowMultipleSelection"
                                size="lg"
                            />
                            <div
                                v-if="allowMultipleSelection"
                                class="ml-3 mr-5 flex flex-row space-x-1"
                            >
                                <UButton
                                    label="Download ALL"
                                    :disabled="!allowMultipleSelection"
                                    @click="downloadAll"
                                />
                                <UButton
                                    label="Approve ALL"
                                    :disabled="!allowMultipleSelection"
                                    color="emerald"
                                    @click="approveAll"
                                />
                                <UButton
                                    label="Reject ALL"
                                    :disabled="!allowMultipleSelection"
                                    color="red"
                                    variant="outline"
                                    @click="rejectAll"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
            </div>

            <!-- DATA TABLE -->
            <div v-if="!allowMultipleSelection">
                <UTable
                    v-model:sort="sort"
                    :columns="selectedColumns"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="openModal"
                />
            </div>
            <div v-else>
                <UTable
                    v-model:sort="sort"
                    v-model="selectedRows"
                    :columns="selectedColumns"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="addToSelectedRows"
                />
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
            :prevent-close="editModeIsOpen"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                            {{
                                selectedData[listOfAllColumns[0].key] +
                                (props.title === "GRADE & SECTIONS" ||
                                props.title === "SCHOOL YEARS"
                                    ? " - " +
                                      selectedData[listOfAllColumns[1].key]
                                    : "") +
                                (props.title === "ALL USERS"
                                    ? " - " +
                                      selectedData[listOfAllColumns[1].key] +
                                      ", " +
                                      selectedData[listOfAllColumns[2].key]
                                    : "")
                            }}
                        </h3>
                        <UButton
                            v-if="!editModeIsOpen"
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="modalIsOpen = false"
                        />
                        <UButton
                            v-else
                            color="red"
                            variant="soft"
                            icon="i-material-symbols-delete-outline"
                            label="DELETE RECORD"
                        />
                    </div>
                </template>

                <template #footer>
                    <div class="flex w-auto justify-center">
                        <UButton
                            v-if="!editModeIsOpen"
                            color="green"
                            label="EDIT"
                            icon="i-material-symbols-edit"
                            @click="enableEditMode"
                        />
                        <div v-else class="flex w-[100%] justify-between">
                            <UButton
                                variant="outline"
                                icon="i-material-symbols-cancel"
                                color="red"
                                label="CANCEL"
                                @click="discardChanges"
                            />
                            <UButton
                                variant="outline"
                                icon="i-material-symbols-save"
                                label="SAVE"
                                color="green"
                                @click="saveChanges"
                            />
                        </div>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
