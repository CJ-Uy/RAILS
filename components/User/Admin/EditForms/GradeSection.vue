<script setup>
import dayjs from "dayjs";

const user = inject("user");

// Set Columns of the table
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
    "/api/db/editForms/getAllGradeSectionsUnformatted",
);
const allGradeSectionsData = ref([]);
watch(allGradeSections, (updatedValues) => {
    allGradeSectionsData.value = updatedValues;
});

async function updateTable() {
    const allGradeSections = await useFetch(
        "/api/db/editForms/getAllGradeSectionsUnformatted",
    );
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
    let filtered = allGradeSectionsData.value.filter((item) => {
        return Object.values(item).some((value) => {
            const skip = Object.keys(item).find((key) => item[key] === value);
            if (skip === "id" || skip === "createdAt" || skip === "updatedAt") {
                return false;
            }
            return String(value)
                .toLowerCase()
                .includes(String(searchQuery.value).toLowerCase());
        });
    });
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const filteredRowsSliced = ref();
function sortFix(obj) {
    console.log(obj.key);
}

// Selection and User Modal
const selectedGradeSection = ref();
const gradeSectionModalIsOpen = ref(false);
const editingModalIsOpen = ref(false);
const tempGradeSectionValues = ref();
function OpenGradeSectionModal(user) {
    selectedGradeSection.value = user;
    tempGradeSectionValues.value = Object.assign(true, {}, selectedGradeSection.value);
    gradeSectionModalIsOpen.value = true;
    editingModalIsOpen.value = false;
}

function editingMode() {
    editingModalIsOpen.value = true;
}

const saveConfirmButton = ref({
    text: "SAVE CHANGES",
    color: "primary",
});
function discardChanges() {
    editingModalIsOpen.value = false;
    tempGradeSectionValues.value = Object.assign(true, {}, selectedGradeSection.value);
    saveConfirmButton.value.text = "SAVE CHANGES";
    saveConfirmButton.value.color = "primary";
}

function approveRequest() {
    saveConfirmButton.value.text = "PRESS AGAIN TO CONFIRM";
    saveConfirmButton.value.color = "red";
    console.log("yes");
}

updateTable();
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
            </div>

            <!-- DATA TABLE -->
            <UTable
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                @select="OpenGradeSectionModal"
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
                            {{ tempGradeSectionValues.grade }} -
                            {{ tempGradeSectionValues.section }}
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

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>ID:</div>
                        <div>{{ tempGradeSectionValues.id }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Created:</div>
                        <div>
                            {{
                                dayjs(tempGradeSectionValues.createdAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Updated:</div>
                        <div>
                            {{
                                dayjs(tempGradeSectionValues.updatedAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div
                        class="mt-5 flex justify-between disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        <div>Grade:</div>
                        <UInput
                            v-model="tempGradeSectionValues.grade"
                            :ui="{
                                base: 'w-[202px]  disabled:cursor-not-allowed disabled:opacity-75',
                            }"
                            :disabled="editingModalIsOpen == false"
                        />
                    </div>
                    <div class="flex justify-between">
                        <div>Section:</div>
                        <UInput
                            v-model="tempGradeSectionValues.section"
                            :ui="{
                                base: 'w-[202px]  disabled:cursor-not-allowed disabled:opacity-75',
                            }"
                            :disabled="editingModalIsOpen == false"
                        />
                    </div>
                </div>

                <UButton
                    :disabled="editingModalIsOpen == false"
                    color="red"
                    variant="soft"
                    icon="i-material-symbols-delete-outline"
                    label="DELETE GRADE AND SECTION"
                    class="mr-3 disabled:invisible"
                />

                <template #footer>
                    <!-- Action Buttons -->
                    <div class="flex w-auto justify-center">
                        <UButton
                            v-if="editingModalIsOpen == false"
                            variant="solid"
                            icon="i-material-symbols-edit"
                            label="EDIT"
                            color="green"
                            @click="editingMode"
                        />
                        <div v-else class="flex w-[100%] justify-between">
                            <UButton
                                variant="solid"
                                icon="i-material-symbols-undo"
                                label="UNDO CHANGES"
                                @click="discardChanges"
                            />
                            <UButton
                                variant="outline"
                                icon="i-material-symbols-save"
                                :label="saveConfirmButton.text"
                                :color="saveConfirmButton.color"
                                @click="approveRequest"
                            />
                        </div>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
