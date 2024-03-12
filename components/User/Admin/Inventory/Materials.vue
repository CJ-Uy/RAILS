<script setup>
const user = inject("user");

const startingColumns = [
    "itemName",
    "description",
    "classification",
    "quantity",
    "currentlyInUse",
    "available",
]; // Key of starting columns in list of all columns

// TODO: add location Names
const listOfAllColumns = [
    {
        key: "itemName",
        label: "Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "quantity",
        label: "Quantity",
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
        key: "classification",
        label: "Class",
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
        key: "supplier",
        label: "Supplier",
        sortable: true,
    },
    {
        key: "dateReceived",
        label: "Date Received",
        sortable: true,
    },
    {
        key: "additionalPurchase",
        label: "Additional Purchase",
        sortable: true,
    },
    {
        key: "make",
        label: "Make",
        sortable: true,
    },
    {
        key: "damage",
        label: "Damage",
        sortable: true,
    },
    {
        key: "balancePerCard",
        label: "Balance per Card",
        sortable: true,
    },
    {
        key: "balancePerCount",
        label: "Balance per Count",
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
    await useFetch("/api/admin/manageMaterials/updateItem", {
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

// Editing Mode Apperances
const colorEditable = ref("gray");

const tableRef = ref();

// Add Record Modal
const newItemData = ref({ available: true, hidden: false });
const addRecordModalIsOpen = ref(false);
function closeAddRecordModal() {
    newItemData.value = { available: true, hidden: false };
    addRecordModalIsOpen.value = false;
    tableRef.value.closeAddRecord();
}
async function addNewItem() {
    await useFetch("/api/admin/manageMaterials/addItem", {
        method: "POST",
        body: JSON.stringify(newItemData.value),
    });

    newItemData.value = { available: true, hidden: false };
    tableRef.value.closeAddRecord();
    tableRef.value.updateTable();
}

const failedDeletion = ref(false);
async function deleteItem() {
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    const deletion = await useFetch("/api/admin/manageMaterials/deleteItem", {
        method: "POST",
        body: JSON.stringify(selectedData.value),
    });

    if (deletion.data.value === "DELETION FAILED; MARKED HIDDEN") {
        failedDeletion.value = true;
    }

    tableRef.value.closeDataModal();
    tableRef.value.updateTable();
}
</script>

<template>
    <div>
        <!-- Failed Deletion Modal -->
        <UModal v-model="failedDeletion">
            <UCard>
                <template #header>
                    <span class="text-red-500">MATERIALS DELETEION FAILED</span>
                </template>
                <p>
                    Failed to delete {{ selectedData.itemName }} due to its
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

        <!-- Data Table -->
        <TablesWSlottedModals
            ref="tableRef"
            title="MATERIALS"
            default-sort-key="itemName"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllMaterials"
            :allowed-editing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div class="flex flex-row items-center space-x-3">
                            <h1>
                                {{ selectedData.itemName }}
                            </h1>
                        </div>
                    </template>
                    <div
                        v-for="(item, index) in listOfAllColumns"
                        :key="item.key"
                        class="grid grid-cols-3 gap-1 gap-y-2"
                    >
                        <!-- Left Label -->
                        <div
                            v-if="!['id'].includes(item.key)"
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
                                label="Delete Laboratory"
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
                            <h1>ADD A NEW ITEM</h1>
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
                                !['id', 'createdAt', 'updatedAt'].includes(
                                    item.key,
                                )
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
                                    'createdAt',
                                    'updatedAt',
                                    'available',
                                    'hidden',
                                ].includes(item.key)
                            "
                            class="col-span-2 p-1"
                        >
                            <UInput
                                v-if="!['itemName', 'unit'].includes(item.key)"
                                v-model="newItemData[item.key]"
                                :color="colorEditable"
                                variant="outline"
                            />

                            <UInput
                                v-else
                                v-model="newItemData[item.key]"
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
                                v-model="newItemData.description"
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
                                v-model="newItemData[item.key]"
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
                                :disabled="
                                    !newItemData.itemName || !newItemData.unit
                                "
                                @click="addNewItem"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
