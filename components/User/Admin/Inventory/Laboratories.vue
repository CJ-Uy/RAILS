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
    await useFetch("/api/db/manageLocations/updateLab", {
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
const newLabData = ref({});
const addRecordModalIsOpen = ref(false);
function closeAddRecordModal() {
    newLabData.value = [];
    addRecordModalIsOpen.value = false;
    tableRef.value.closeAddRecord();
}
async function addNewLab() {
    await useFetch("/api/db/manageLocations/addLab", {
        method: "POST",
        body: JSON.stringify(newLabData.value),
    });

    tableRef.value.closeAddRecord();
    tableRef.value.updateTable();
}
async function deleteLab() {
    const deletion = await useFetch("/api/db/manageLocations/deleteLab", {
        method: "POST",
        body: JSON.stringify(selectedData.value),
    });
    console.log(deletion); // TODO: do some magic when u cant delete it cause its connected to some other data
    tableRef.value.closeDataModal();
    tableRef.value.updateTable();
}
</script>

<template>
    <div>
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

                    <div class="grid grid-cols-2">
                        <div>Name</div>
                        <div>
                            <UInput
                                v-model="selectedData.name"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div>Location</div>
                        <div>
                            <USelect
                                v-model="selectedData.location.name"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                                :options="allLabLocationNames"
                            />
                        </div>

                        <div>Decription</div>
                        <div>
                            <UTextarea
                                v-model="selectedData.description"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div>Lab ID</div>
                        <div>
                            <UInput
                                v-model="selectedData.id"
                                color="gray"
                                disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div>Created At</div>
                        <div>
                            <UInput
                                v-model="selectedData.createdAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div>Last Updated</div>
                        <div>
                            <UInput
                                v-model="selectedData.updatedAt"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div v-if="editModeIsOpen">
                            <UButton
                                label="Delete Laboratory"
                                variant="outline"
                                color="red"
                                @click="deleteLab"
                            />
                        </div>
                        <div v-if="editModeIsOpen"></div>
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

                    <div class="grid grid-cols-2 space-y-2">
                        <div>Name</div>
                        <div>
                            <UInput
                                v-model="newLabData.name"
                                placeholder="Laboratory Name Name"
                            />
                        </div>

                        <div>Location</div>
                        <div>
                            <USelect
                                v-model="newLabData.location"
                                :options="allLabLocationNames"
                            />
                        </div>

                        <div>Decription</div>
                        <div>
                            <UTextarea
                                v-model="newLabData.description"
                                placeholder="Enter Laboratory Description"
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
                                @click="addNewLab"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </TablesWSlottedModals>
    </div>
</template>
