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
        required: false,
        default: () => [],
    },
    fetchPath: {
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

const defaultSort = ref({ column: props.defaultSortKey, direction: "asc" });

const totalItems = ref();

const columns = ref(props.startingColumns);
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
    const skipKeys = [
        "id",
        "createdAt",
        "updatedAt",
        "description",
        "locationName",
    ];
    const filtered = allItemsData.value.filter((item) => {
        return Object.values(item).some((value) => {
            const skip = Object.keys(item).find((key) => item[key] === value);
            if (skipKeys.includes(skip)) {
                return false;
            }
            return String(value)
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase());
        });
    });

    // TODO: Slice the values into pages
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
        editModalIsOpen.value = newValue;
        modalIsOpen.value = !newValue;
    },
);
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">{{ title }}</h2>
            </template>

            <div>
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row">
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
                    </div>
                    <UButton
                        label="ADD RECORD"
                        icon="i-material-symbols-add"
                        class=""
                        @click="OpenAddLaboratory"
                    />
                </div>
            </div>

            <!-- DATA TABLE -->
            <UTable
                v-model:sort="defaultSort"
                @select="openModal"
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui="{ tr: { active: 'hover:bg-gray-200' } }"
            />
        </UCard>

        <UModal v-model="editModalIsOpen">
            <slot name="editModeModal" />
        </UModal>
        <UModal v-model="modalIsOpen">
            <slot name="detailsModal" />
        </UModal>
    </div>
</template>