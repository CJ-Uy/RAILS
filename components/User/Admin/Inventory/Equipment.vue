<script setup>
import dayjs from "dayjs";
const user = inject("user");

const startingColumns = [
    "equipmentName",
    "description",
    "serialNumber",
    "quantity",
    "currentlyInUse",
    "available",
]; // Key of starting columns in list of all columns

// Index of each object dictates its position in the Select Menu
const listOfAllColumns = [
    {
        key: "equipmentName",
        label: "Name",
        sortable: true,
        direction: "asc",
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "serialNumber",
        label: "Serial Number",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Quantity",
        sortable: true,
    },
    {
        key: "currentlyInUse",
        label: "In Use",
        sortable: true,
    },
    {
        key: "code",
        label: "Code",
        sortable: true,
    },
    {
        key: "modelNoOrManufacturer",
        label: "Model/Manufacturer",
        sortable: true,
    },
    {
        key: "unit",
        label: "Unit",
        sortable: true,
    },
    {
        key: "unitCost",
        label: "Unit Cost",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
        sortable: true,
    },
    {
        key: "propertyNumber",
        label: "Property Number",
        sortable: true,
    },
    {
        key: "acquisitionType",
        label: "Acquisition Type",
        sortable: true,
    },
    {
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
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

// Only allow editing if the user is an administrator
const allowedEditing = ref(user.role === "ADMIN");

// Editing Mode Apperances
const colorEditable = ref("gray");

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
    await useFetch("/api/admin/manageEquipment/updateEquipment", {
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

const tableRef = ref();

// Add Record Modal
const newEquipmentData = ref({ available: true, hidden: false });
const addRecordModalIsOpen = ref(false);
function closeAddRecordModal() {
    newEquipmentData.value = { available: true, hidden: false };
    addRecordModalIsOpen.value = false;
    tableRef.value.closeAddRecord();
}
async function addNewEquipment() {
    await useFetch("/api/admin/manageEquipment/addEquipment", {
        method: "POST",
        body: JSON.stringify(newEquipmentData.value),
    });

    newEquipmentData.value = { available: true, hidden: false };
    tableRef.value.closeAddRecord();
    tableRef.value.updateTable();
}

const failedDeletion = ref(false);
async function deleteEquipment() {
    const deletion = await useFetch(
        "/api/admin/manageEquipment/deleteEquipment",
        {
            method: "POST",
            body: JSON.stringify(selectedData.value),
        },
    );
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
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
    await useFetch("/api/admin/transact/equipment", {
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
                    <span class="text-red-500">EQUIPMENT DELETEION FAILED</span>
                </template>
                <p>
                    Failed to delete {{ selectedData.equipmentName }} due to its
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
                            {{ selectedData.equipmentName }}
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
                                :placeholder="selectedData.unit"
                            />
                        </div>

                        <div class="flex items-center">Description</div>
                        <div class="flex items-center">
                            <UTextarea
                                v-model="newTransaction.description"
                                type="number"
                            />
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
            title="EQUIPMENT"
            default-sort-key="equipmentName"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllEquipment"
            :allowed-editing="allowedEditing"
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
                                {{ selectedData.equipmentName }}
                            </h1>
                            <UButton
                                label="TRANSACT"
                                color="green"
                                @click="openTransactionWindow()"
                            />
                        </div>
                    </template>

                    <div class="grid grid-cols-3 gap-1 gap-y-2">
                        <div class="flex items-center">Name</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.equipmentName"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Decription</div>
                        <div class="col-span-2">
                            <UTextarea
                                v-model="selectedData.description"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Serial Number</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.serialNumber"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Quantity</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.quantity"
                                :color="colorEditable"
                                disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Code</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.code"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Model/Manufacturer</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.modelNoOrManufacturer"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Unit</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.unit"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Unit Cost</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.unitCost"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Date Received</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.dateReceived"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Property Number</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.propertyNumber"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Acquisition Type</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.acquisitionType"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Supplier</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.supplier"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Status</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.status"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Created At</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.createdAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Last Updated</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.updatedAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Availability</div>
                        <div class="col-span-2">
                            <v-switch
                                v-model="selectedData.available"
                                :readonly="!editModeIsOpen"
                                color="primary"
                                hide-details
                            />
                        </div>

                        <div class="flex items-center">Hide</div>
                        <div class="col-span-2">
                            <v-switch
                                v-model="selectedData.hidden"
                                :readonly="!editModeIsOpen"
                                color="primary"
                                hide-details
                            />
                        </div>

                        <div v-if="editModeIsOpen"></div>
                        <div v-if="editModeIsOpen" class="col-span-2">
                            <UButton
                                label="Delete Equipment"
                                variant="outline"
                                color="red"
                                @click="deleteEquipment"
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
                            <h1>ADD A NEW EQUIPMENT</h1>
                        </div>
                    </template>

                    <div class="grid grid-cols-3 gap-1 gap-y-2">
                        <div class="flex items-center">Name</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.equipmentName"
                                :color="colorEditable"
                                variant="outline"
                                placeholder="Required"
                            />
                        </div>

                        <div class="flex items-center">Decription</div>
                        <div class="col-span-2">
                            <UTextarea
                                v-model="newEquipmentData.description"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Serial Number</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.serialNumber"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Quantity</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.quantity"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Code</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.code"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Model/Manufacturer</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.modelNoOrManufacturer"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Unit</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.unit"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Unit Cost</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.unitCost"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Date Received</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.dateReceived"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Property Number</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.propertyNumber"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Acquisition Type</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.acquisitionType"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Supplier</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.supplier"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Status</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.status"
                                :color="colorEditable"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Created At</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.createdAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Last Updated</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newEquipmentData.updatedAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Availability</div>
                        <div class="col-span-2">
                            <v-switch
                                v-model="newEquipmentData.available"
                                color="primary"
                                hide-details
                            />
                        </div>

                        <div class="flex items-center">Hide</div>
                        <div class="col-span-2">
                            <v-switch
                                v-model="newEquipmentData.hidden"
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
                                :disabled="!newEquipmentData.equipmentName"
                                @click="addNewEquipment"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
