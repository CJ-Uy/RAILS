<script setup>
import dayjs from "dayjs";
const user = inject("user");

const startingColumns = ["name", "description", "locationName"]; // Key of starting columns in list of all columns

const listOfAllColumns = [
    {
        key: "name",
        label: "Laboratory Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "locationName",
        label: "Location",
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
];

const allLabLocationNames = ref([]); // initialize an empty array as the default value
const { data: locations } = await useFetch("/api/db/rawData/getAllLocations");
watchEffect(() => {
    // use a watcher to update the ref when the data changes
    if (locations.value) {
        // check if the data is available
        allLabLocationNames.value = locations.value
            .map((location) => location.name)
            .sort(); // map the data to get the names
    }
});

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
    await useFetch("/api/admin/manageLabs/updateLab", {
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
const newLabData = ref({});
const addRecordModalIsOpen = ref(false);
function closeAddRecordModal() {
    newLabData.value = {};
    addRecordModalIsOpen.value = false;
    tableRef.value.closeAddRecord();
}
async function addNewLab() {
    await useFetch("/api/admin/manageLabs/addLab", {
        method: "POST",
        body: JSON.stringify(newLabData.value),
    });

    newLabData.value = {};
    tableRef.value.closeAddRecord();
    tableRef.value.updateTable();
}

const failedDeletion = ref(false);
async function deleteLab() {
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    const deletion = await useFetch("/api/admin/manageLabs/deleteLab", {
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
                    <span class="text-red-500">LABORATORY DELETION FAILED</span>
                </template>
                <p>
                    Failed to delete {{ selectedData.name }} due to its
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
            title="LABORATORIES"
            default-sort-key="name"
            :startingColumns="startingColumns"
            :listOfAllColumns="listOfAllColumns"
            fetch-path="/api/db/rawData/getAllLaboratories"
            :allowedEditing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div class="flex flex-row items-center space-x-3">
                            <h1>
                                {{ selectedData.name }}
                            </h1>
                        </div>
                    </template>

                    <div class="grid grid-cols-3 gap-1 gap-y-2">
                        <div class="flex items-center">Name</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="selectedData.name"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div class="flex items-center">Location</div>
                        <div class="col-span-2">
                            <USelect
                                v-model="selectedData.location.name"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                                :options="allLabLocationNames"
                            />
                        </div>

                        <div class="flex items-center">Description</div>
                        <div class="col-span-2">
                            <UTextarea
                                v-model="selectedData.description"
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
                                label="Delete Laboratory"
                                variant="outline"
                                color="red"
                                @click="deleteLab"
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
                            <h1>ADD A NEW LABORATORY</h1>
                        </div>
                    </template>

                    <div class="grid grid-cols-3 space-y-2">
                        <div class="flex items-center">Name</div>
                        <div class="col-span-2">
                            <UInput
                                v-model="newLabData.name"
                                placeholder="Laboratory Name Name"
                            />
                        </div>

                        <div class="flex items-center">Location</div>
                        <div class="col-span-2">
                            <USelect
                                v-model="newLabData.location"
                                :options="allLabLocationNames"
                            />
                        </div>

                        <div class="flex items-center">Description</div>
                        <div class="col-span-2">
                            <UTextarea
                                v-model="newLabData.description"
                                placeholder="Enter Laboratory Description"
                            />
                        </div>

                        <div class="flex items-center">Hide</div>
                        <div class="col-span-2">
                            <v-switch
                                v-model="newLabData.hidden"
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
                                    !newLabData.name || !newLabData.location
                                "
                                @click="addNewLab"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
