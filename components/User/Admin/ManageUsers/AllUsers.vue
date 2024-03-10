<script setup>
// Check if user is admin and should eb allowed to edit
const user = inject("user");
const allowedEditing = ref();
if (user.role === "ADMIN") {
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

function getProfileOptions(profile) {
    if (profile == null) {
        // If the profile does not exist
        return ["NO PROFILE"];
    } else {
        return ["ACTIVE", "INACTIVE"];
    }
}

const currentStudentProfileStatus = ref();
const currentTeacherProfileStatus = ref();
const currentAdminProfileStatus = ref();

function getCurrentProfileStatus(profile) {
    if (profile == null) {
        return "NO PROFILE";
    } else if (profile.hidden === false) {
        return "ACTIVE";
    } else {
        return "INACTIVE";
    }
}

// BUG: You can delete yourself and make u no longger admin and it affects only after refresh. But even after refresh you can just "go back" on the browser maybe a watch function just in this page for roles?
function adaptProfileStatusToRoleChange() {
    // If the role is changed, the profile status should be changed to reflect said change
    // Each block follows the steps
    //  1. Change to or give the "hidden: false"
    //  2. Reset all other profiles statuses to their original states
    //  3. Change all other profiles statuses to most likely scenario
    //  4. Display the changes to the modal

    // Student Role
    if (selectedData.value.role === "STUDENT") {
        // Change to or give the "hidden: false"
        if (selectedData.value.studentProfile == null) {
            selectedData.value.studentProfile = {
                hidden: false,
                defaultStatus: "NO PROFILE",
            };
        } else {
            selectedData.value.studentProfile.hidden = false;
        }

        // Reset all other profiles statuses to their original states
        if (
            selectedData.value.teacherProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.teacherProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.teacherProfile = null;
        }
        if (
            selectedData.value.adminProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.adminProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.adminProfile = null;
        }

        // Change all other profiles statuses to most likely scenario
        if (selectedData.value.adminProfile != null) {
            selectedData.value.adminProfile.hidden = true;
        }

        // Display the changes to the modal
        setCurrentProfileStatuses();
    }

    // Teacher Role
    else if (selectedData.value.role === "TEACHER") {
        // Change to or give the "hidden: false"
        if (selectedData.value.teacherProfile == null) {
            selectedData.value.teacherProfile = {
                hidden: false,
                defaultStatus: "NO PROFILE",
            };
        } else {
            selectedData.value.teacherProfile.hidden = false;
        }

        // Reset all other profiles statuses to their original states
        if (
            selectedData.value.studentProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.studentProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.studentProfile = null;
        }
        if (
            selectedData.value.adminProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.adminProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.adminProfile = null;
        }

        // Change all other profiles statuses to most likely scenario
        if (selectedData.value.adminProfile != null) {
            selectedData.value.adminProfile.hidden = true;
        }
        // Display the changes to the modal
        setCurrentProfileStatuses();
    }

    // Admin Role
    else if (selectedData.value.role === "ADMIN") {
        // Change to or give the "hidden: false"
        if (selectedData.value.adminProfile == null) {
            selectedData.value.adminProfile = {
                hidden: false,
                defaultStatus: "NO PROFILE",
            };
        } else {
            selectedData.value.adminProfile.hidden = false;
        }

        // Reset all other profiles statuses to their original states
        if (
            selectedData.value.studentProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.studentProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.studentProfile = null;
        }
        if (
            selectedData.value.teacherProfile &&
            Object.prototype.hasOwnProperty.call(
                selectedData.value.teacherProfile,
                "defaultStatus",
            )
        ) {
            selectedData.value.teacherProfile = null;
        }

        // Change all other profiles statuses to most likely scenario
        if (selectedData.value.teacherProfile != null) {
            selectedData.value.teacherProfile.hidden = true;
        }

        // Display the changes to the modal
        setCurrentProfileStatuses();
    }

    // Previous ID manipulation and account creation
    // if (
    //     selectedData.value.role === "STUDENT" &&
    //     selectedData.value.studentsId === null
    // ) {
    //     selectedData.value.studentsId = "NEW STUDENT ID";
    //     selectedData.value.teachersId = null;
    //     selectedData.value.adminsId = null;
    // } else if (
    //     selectedData.value.role === "TEACHER" &&
    //     selectedData.value.teachersId === null
    // ) {
    //     selectedData.value.teachersId = "NEW TEACHER ID";
    //     selectedData.value.adminsId = null;
    // } else if (
    //     selectedData.value.role === "ADMIN" &&
    //     selectedData.value.adminsId === null
    // ) {
    //     selectedData.value.adminsId = "NEW ADMIN ID";
    // }
}
function setCurrentProfileStatuses() {
    currentStudentProfileStatus.value = getCurrentProfileStatus(
        selectedData.value.studentProfile,
    );
    currentTeacherProfileStatus.value = getCurrentProfileStatus(
        selectedData.value.teacherProfile,
    );
    currentAdminProfileStatus.value = getCurrentProfileStatus(
        selectedData.value.adminProfile,
    );
}
watch(selectedData, () => {
    setCurrentProfileStatuses();
});

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

                        <div>Role</div>
                        <div>
                            <USelect
                                v-model="selectedData.role"
                                :color="colorEditable"
                                :disabled="!editModeIsOpen"
                                variant="outline"
                                :options="['STUDENT', 'TEACHER', 'ADMIN']"
                                @click="adaptProfileStatusToRoleChange"
                            />
                        </div>

                        <!-- IDs -->
                        <div>Student Profile Status</div>
                        <div>
                            <!--Having a profile options of length 1 means its only "NO PROFILE"-->
                            <USelect
                                v-model="currentStudentProfileStatus"
                                :disabled="
                                    !editModeIsOpen ||
                                    getProfileOptions(
                                        selectedData.studentProfile,
                                    ).length === 1
                                "
                                :options="
                                    getProfileOptions(
                                        selectedData.studentProfile,
                                    )
                                "
                            ></USelect>
                        </div>

                        <div>Teacher Profile Status</div>
                        <div>
                            <USelect
                                v-model="currentTeacherProfileStatus"
                                :disabled="
                                    !editModeIsOpen ||
                                    getProfileOptions(
                                        selectedData.teacherProfile,
                                    ).length === 1
                                "
                                :options="
                                    getProfileOptions(
                                        selectedData.teacherProfile,
                                    )
                                "
                            ></USelect>
                        </div>

                        <div>Admin Profile Status</div>
                        <div>
                            <USelect
                                v-model="currentAdminProfileStatus"
                                :disabled="
                                    !editModeIsOpen ||
                                    getProfileOptions(selectedData.adminProfile)
                                        .length === 1
                                "
                                :options="
                                    getProfileOptions(selectedData.adminProfile)
                                "
                            ></USelect>
                        </div>

                        <pre>
                            {{ selectedData }}
                        </pre>
                        <!-- Previous code for ID manipulation and account creation -->
                        <!-- <div>Student ID</div>
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
                        </div> -->

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
