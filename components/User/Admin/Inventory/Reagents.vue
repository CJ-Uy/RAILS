<script setup>
import dayjs from "dayjs";
const user = inject("user");

const startingColumns = [
    "chemicalName",
    "description",
    "classification",
    "quantity",
    "reservedQuantity",
    "available",
]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "chemicalName",
        label: "Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "classification",
        label: "Class",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Inventory Quantity",
        sortable: true,
    },
    {
        key: "reservedQuantity",
        label: "Reserved Quantity",
        sortable: true,
    },
    {
        key: "casNumber",
        label: "CAS Number",
        sortable: true,
    },
    {
        key: "code",
        label: "Code",
        sortable: true,
    },
    {
        key: "manufacturerName",
        label: "Manufacturer",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "DGClass",
        label: "DG Class",
        sortable: true,
    },
    {
        key: "subRisk",
        label: "Sub Risk",
        sortable: true,
    },
    {
        key: "PG",
        label: "PG",
        sortable: true,
    },
    {
        key: "riskPhrase",
        label: "Risk Phrase",
        sortable: true,
    },
    {
        key: "safetyPhrase",
        label: "Safety Phrase",
        sortable: true,
    },
    {
        key: "hazSub",
        label: "Haz Sub",
        sortable: true,
    },
    {
        key: "poisonSchedule",
        label: "Poison Schedule",
        sortable: true,
    },
    {
        key: "currentSDS",
        label: "Current SDS",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
        sortable: true,
    },
    {
        key: "expiryDate",
        label: "Expiry Date",
        sortable: true,
    },
    {
        key: "dateOpened",
        label: "Date Opened",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
    },
    {
        key: "laboratoriesId",
        label: "LaboratoryID",
        sortable: true,
    },
    {
        key: "schoolYearId",
        label: "School Year ID",
        sortable: true,
    },
    {
        key: "id",
        label: "ID",
        sortable: true,
    },
    {
        key: "createdAt",
        label: "Entry Created",
        sortable: true,
    },
    {
        key: "updatedAt",
        label: "Entry Updated",
        sortable: true,
    },
    {
        key: "available",
        label: "Availability",
        sortable: true,
    },
    {
        key: "hidden",
        label: "Hidden",
        sortable: true,
    },
];

// Editing Mode
const editModeIsOpen = ref(false);
function enableEditMode() {
    editModeIsOpen.value = true;
    colorEditable.value = "red";
}
function discardChanges() {
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    tableRef.value.closeDataModal();
    tableRef.value.updateTable();
}

async function updateChanges() {
    await useFetch("/api/admin/manageReagents/updateReagent", {
        method: "POST",
        body: JSON.stringify(selectedData.value),
    });
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    tableRef.value.closeDataModal();
    tableRef.value.updateTable();
}

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
    selectedData.value.createdAt = dayjs(data.createdAt).format(
        "MMM DD, YYYY ; HH:mm",
    );
    selectedData.value.updatedAt = dayjs(data.updatedAt).format(
        "MMM DD, YYYY ; HH:mm",
    );
}

// Only allow editing if the user is an administrator
const allowedEditing = ref(user.role === "ADMIN");

// Editing Mode Appearances
const colorEditable = ref("gray");

const tableRef = ref();

// Add Record Modal
const newReagentData = ref({ available: true, hidden: false });
const addRecordModalIsOpen = ref(false);
function closeAddRecordModal() {
    newReagentData.value = { available: true, hidden: false };
    addRecordModalIsOpen.value = false;
    tableRef.value.closeAddRecord();
}
async function addNewItem() {
    await useFetch("/api/admin/manageReagents/addReagent", {
        method: "POST",
        body: JSON.stringify(newReagentData.value),
    });

    newReagentData.value = { available: true, hidden: false };
    tableRef.value.closeAddRecord();
    tableRef.value.updateTable();
}

const failedDeletion = ref(false);
async function deleteItem() {
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    const deletion = await useFetch("/api/admin/manageReagents/deleteReagent", {
        method: "POST",
        body: JSON.stringify(selectedData.value),
    });

    if (deletion.data.value === "DELETION FAILED; MARKED HIDDEN") {
        failedDeletion.value = true;
    }

    tableRef.value.closeDataModal();
    tableRef.value.updateTable();
}

// Transactions
const transactionWindowIsOpen = ref(false);
const newTransaction = ref({
    newQuantity: computed(() => {
        if (newTransaction.value.transactionType === "ADD") {
            return (
                selectedData.value.quantity +
                newTransaction.value.changeInQuantity
            );
        } else if (newTransaction.value.transactionType === "REMOVE") {
            return (
                selectedData.value.quantity -
                newTransaction.value.changeInQuantity
            );
        } else if (newTransaction.value.transactionType === "MODIFY TO") {
            return newTransaction.value.changeInQuantity;
        }
    }),
});

