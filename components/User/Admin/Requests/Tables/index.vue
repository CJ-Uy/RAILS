<script setup>
// Tabs
const inventoryCategories = [
    {
        label: "All",
        slot: "allRequests",
    },
    {
        label: "Teacher Pending",
        slot: "teacherPending",
    },
    {
        label: "Admin Pending",
        slot: "adminPending",
    },
    {
        label: "Scheduled",
        slot: "scheduled",
    },
    {
        label: "Completed",
        slot: "completed",
    },
];

// Remove progress bad labels on mobile
const tabsOrientation = ref();

function updateTabsOrientation() {
    // Only access window if on client side
    if (process.client) {
        if (window.innerWidth <= 768) {
            tabsOrientation.value = "vertical";
        } else {
            tabsOrientation.value = "horizontal";
        }
    }
}

onMounted(() => {
    // Update the value on window resize
    if (process.client) {
        window.addEventListener("resize", updateTabsOrientation);
    }
    updateTabsOrientation();
});
</script>

<template>
    <div class="mx-[10%]">
        <UTabs
            :items="inventoryCategories"
            :ui="{ list: { tab: { active: 'bg-white' } } }"
            :orientation="tabsOrientation"
        >
            <template #allRequests>
                <UserAdminRequestsTablesAllRequests />
            </template>
            <template #teacherPending>
                <UserAdminRequestsTablesTeacherPending />
            </template>
            <template #adminPending>
                <UserAdminRequestsTablesAdminPending />
            </template>
            <template #scheduled>
                <UserAdminRequestsTablesScheduled />
            </template>
            <template #completed>
                <UserAdminRequestsTablesCompleted />
            </template>
        </UTabs>
    </div>
</template>

<style scoped></style>
