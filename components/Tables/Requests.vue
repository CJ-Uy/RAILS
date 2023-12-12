<script setup>
const user = inject("user");

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    defaultSortKey: {
        type: String,
        required: false,
        default: "createdAt",
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
    editModeIsOpen: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(["selectedRow"]);

const selectedColumns = ref([...props.startingColumns]);
const defaultSort = ref({ column: props.defaultSortKey, direction: "asc" });
const totalItems = ref();

// TODO: maybe have a thing where it refreshes as soon as possible like with a watch/watchEffect on the fetch request?
const { pending, data: allItems } = await useLazyFetch(props.fetchPath);
const allItemsData = ref([]);
watch(allItems, (updatedValues) => {
    allItemsData.value = updatedValues;
});

async function updateTable() {
    const allItems = await useFetch(props.fetchPath);
    allItemsData.value = allItems.data.value;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allItemsData.value.length;
        return allItemsData.value;
    }
    // filtering the rows
    const filtered = allItemsData.value.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value)
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase());
        });
    });

    totalItems.value = filtered.length;
    return filtered;
});

// ---------- MODAL ---------- //
const modalIsOpen = ref(false);
function openModal(row) {
    modalIsOpen.value = true;
    emit("selectedRow", row);
}

const editModalIsOpen = ref(false);
watch(
    () => props.editModeIsOpen,
    (newValue) => {
        modalIsOpen.value = !newValue;
        editModalIsOpen.value = newValue;
    },
);

// ----- Multiple Selection Mode ----- //
const allowMultipleSelection = ref(false);
const selectedRows = ref([]);
function addToSelectedRows(row) {
    selectedRows.value.push(row);
}

// ----- Table Control Panel ---- //
async function approveAll() {
    console.log("Approving all");
    const approveAllItems = await useFetch(props.updatePath, {
        method: "POST",
        body: {
            action: "APPROVE",
            items: selectedRows.value.map((element) => element.id),
            user: user.adminsId,
        },
    });
}

async function rejectAll() {
    console.log("Rejecting all");
}

async function downloadAll() {
    console.log("Downloading all");
}
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
                        <!-- TODO: Have an info box appear that explains
                            that when allowing Multiple Selection you 
                            cannot click to view the request details and 
                            you must turn it off to inspect each request -->
                        <UButton
                            icon="i-material-symbols-info-outline-rounded"
                            size="2xs"
                            variant="link"
                            square
                        />
                    </div>
                    <div class="flex w-full flex-row items-start">
                        <div class="flex flex-row items-center">
                            <h4 class="mr-2">Multiple Selection</h4>
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
                                    @click="approveAll"
                                    color="emerald"
                                />
                                <UButton
                                    label="Reject ALL"
                                    :disabled="!allowMultipleSelection"
                                    @click="rejectAll"
                                    color="red"
                                    variant="outline"
                                />
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
                                :value-attribute="key"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- DATA TABLE -->
            <div v-if="!allowMultipleSelection">
                <UTable
                    v-model:sort="defaultSort"
                    :columns="selectedColumns"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="openModal"
                />
            </div>
            <div v-else>
                <UTable
                    v-model:sort="defaultSort"
                    v-model="selectedRows"
                    :columns="selectedColumns"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="addToSelectedRows"
                />
            </div>
        </UCard>
        <UModal
            v-model="modalIsOpen"
            :ui="{ transition: { leave: 'duration-0', enter: 'duration-0' } }"
        >
            <slot name="detailsModal" />
        </UModal>
        <UModal
            v-model="editModalIsOpen"
            :ui="{ transition: { enter: 'duration-0', leave: 'duration-0' } }"
            prevent-close
        >
            <slot name="editModeModal" />
        </UModal>
    </div>
</template>

<style scoped></style>