function openTransactionWindow() {
    tableRef.value.closeDataModal();
    transactionWindowIsOpen.value = true;
    newTransaction.value.transactionType = null;
    newTransaction.value.changeInQuantity = null;
}
function closeTransactionWindow() {
    tableRef.value.closeDataModal();
    transactionWindowIsOpen.value = false;
    newTransaction.value.transactionType = null;
    newTransaction.value.changeInQuantity = null;
}

async function transactNewQuantity() {
    await useFetch("/api/admin/transact/reagents", {
        method: "POST",
        body: {
            data: selectedData.value,
            transaction: newTransaction.value,
        },
    });
    tableRef.value.updateTable();
    tableRef.value.closeDataModal();
    transactionWindowIsOpen.value = false;
}
</script>

<template>
    <div>
        <!-- Failed Deletion Modal -->
        <UModal v-model="failedDeletion">
            <UCard>
                <template #header>
                    <span class="text-red-500">MATERIALS DELETION FAILED</span>
                </template>
                <p>
                    Failed to delete {{ selectedData.chemicalName }} due to its
                    connection to existing data. Thus its forced deletion may
                    cause unwanted changes in other records.
                    <br />
                    <br />
                    <span class="font-bold">
                        It has instead been marked as hidden and will not be
                        seen by anyone except admins.
                    </span>
                </p>
            </UCard>
        </UModal>

        <!-- Quantity Transaction -->
        <UModal v-model="transactionWindowIsOpen" prevent-close>
            <UCard>
                <template #header>
                    <span class="text-dark-primary">
                        Quantity Transaction
                    </span>
                </template>
                <div class="flex flex-col">
                    <div class="mb-5 flex flex-col items-center justify-center">
                        <h2 class="text-2xl">
                            {{ selectedData.chemicalName }}
                        </h2>
                        <p>
                            {{ selectedData.description || "No Description" }}
                        </p>
                    </div>
                    <div class="grid grid-cols-2 gap-1">
                        <div class="flex items-center">Transaction Type</div>
                        <div class="flex items-center">
                            <USelect
                                v-model="newTransaction.transactionType"
                                placeholder="Required"
                                :options="['ADD', 'REMOVE', 'MODIFY TO']"
                            />
                        </div>

                        <div class="flex items-center">Change in Quantity</div>
                        <div class="flex items-center">
                            <UInput
                                v-model="newTransaction.changeInQuantity"
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                :placeholder="selectedData.unit"
                            />
                        </div>

                        <div class="flex items-center">Description</div>
                        <div class="flex items-center">
                            <UTextarea v-model="newTransaction.description" />
                        </div>
                    </div>
                </div>
                <div class="mt-5 grid grid-cols-3 content-center">
                    <div class="text-center">Before</div>
                    <div></div>
                    <div class="text-center">After</div>

                    <div class="flex items-center">
                        <UInput
                            v-model="selectedData.quantity"
                            disabled="true"
                            :ui="{ form: 'text-center' }"
                        />
                    </div>
                    <div class="w-full text-center">
                        <Icon
                            name="material-symbols:arrow-right-alt"
                            class="text-5xl"
                        />
                    </div>
                    <div class="flex items-center">
                        <UInput
                            v-model="newTransaction.newQuantity"
                            disabled="true"
                            :ui="{ form: 'text-center' }"
                        />
                    </div>
                </div>

                <template #footer>
                    <div class="flex w-[100%] justify-between">
                        <UButton
                            variant="outline"
                            icon="i-material-symbols-cancel"
                            color="red"
                            label="CANCEL"
                            @click="closeTransactionWindow"
                        />
                        <UButton
                            variant="outline"
                            icon="i-material-symbols-save"
                            label="SAVE"
                            color="green"
                            :disabled="
                                newTransaction.transactionType == null ||
                                newTransaction.changeInQuantity == null
                            "
                            @click="transactNewQuantity"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>

        <!-- Data Table -->
        <TablesWSlottedModals
            ref="tableRef"
            title="REAGENTS"
            default-sort-key="chemicalName"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllReagents"
            :allowedEditing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div
                            class="flex flex-row items-center justify-between space-x-3"
                        >
                            <h1>
                                {{ selectedData.chemicalName }}
                            </h1>
                            <UButton
                                label="TRANSACT"
                                color="green"
                                @click="openTransactionWindow()"
                            />
                        </div>
                    </template>
                    <div
                        v-for="(item, index) in listOfAllColumns"
                        :key="item.key"
                        class="grid grid-cols-3 gap-1 gap-y-2"
                    >
                        <!-- Left Label -->
                        <div
                            v-if="
                                ![
                                    'id',
                                    'laboratoriesId',
                                    'schoolYearId',
                                ].includes(item.key)
                            "
                            class="flex items-center p-1"
                        >
                            {{ item.label }}
                        </div>

                        <!-- Right Current Value -->
                        <div
                            v-if="
                                ![
                                    'id',
                                    'description',
                                    'quantity',
                                    'laboratoriesId',
                                    'schoolYearId',
                                    'createdAt',
                                    'updatedAt',
                                    'available',
                                    'hidden',
                                ].includes(item.key)
                            "
                            class="col-span-2 p-1"
                        >
                            <UInput
                                v-model="selectedData[item.key]"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <!-- Exceptions to UInput Fields -->
                        <div
                            v-if="item.key == 'description'"
                            class="col-span-2 p-1"
                        >
                            <UTextarea
                                v-model="selectedData[item.key]"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>
                        <div
                            v-if="
                                item.key == 'quantity' ||
                                item.key == 'createdAt' ||
                                item.key == 'updatedAt'
                            "
                            class="col-span-2 p-1"
                        >
                            <UInput
                                v-model="selectedData[item.key]"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>
                        <div
                            v-if="
                                item.key == 'available' || item.key == 'hidden'
                            "
                            class="col-span-2 p-1"
                        >
                            <v-switch
                                v-model="selectedData[item.key]"
                                :readonly="!editModeIsOpen"
                                color="primary"
                                hide-details
                            />
                        </div>

                        <!-- Delete Entry Button -->
                        <div
                            v-if="
                                editModeIsOpen &&
                                index == listOfAllColumns.length - 1
                            "
                        ></div>
                        <div
                            v-if="
                                editModeIsOpen &&
                                index == listOfAllColumns.length - 1
                            "
                            class="col-span-2"
                        >
                            <UButton
                                label="Delete Reagent"
                                variant="outline"
                                color="red"
                                @click="deleteItem"
                            />
                        </div>
                    </div>
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
                                    @click="updateChanges"
                                />
                            </div>
                        </div>
                    </template>
                </UCard>
            </template>
            <template #addRecordModal>
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h1>ADD A NEW REAGENT</h1>
                        </div>
                    </template>

                    <div
                        v-for="item in listOfAllColumns"
                        :key="item.key"
                        class="grid grid-cols-3 gap-1 gap-y-2"
                    >
                        <!-- Left Label -->
                        <div
                            v-if="
                                ![
                                    'id',
                                    'laboratoriesId',
                                    'schoolYearId',
                                    'createdAt',
                                    'updatedAt',
                                ].includes(item.key)
                            "
                            class="flex items-center p-1"
                        >
                            {{ item.label }}
                        </div>

                        <!-- Right Current Value -->
                        <div
                            v-if="
                                ![
                                    'id',
                                    'description',
                                    'laboratoriesId',
                                    'schoolYearId',
                                    'createdAt',
                                    'updatedAt',
                                    'available',
                                    'hidden',
                                ].includes(item.key)
                            "
                            class="col-span-2 p-1"
                        >
                            <UInput
                                v-if="!['chemicalName'].includes(item.key)"
                                v-model="newReagentData[item.key]"
                                :color="colorEditable"
                                variant="outline"
                            />
                            <UInput
                                v-else
                                v-model="newReagentData[item.key]"
                                :color="colorEditable"
                                variant="outline"
                                placeholder="Required"
                            />
                        </div>

                        <!-- Exceptions to UInput -->
                        <div
                            v-if="item.key == 'description'"
                            class="col-span-2 p-1"
                        >
                            <UTextarea
                                v-model="newReagentData.description"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div
                            v-if="
                                item.key == 'available' || item.key == 'hidden'
                            "
                            class="col-span-2 p-1"
                        >
                            <v-switch
                                v-model="newReagentData[item.key]"
                                color="primary"
                                hide-details
                            />
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex w-[100%] justify-between">
                            <UButton
                                variant="outline"
                                icon="i-material-symbols-cancel"
                                color="red"
                                label="CANCEL"
                                @click="closeAddRecordModal"
                            />
                            <UButton
                                variant="outline"
                                icon="i-material-symbols-save"
                                label="SAVE"
                                color="green"
                                :disabled="!newReagentData.chemicalName"
                                @click="addNewItem"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
