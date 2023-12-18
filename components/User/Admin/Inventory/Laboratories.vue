<script setup>
import dayjs from "dayjs";

const user = inject("user");

// Set Columns of the table
const columns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
        direction: "asc",
    },
    {
        key: "locationName",
        label: "Location",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
];

const defaultSort = ref({ column: "name", direction: "asc" });

const totalItems = ref();

// Searching Rows
const { pending, data: allLaboratories } = await useLazyFetch(
    "/api/db/rawData/getAllLaboratories",
);
const allLaboratoriesData = ref([]);
watch(allLaboratories, (updatedValues) => {
    allLaboratoriesData.value = updatedValues;
    for (let i = 0; i < allLaboratoriesData.value.length; i++) {
        allLaboratoriesData.value[i].locationName =
            allLaboratoriesData.value[i].location.name;
    }
});

async function updateTable() {
    const allLaboratories = await useFetch(
        "/api/db/rawData/getAllLaboratories",
    );
    allLaboratoriesData.value = allLaboratories.data.value;
    for (let i = 0; i < allLaboratoriesData.value.length; i++) {
        allLaboratoriesData.value[i].locationName =
            allLaboratoriesData.value[i].location.name;
    }
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
        "locationName",
    ];
    const filtered = allLaboratoriesData.value.filter((item) => {
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
const laboratoryModalIsOpen = ref(false);
const editingModalIsOpen = ref(false);
const tempLaboratoryValues = ref();
function OpenLaboratoryModal(row) {
    selectedLaboratory.value = row;
    tempLaboratoryValues.value = Object.assign(
        true,
        {},
        selectedLaboratory.value,
    );
    laboratoryModalIsOpen.value = true;
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
    tempLaboratoryValues.value = Object.assign(
        true,
        {},
        selectedLaboratory.value,
    );
}

// Approving row changes
async function confirmEditRow() {
    // Second confirmation press check
    if (saveConfirmButton.value.text === "SAVE CHANGES") {
        saveConfirmButton.value.text = "PRESS AGAIN TO CONFIRM";
        saveConfirmButton.value.color = "red";
        return null;
    }
    selectedLaboratory.value = Object.assign(
        true,
        {},
        tempLaboratoryValues.value,
    );

    // Updating database with changed row
    const request = await useFetch("/api/db/rawData/updateLaboratories", {
        method: "POST",
        body: {
            user,
            change: { ...selectedLaboratory.value },
            changeType: "edit",
        },
    });

    updateTable();
    discardChanges(); // Reset modal
    laboratoryModalIsOpen.value = false;
}

// Add new record
const saveAddRowConfirmButton = ref({
    text: "ADD",
    color: "primary",
});
const addLaboratoryModalIsOpen = ref(false);
function OpenAddLaboratory() {
    addLaboratoryModalIsOpen.value = true;
    discardAdd();
}

const newLaboratoryValues = ref({
    name: null,
});

// Discard new record
function discardAdd() {
    newLaboratoryValues.value.name = null;
    saveAddRowConfirmButton.value.text = "ADD";
    saveAddRowConfirmButton.value.color = "primary";
}

// Confirm add new record
async function confirmAddRow() {
    // Second confirmation press check
    if (newLaboratoryValues.value.name == null) {
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
    const request = await useFetch("/api/db/rawData/updateLaboratories", {
        method: "POST",
        body: {
            user,
            change: { ...newLaboratoryValues.value },
            changeType: "add",
        },
    });

    updateTable();
    discardAdd();
    addLaboratoryModalIsOpen.value = false;
}

const deleteRowButton = ref("DELETE LABORATORY");

// Deleting a record
async function deleteLaboratory(id) {
    if (deleteRowButton.value === "DELETE LABORATORY") {
        deleteRowButton.value = "PRESS AGAIN TO CONFIRM";
        return null;
    }

    // Delete record from database
    const request = await useFetch("/api/db/rawData/updateLaboratories", {
        method: "POST",
        body: {
            user,
            change: { id },
            changeType: "delete",
        },
    });

    updateTable();
    deleteRowButton.value = "DELETE LABORATORY";
    discardChanges();
    laboratoryModalIsOpen.value = false;
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
                @select="OpenLaboratoryModal"
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui="{ tr: { active: 'hover:bg-gray-200' } }"
            />
        </UCard>

        <!-- User Modals -->
        <UModal v-model="laboratoryModalIsOpen" prevent-close>
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
                            @click="laboratoryModalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>ID:</div>
                        <div>{{ tempLaboratoryValues.id }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Created:</div>
                        <div>
                            {{
                                dayjs(tempLaboratoryValues.createdAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Updated:</div>
                        <div>
                            {{
                                dayjs(tempLaboratoryValues.updatedAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Description:</div>
                        <div>{{ tempLaboratoryValues.description }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Location:</div>
                        <div>{{ tempLaboratoryValues.locationName }}</div>
                    </div>
                    <div class="mt-5 flex justify-between">
                        <div>Laboratory Name:</div>
                        <UInput
                            v-model="tempLaboratoryValues.name"
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
                    @click="deleteLaboratory(tempLaboratoryValues.id)"
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
        <UModal v-model="addLaboratoryModalIsOpen">
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
                            @click="addLaboratoryModalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>Laboratory Name:</div>
                        <UInput
                            v-model="newLaboratoryValues.name"
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
                            @click="addLaboratoryModalIsOpen = false"
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
