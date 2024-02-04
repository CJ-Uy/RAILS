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
            update-path="/api/db/updateData/updateLaboratories"
            :allowed-editing="allowedEditing"
            :editModeIsOpen="editModeIsOpen"
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
                                :options="['ADMIN', 'TEACHER', 'STUDENT']"
                            />
                        </div>

                        <div>Email</div>
                        <div>
                            <UInput
                                v-model="selectedData.email"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
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
                        <div>
                            <UInput
                                v-model="selectedData.studentsId"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div>Teacher ID</div>
                        <div>
                            <UInput
                                v-model="selectedData.teachersId"
                                color="gray"
                                :disabled="true"
                                variant="outline"
                            />
                        </div>

                        <div>Admin ID</div>
                        <div>
                            <UInput
                                v-model="selectedData.adminsId"
                                color="gray"
                                :disabled="true"
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
                                    @click="saveChanges"
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
