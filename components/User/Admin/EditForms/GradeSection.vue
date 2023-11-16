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
        return allGradeSectionsData.value;
    }
    // filtering the rows
    const skipKeys = ["id", "createdAt", "updatedAt"];
    const filtered = allGradeSectionsData.value.filter((item) => {
        return Object.values(item).some((value) => {
            const skip = Object.keys(item).find((key) => item[key] === value);
            if (skipKeys.includes(skip)) {
                return false;
            }
            return String(value)
                .toLowerCase()
                .includes(String(searchQuery.value).toLowerCase());
        });
    });
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered;
});

// Selection and User Modal
const selectedGradeSection = ref();
const gradeSectionModalIsOpen = ref(false);
const editingModalIsOpen = ref(false);
const tempGradeSectionValues = ref();
function OpenGradeSectionModal(row) {
    selectedGradeSection.value = row;
    tempGradeSectionValues.value = Object.assign(
        true,
        {},
        selectedGradeSection.value,
    );
    gradeSectionModalIsOpen.value = true;
    editingModalIsOpen.value = false;
}

// Editing row values
function editingMode() {
    editingModalIsOpen.value = true;
}

const saveConfirmButton = ref({
    text: "SAVE CHANGES",
    color: "primary",
});
// Discard row changes
function discardChanges() {
    editingModalIsOpen.value = false;
    saveConfirmButton.value.text = "SAVE CHANGES";
    saveConfirmButton.value.color = "primary";
    tempGradeSectionValues.value = Object.assign(
        true,
        {},
        selectedGradeSection.value,
    );
}

// Approving row changes
async function confirmEditRow() {
    // Second confirmation press check
    if (
        tempGradeSectionValues.value.grade === "" ||
        tempGradeSectionValues.value.section === ""
    ) {
        saveConfirmButton.value.text = "FILL FORM PROPERLY";
        saveConfirmButton.value.color = "red";
        return null;
    } else if (
        saveConfirmButton.value.text === "SAVE CHANGES" ||
        saveConfirmButton.value.text === "FILL FORM PROPERLY"
    ) {
        saveConfirmButton.value.text = "PRESS AGAIN TO CONFIRM";
        saveConfirmButton.value.color = "red";
        return null;
    }
    selectedGradeSection.value = Object.assign(
        true,
        {},
        tempGradeSectionValues.value,
    );

    // Updating database with changed row
    const request = await useFetch("/api/db/editForms/updateGradeSections", {
        method: "POST",
        body: {
            user,
            change: { ...selectedGradeSection.value },
            changeType: "edit",
        },
    });

    updateTable();
    discardChanges(); // Reset modal
    gradeSectionModalIsOpen.value = false;
}

// Add new record
const saveAddRowConfirmButton = ref({
    text: "ADD",
    color: "primary",
});
const addGradeSectionModalIsOpen = ref(false);
function OpenAddGradeSection() {
    addGradeSectionModalIsOpen.value = true;
    discardAdd();
}

const newGradeSectionValues = ref({
    grade: null,
    section: null,
});

// Discard new record
function discardAdd() {
    newGradeSectionValues.value.grade = null;
    newGradeSectionValues.value.section = null;
    saveAddRowConfirmButton.value.text = "ADD";
    saveAddRowConfirmButton.value.color = "primary";
}

// Confirm add new record
async function confirmAddRow() {
    // Second confirmation press check
    if (
        newGradeSectionValues.value.grade == null ||
        newGradeSectionValues.value.section == null
    ) {
        saveAddRowConfirmButton.value.text = "PLEASE FILL ALL PAGES";
        saveAddRowConfirmButton.value.color = "red";
        return null;
    } else if (
        saveAddRowConfirmButton.value.text === "ADD" ||
        saveAddRowConfirmButton.value.text === "PLEASE FILL ALL PAGES"
    ) {
        saveAddRowConfirmButton.value.text = "PRESS AGAIN TO CONFIRM";
        saveAddRowConfirmButton.value.color = "red";
        return null;
    }

    // Add new record to database
    const request = await useFetch("/api/db/editForms/updateGradeSections", {
        method: "POST",
        body: {
            user,
            change: { ...newGradeSectionValues.value },
            changeType: "add",
        },
    });

    updateTable();
    discardAdd();
    addGradeSectionModalIsOpen.value = false;
}

const deleteRowButton = ref("DELETE GRADE AND SECTION");

// Deleting a record
async function deleteGradeSection(id) {
    if (deleteRowButton.value === "DELETE GRADE AND SECTION") {
        deleteRowButton.value = "PRESS AGAIN TO CONFIRM";
        return null;
    }

    // Delete record from database
    const request = await useFetch("/api/db/editForms/updateGradeSections", {
        method: "POST",
        body: {
            user,
            change: { id },
            changeType: "delete",
        },
    });

    updateTable();
    deleteRowButton.value = "DELETE GRADE AND SECTION";
    discardChanges();
    gradeSectionModalIsOpen.value = false;
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
                        @click="OpenAddGradeSection"
                    />
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
                            {{ selectedGradeSection.grade }} -
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
                    <div class="mt-5 flex justify-between">
                        <div>Grade:</div>
                        <UInput
                            v-model="tempGradeSectionValues.grade"
                            type="number"
                            :ui="{
                                base: 'w-[202px]  disabled:cursor-not-allowed disabled:opacity-75',
                            }"
                            :disabled="editingModalIsOpen == false"
                        />
                    </div>
                    <div class="mt-1 flex justify-between">
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
                    :label="deleteRowButton"
                    class="mr-3 disabled:invisible"
                    @click="deleteGradeSection(tempGradeSectionValues.id)"
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
                                @click="confirmEditRow"
                            />
                        </div>
                    </div>
                </template>
            </UCard>
        </UModal>

        <!-- Add Record Modal -->
        <UModal v-model="addGradeSectionModalIsOpen">
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
                            ADD RECORD
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="addGradeSectionModalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>Grade:</div>
                        <UInput
                            v-model="newGradeSectionValues.grade"
                            :ui="{
                                base: 'w-[202px]',
                            }"
                        />
                    </div>
                    <div class="mt-1 flex justify-between">
                        <div>Section:</div>
                        <UInput
                            v-model="newGradeSectionValues.section"
                            :ui="{
                                base: 'w-[202px]',
                            }"
                        />
                    </div>
                </div>

                <template #footer>
                    <!-- Action Buttons -->
                    <div class="flex w-auto justify-between">
                        <UButton
                            variant="outline"
                            icon="i-material-symbols-cancel"
                            label="CANCEL"
                            color="red"
                            @click="addGradeSectionModalIsOpen = false"
                        />
                        <UButton
                            variant="outline"
                            icon="i-material-symbols-save"
                            :label="saveAddRowConfirmButton.text"
                            :color="saveAddRowConfirmButton.color"
                            @click="confirmAddRow"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
