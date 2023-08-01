<script setup>
// Set columns of the table
const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "currentRole", label: "Current Role", sortable: true },
    { key: "wantedRole", label: "Requested Role", sortable: true },
    { key: "createdAt", label: "Date Requested", sortable: true },
];

// Pagination
const page = ref(1);
const pageCount = 5;
const totalItems = ref();

// Searching Rows
//const { pendingm, data: allChangeRoleRequests } = await useLazyAsyncData("allChangeRoleRequests", () => $fetch("/api/db/getAllRoleChangeRequests"));
const allChangeRoleRequests = await useFetch("/api/db/manageRoles/getAll");
const allChangeRoleRequestsData = ref(allChangeRoleRequests.data);

async function updateTable() {
    let updatedValues = await useFetch("/api/db/manageRoles/getAll");
    allChangeRoleRequestsData.value = updatedValues.data.value;
}

const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        totalItems.value = allChangeRoleRequestsData.value.length;
        return allChangeRoleRequestsData.value.slice(
            (page.value - 1) * pageCount,
            page.value * pageCount,
        );
    }
    // filtering the rows
    let filtered = allChangeRoleRequestsData.value.filter((item) => {
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

// Selecting rows
function selectRow(row) {
    const index = selectedRequests.value.findIndex(
        (item) => item.id === row.id,
    );
    if (index === -1) {
        selectedRequests.value.push(row);
    } else {
        selectedRequests.value.splice(index, 1);
    }
}

const selectedRequests = ref([]);

// Deleting
async function delteRequest() {
    // TODO: Add confirmation modal
    // TODO : Add error handling
    for (const request of selectedRequests.value) {
        await useFetch("/api/db/manageRoles/delete", {
            method: "POST",
            body: request.id,
        });
    }
    updateTable();
}

// Approving
async function approveRequest() {
    // TODO: Add confirmation modal
    // TODO : Add error handling
    for (const request of selectedRequests.value) {
        await useFetch("/api/db/manageRoles/approve", {
            method: "POST",
            body: {
                id: request.id,
                userId: request.userId,
                newRole: request.wantedRole,
            },
        });
    }
    updateTable();
}
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">ROLE CHANGE REQUESTS</h2>
            </template>

            <div>
                <div class="flex flex-row">
                    <UButton icon="i-material-symbols-refresh" @click="updateTable" class="mr-2" />
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

                <!-- Table of Values -->
                <UTable
                    v-model="selectedRequests"
                    :columns="columns"
                    :rows="filteredRows"
                    :sort="{ column: 'title' }"
                    @select="selectRow"
                />

                <!-- Pagination -->
                <div class="flex w-[100%] items-center justify-end">
                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="totalItems"
                    />
                </div>
            </div>

            <template #footer>
                <!-- Action Buttons -->
                <UButton label="DELETE" @click="delteRequest" class="mr-3" />
                <UButton label="APPROVE" @click="approveRequest" />
            </template>
        </UCard>
    </div>
</template>
