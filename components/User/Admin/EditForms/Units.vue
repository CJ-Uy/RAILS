<script setup>
import dayjs from "dayjs";

const user = inject("user");

// Set Columns of the table
const columns = [
    { key: "name", label: "Units" },
    { key: "frequencyRank", label: "Frequency Rank" },
];

// Searching Rows
const { pending, data: allUnits } = await useLazyFetch(
    "/api/db/rawData/getAllUnits",
);
const allUnitsData = ref([]);
watch(allUnits, (updatedValues) => {
    allUnitsData.value = updatedValues;
});
const totalItems = ref();

async function updateTable() {
    const allUnits = await useFetch("/api/db/rawData/getAllUnits");
    allUnitsData.value = allUnits.data.value;
    totalItems.value = allUnitsData.value.length;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        return allUnitsData.value;
    }
    // filtering the rows
    const skipKeys = ["id", "createdAt", "updatedAt"];
    const filtered = allUnitsData.value.filter((item) => {
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
    return filtered;
});

// Selection and User Modal
const selectedUnit = ref();
const unitModalIsOpen = ref(false);
const editingModalIsOpen = ref(false);
const tempUnitValues = ref();
function OpenUnitModal(row) {
    selectedUnit.value = row;
    tempUnitValues.value = Object.assign(true, {}, selectedUnit.value);
    unitModalIsOpen.value = true;
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
    tempUnitValues.value = Object.assign(true, {}, selectedUnit.value);
}

// Approving row changes
async function confirmEditRow() {
    // Second confirmation press check
    if (
        tempUnitValues.value.name === "" ||
        tempUnitValues.value.frequencyRank === "" ||
        ![...Array(totalItems.value).keys()]
            .map((a) => (a + 1).toString())
            .includes(tempUnitValues.value.frequencyRank)
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

    // Updating database with changed row
    const requestFirst = await useFetch("/api/db/rawData/updateUnits", {
        method: "POST",
        body: {
            user,
            origFrequencyRank: selectedUnit.value.frequencyRank,
            change: { ...tempUnitValues.value },
            changeType: "edit",
        },
    });

    updateTable();
    discardChanges(); // Reset modal
    unitModalIsOpen.value = false;
}

// Add new record
const saveAddRowConfirmButton = ref({
    text: "ADD",
    color: "primary",
});
const addUnitModalIsOpen = ref(false);
function OpenAddUnit() {
    addUnitModalIsOpen.value = true;
    discardAdd();
}

const newUnitValues = ref({
    unit: null,
    frequencyRank: null,
});

// Discard new record
function discardAdd() {
    newUnitValues.value.unit = null;
    newUnitValues.value.frequencyRank = null;
    saveAddRowConfirmButton.value.text = "ADD";
    saveAddRowConfirmButton.value.color = "primary";
}

// Confirm add new record
async function confirmAddRow() {
    // Second confirmation press check
    if (newUnitValues.value.name === null) {
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
    const request = await useFetch("/api/db/rawData/updateUnits", {
        method: "POST",
        body: {
            user,
            change: { ...newUnitValues.value },
            changeType: "add",
        },
    });

    updateTable();
    discardAdd();
    addUnitModalIsOpen.value = false;
}

const deleteRowButton = ref("DELETE UNIT");

// Deleting a record
async function deleteUnit(id) {
    if (deleteRowButton.value === "DELETE UNIT") {
        deleteRowButton.value = "PRESS AGAIN TO CONFIRM";
        return null;
    }

    // Delete record from database
    const request = await useFetch("/api/db/rawData/updateUnits", {
        method: "POST",
        body: {
            user,
            change: { id },
            changeType: "delete",
        },
    });

    updateTable();
    deleteRowButton.value = "DELETE UNIT";
    discardChanges();
    unitModalIsOpen.value = false;
}

async function moveUnit(dir, index) {
    if (index === 0 && dir === 0) {
        return null;
    } else if (index === totalItems.value - 1 && dir === 1) {
        return null;
    } else if (dir === 0) {
        const change = { ...allUnitsData.value[index] };
        change.frequencyRank = index;
        const requestFirst = await useFetch("/api/db/rawData/updateUnits", {
            method: "POST",
            body: {
                user,
                origFrequencyRank: index + 1,
                change: { ...change },
                changeType: "edit",
            },
        });
    } else if (dir === 1) {
        const change = { ...allUnitsData.value[index] };
        change.frequencyRank = index + 2;
        const requestFirst = await useFetch("/api/db/rawData/updateUnits", {
            method: "POST",
            body: {
                user,
                origFrequencyRank: index + 1,
                change: { ...change },
                changeType: "edit",
            },
        });
    }

    updateTable();
}

updateTable();
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">UNITS</h2>
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
                        @click="OpenAddUnit"
                    />
                </div>
            </div>

            <!-- DATA TABLE -->
            <div class="flex flex-row">
                <UTable
                    class="w-[90%]"
                    :columns="columns"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{
                        tr: { active: 'hover:bg-gray-200' },
                    }"
                    @select="OpenUnitModal"
                />
                <div class="w-[8%] overflow-y-hidden">
                    <div class="h-[48.4px]"></div>
                    <div
                        v-for="value in [...Array(totalItems).keys()]"
                        :key="allUnitsData[value]"
                        class="flex h-[52.8px] flex-col lg:flex-row lg:justify-between"
                    >
                        <UButton
                            color="green"
                            variant="solid"
                            class="h-1/2 text-center lg:h-2/3"
                            label="▲"
                            :ui="{ rounded: 'rounded-md' }"
                            @click="moveUnit(0, value)"
                        />
                        <UButton
                            color="red"
                            variant="solid"
                            class="h-1/2 lg:h-2/3"
                            label="▼"
                            :ui="{ rounded: 'rounded-md' }"
                            @click="moveUnit(1, value)"
                        />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- User Modals -->
        <UModal v-model="unitModalIsOpen" prevent-close>
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
                            {{ selectedUnit.name }} -
                            {{ selectedUnit.frequencyRank }}
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="unitModalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>ID:</div>
                        <div>{{ tempUnitValues.id }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Created:</div>
                        <div>
                            {{
                                dayjs(tempUnitValues.createdAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Updated:</div>
                        <div>
                            {{
                                dayjs(tempUnitValues.updatedAt).format(
                                    "MMMM DD, YYYY - HH:MM",
                                )
                            }}
                        </div>
                    </div>
                    <div class="mt-5 flex justify-between">
                        <div>Unit:</div>
                        <UInput
                            v-model="tempUnitValues.name"
                            :ui="{
                                base: 'w-[202px]  disabled:cursor-not-allowed disabled:opacity-75',
                            }"
                            :disabled="editingModalIsOpen == false"
                        />
                    </div>
                    <div class="mt-1 flex justify-between">
                        <div>Frequency Rank:</div>
                        <UInput
                            v-model="tempUnitValues.frequencyRank"
                            type="number"
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
                    @click="deleteUnit(tempUnitValues.id)"
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
        <UModal v-model="addUnitModalIsOpen">
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
                            @click="addUnitModalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="my-5 flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>Unit Name:</div>
                        <UInput
                            v-model="newUnitValues.name"
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
                            @click="addUnitModalIsOpen = false"
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
