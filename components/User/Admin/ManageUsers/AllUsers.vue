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

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}
</script>

<template>
    <div>
        <TablesWSlottedModals
            title="ALL USERS"
            default-sort-key="role"
            :starting-columns="startingColumns"
            :list-of-all-columns="listOfAllColumns"
            fetch-path="/api/db/manageUsers/getAll"
            update-path="/api/db/updateData/updateLaboratories"
            :allowed-editing="allowedEditing"
            @selectedRow="selectedRow"
        >
            <template #detailsModal>
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
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.lastName"
                            />
                        </div>

                        <div>First Name</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.firstName"
                            />
                        </div>

                        <div>Role</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.role"
                            />
                        </div>

                        <div>Email</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.email"
                            />
                        </div>

                        <div>User ID</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.id"
                            />
                        </div>

                        <div>Student ID</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.studentsId"
                            />
                        </div>

                        <div>Teacher ID</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.teachersId"
                            />
                        </div>

                        <div>Admin ID</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.adminsId"
                            />
                        </div>

                        <div>Created At</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.createdAt"
                            />
                        </div>

                        <div>Last Updated</div>
                        <div>
                            <UInput
                                color="gray"
                                :disabled="true"
                                variant="outline"
                                :placeholder="selectedData.updatedAt"
                            />
                        </div>
                    </div>

                    <template #footer>
                        <div>
                            <UButton @click="">Edit</UButton>
                        </div>
                    </template>
                </UCard>
            </template>
            <template #editModal>
                <h1>YES</h1>
            </template>
        </TablesWSlottedModals>
    </div>
</template>

<style scoped></style>
