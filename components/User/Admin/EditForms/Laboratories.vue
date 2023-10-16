<script setup>
const user = inject("user");

// Set Columns of the table
const columns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
    },
];

// Pagination
const page = ref(1);
const pageCount = 4;
const totalItems = ref();

// Searching Rows
const { pending, data: allLaboratories } = await useLazyFetch(
    "/api/db/editForms/getAllLaboratoriesUnformatted",
);
const allLaboratoriesData = ref([]);
watch(allLaboratories, (updatedValues) => {
    allLaboratoriesData.value = updatedValues;
});

async function updateTable() {
    const allLaboratories = await useFetch("/api/db/editForms/getAllLaboratoriesUnformatted");
    allLaboratoriesData.value = allLaboratories.data.value;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allLaboratoriesData.value.length;
        return allLaboratoriesData.value;
    }
    // filtering the rows
    const skipKeys = [
        "id",
        "createdAt",
        "updatedAt",
        "description",
        "locationId",
    ];
    let filtered = allLaboratoriesData.value.filter((item) => {
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
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered;
});

// Selection and User Modal
const selectedLaboratory = ref();
const LaboratoryModalIsOpen = ref(false);
function OpenLaboratoryModal(user) {
    selectedLaboratory.value = user;
    LaboratoryModalIsOpen.value = true;
}

updateTable();
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">LABORATORIES</h2>
            </template>

            <div>
                <div class="flex flex-row">
                    <UButton
                        icon="i-material-symbols-refresh"
                        @click="updateTable"
                        class="mr-2"
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
            </div>

            <!-- DATA TABLE -->
            <UTable
                @select="OpenLaboratoryModal"
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui="{ tr: { active: 'hover:bg-gray-200' } }"
            />

            <div class="flex w-[100%] items-center justify-end">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="totalItems"
                />
            </div>
        </UCard>

        <!-- User Modals -->
        <UModal v-model="LaboratoryModalIsOpen" prevent-close>
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
                            {{ selectedLaboratory.name }}
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="LaboratoryModalIsOpen = false"
                        />
                    </div>
                </template>

                <pre>
                    {{ selectedLaboratory }}
                </pre>

                <UButton
                    color="red"
                    variant="soft"
                    icon="i-material-symbols-delete-outline"
                    label="DELETE GRADE AND SECTION"
                    class="mr-3"
                />
                <template #footer>
                    <!-- Action Buttons -->
                    <div class="flex w-full items-center justify-end">
                        <UButton variant="solid" icon="i-material-symbols-save" label="SAVE CHANGES" @click="approveRequest" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
