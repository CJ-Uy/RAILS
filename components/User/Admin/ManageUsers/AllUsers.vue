<script setup>
const user = inject("user");

// Set Coulmns of the table
const columns = [
    { key: "lastName", label: "Last Name", sortable: true },
    { key: "firstName", label: "First Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "email", label: "Email", sortable: true },
];

// Pagination
const page = ref(1);
const pageCount = 10;
const totalItems = ref();

// Searching Rows
const { pending, data: allUsers } = await useLazyFetch(
    "/api/db/manageUsers/getAll",
);
const allUsersData = ref([]);
watch(allUsers, (updatedValues) => {
    allUsersData.value = updatedValues;
});

async function updateTable() {
    const allUsers = await useFetch("/api/db/manageUsers/getAll");
    allUsersData.value = allUsers.data.value;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allUsersData.value.length;
        return allUsersData.value.slice(
            (page.value - 1) * pageCount,
            page.value * pageCount,
        );
    }
    // filtering the rows
    let filtered = allUsersData.value.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value)
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase());
        });
    });
    // Slice the values into pages
    totalItems.value = filtered.length;
    return filtered.slice((page.value - 1) * pageCount, page.value * pageCount);
});

// Seclection and User Modal
const selectedUser = ref();
const userModalIsOpen = ref(false);
function OpenUserModal(user) {
    selectedUser.value = user;
    userModalIsOpen.value = true;
}
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">ALL USERS</h2>
            </template>

            <div>
                <div class="flex flex-row">
                    <UButton
                        icon="i-material-symbols-refresh"
                        @click="updateTable"
                        class="mr-2"
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
            </div>

            <!-- DATA TABLE -->
            <UTable
                @select="OpenUserModal"
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui="{ tr: { active: 'hover:bg-gray-200' } }"
            />

            <div class="flex w-[100%] items-center justify-end">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="totalItems"
                />
            </div>
        </UCard>

        <!-- User Modals -->
        <UModal v-model="userModalIsOpen" prevent-close>
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
                            {{ selectedUser.lastName }},
                            {{ selectedUser.firstName }} - User Record
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="userModalIsOpen = false"
                        />
                    </div>
                </template>

                <pre>
                    {{ selectedUser }}
                </pre>

                <UButton
                    color="red"
                    variant="soft"
                    icon="i-material-symbols-delete-outline"
                    label="DELETE USER"
                    class="mr-3"
                />
                <template #footer>
                    <!-- Action Buttons -->
                    <div class="flex w-full items-center justify-end">
                        <UButton variant="solid" icon="i-material-symbols-save" label="SAVE CHANGES" @click="approveRequest" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
