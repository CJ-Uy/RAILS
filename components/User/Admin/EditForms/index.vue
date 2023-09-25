<script setup>

const user = inject("user");

// Set Coulmns of the table
const columns = [
    {
        key: "grade",
        label: "Grade Level",
        sortable: true,
    },
    { key: "section", label: "Section", sortable: true },
];

// Pagination
const page = ref(1);
const pageCount = 6;
const totalItems = ref();

// Searching Rows
const { pending, data: allGradeSections } = await useLazyFetch(
    "/api/db/forms/getAllGradeSectionsUnformatted",
);
const allGradeSectionsData = ref([]);
watch(allGradeSections, (updatedValues) => {
    allGradeSectionsData.value = updatedValues;
});

async function updateTable() {
    const allGradeSections = await useFetch("/api/db/forms/getAllGradeSectionsUnformatted");
    allGradeSectionsData.value = allGradeSections.data.value;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allGradeSectionsData.value.length;
        return allGradeSectionsData.value.slice(
            (page.value - 1) * pageCount,
            page.value * pageCount,
        );
    }
    // filtering the rows
    const filtered = allGradeSectionsData.value.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value)
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase());
        });
    });
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered.slice((page.value - 1) * pageCount, page.value * pageCount);
});

// Seclection and User Modal
const selectedGradeSection = ref();
const gradeSectionModalIsOpen = ref(false);
function OpenGradeSectionModal(user) {
    selectedGradeSection.value = user;
    gradeSectionModalIsOpen.value = true;
}
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">GRADES AND SECTIONS</h2>
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
                @select="OpenGradeSectionModal"
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
        <UModal v-model="gradeSectionModalIsOpen" prevent-close>
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
                            {{ selectedGradeSection.gradeLevel }},
                            {{ selectedGradeSection.section }}
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="gradeSectionModalIsOpen = false"
                        />
                    </div>
                </template>

                <pre>
                    {{ selectedGradeSection }}
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
