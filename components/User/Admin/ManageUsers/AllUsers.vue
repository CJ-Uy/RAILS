<script setup>
// Check if user is admin and should eb allowed to edit
const user = inject("user");
const allowedEditing = ref();
if (user.ROLE === "ADMIN") {
    allowedEditing.value = true;
} else {
    allowedEditing.value = false;
}

// Necessary information for the data table
const startingColumns = ["role", "firstName", "lastName", "email"]; // Key of starting columns in list of all columns
const listOfAllColumns = [
    {
        key: "role",
        label: "Role",
        sortable: true,
    },
    {
        key: "firstName",
        label: "First Name",
        sortable: true,
    },
    {
        key: "lastName",
        label: "Last Name",
        sortable: true,
    },
    {
        key: "email",
        label: "Email",
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

const allUsersTableRef = ref();

// ----- Modal details ---- //
const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

// Editing Mode
const editModeIsOpen = ref(false);
function enableEditMode() {
    editModeIsOpen.value = true;
    colorEditable.value = "red";
}
function discardChanges() {
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    allUsersTableRef.value.closeDataModal();
    allUsersTableRef.value.updateTable();
}
async function updateChanges() {
    await useFetch("/api/db/manageUsers/update", {
        method: "POST",
        body: JSON.stringify(selectedData.value),
    });
    editModeIsOpen.value = false;
    colorEditable.value = "gray";
    allUsersTableRef.value.closeDataModal();
    allUsersTableRef.value.updateTable();
}

// TODO: Test a bit more and maybe its not secure cause it's on the fron end? But i have some safe ctaches in the backend too
// BUG: You can delete yourself and make u no longger admin and it affects only after refresh. But even after refresh you can just "go back" on the browser maybe a watch function just in this page for roles?
function adaptRolesToNewIdRequest() {
    if (
        selectedData.value.role === "STUDENT" &&
        selectedData.value.studentsId === null
    ) {
        selectedData.value.studentsId = "NEW STUDENT ID";
        selectedData.value.teachersId = null;
        selectedData.value.adminsId = null;
    } else if (
        selectedData.value.role === "TEACHER" &&
        selectedData.value.teachersId === null
    ) {
        selectedData.value.teachersId = "NEW TEACHER ID";
        selectedData.value.adminsId = null;
    } else if (
        selectedData.value.role === "ADMIN" &&
        selectedData.value.adminsId === null
    ) {
        selectedData.value.adminsId = "NEW ADMIN ID";
    }
}

// Editing Mode Apperances
const colorEditable = ref("gray");
</script>

<template>
    <div>
        <TablesWSlottedModals
            ref="allUsersTableRef"
            title="ALL USERS"
            default-sort-key="role"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/manageUsers/getAll"
            :allowed-editing="allowedEditing"
            :edit-mode-is-open="editModeIsOpen"
            @selected-row="selectedRow"
        >
            <template #dataModal>
                <UCard>
                    <template #header>
                        <div class="flex flex-row items-center space-x-3">
                            <NuxtImg
                                :src="selectedData.imageLink"
                                format="webp"
                                loading="lazy"
                                class="rounded-md"
                            />
                            <h1>
                                {{ selectedData.role }}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                {{ selectedData.lastName }},
                                {{ selectedData.firstName }}
                            </h1>
                        </div>
                    </template>

                    <div class="grid grid-cols-2">
                        <div>Last Name</div>
                        <div>
                            <UInput
                                v-model="selectedData.lastName"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div>First Name</div>
                        <div>
                            <UInput
                                v-model="selectedData.firstName"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                            />
                        </div>

                        <div>Role</div>
                        <div>
                            <USelect
                                v-model="selectedData.role"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                                :options="['STUDENT', 'TEACHER', 'ADMIN']"
                                @click="adaptRolesToNewIdRequest"
                            />
                        </div>

                        <div>Email</div>
                        <div>
                            <!-- Editing the email will make a new account when the person sign in -->
                            <UInput
                                v-model="selectedData.email"
                                color="gray"
                                disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div>User ID</div>
                        <div>
                            <UInput
                                v-model="selectedData.id"
                                color="gray"
                                disabled="true"
                                variant="outline"
                            />
                        </div>

                        <!-- IDs -->
                        <div>Student ID</div>
                        <div class="flex flex-row justify-between">
                            <div class="w-full">
                                <UInput
                                    v-model="selectedData.studentsId"
                                    color="gray"
                                    :disabled="true"
                                    variant="outline"
                                />
                            </div>
                            <div v-if="editModeIsOpen">
                                <UButton
                                    v-if="selectedData.studentsId == null"
                                    icon="i-material-symbols-align-flex-center-rounded"
                                    size="sm"
                                    color="green"
                                    square
                                    variant="solid"
                                    @click="
                                        selectedData.studentsId =
                                            'NEW STUDENT ID'
                                    "
                                />
                                <UButton
                                    v-else
                                    icon="i-material-symbols-delete"
                                    size="sm"
                                    color="red"
                                    square
                                    variant="solid"
                                    @click="selectedData.studentsId = null"
                                />
                            </div>
                        </div>

                        <div>Teacher ID</div>
                        <div class="flex flex-row justify-between">
                            <div class="w-full">
                                <UInput
                                    v-model="selectedData.teachersId"
                                    color="gray"
                                    :disabled="true"
                                    variant="outline"
                                />
                            </div>
                            <div v-if="editModeIsOpen">
                                <UButton
                                    v-if="selectedData.teachersId == null"
                                    icon="i-material-symbols-align-flex-center-rounded"
                                    size="sm"
                                    color="green"
                                    square
                                    variant="solid"
                                    @click="
                                        selectedData.teachersId =
                                            'NEW TEACHER ID'
                                    "
                                />
                                <UButton
                                    v-else
                                    icon="i-material-symbols-delete"
                                    size="sm"
                                    color="red"
                                    square
                                    variant="solid"
                                    @click="selectedData.teachersId = null"
                                />
                            </div>
                        </div>

                        <div>Admin ID</div>
                        <div class="flex flex-row justify-between">
                            <div class="w-full">
                                <UInput
                                    v-model="selectedData.adminsId"
                                    color="gray"
                                    :disabled="true"
                                    variant="outline"
                                />
                            </div>
                            <div v-if="editModeIsOpen">
                                <UButton
                                    v-if="selectedData.adminsId == null"
                                    icon="i-material-symbols-align-flex-center-rounded"
                                    size="sm"
                                    color="green"
                                    square
                                    variant="solid"
                                    @click="
                                        selectedData.adminsId = 'NEW ADMIN ID'
                                    "
                                />
                                <UButton
                                    v-else
                                    icon="i-material-symbols-delete"
                                    size="sm"
                                    color="red"
                                    square
                                    variant="solid"
                                    @click="selectedData.adminsId = null"
                                />
                            </div>
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
        </TablesWSlottedModals>
    </div>
</template>

<style scoped></style>
