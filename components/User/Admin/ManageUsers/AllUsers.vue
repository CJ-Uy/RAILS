<script setup>
// Set Coulmns of the table
const columns = [
    { key: "lastName", label: "Last Name", sortable: true, },
    { key: "firstName", label: "First Name", sortable: true, },
    { key: "role", label: "Role", sortable: true, },
    { key: "email", label: "Email", sortable: true, },
];

// Pagination
const page = ref(1);
const pageCount = 10;
const totalItems = ref();

// Searching Rows
const { pending, data: allUsers } = await useLazyFetch(
    "/api/db/manageUsers/getAll",
);
const allUsersData = ref(allUsers);
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

// Seclection
const selectedUser = ref();
function OpenUserModal() {
    console.log("HELLO");
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
                v-model="selectedUser"
                @select="OpenUserModal"
                :columns="columns"
                :rows="filteredRows"
                :loading="pending"
                :ui = "{ tr: { active: 'hover:bg-gray-200' } }"
            />

            <div class="flex w-[100%] items-center justify-end">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="totalItems"
                />
            </div>
        </UCard>
    </div>
</template>
