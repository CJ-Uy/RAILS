<script setup>
// Tabs
const inventoryCategories = [
    {
        label: "Admin Pending",
        slot: "adminPending",
    },
    {
        label: "Scheduled",
        slot: "scheduled",
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
    <UContainer>
        <UTabs
            :items="inventoryCategories"
            :ui="{ list: { tab: { active: 'bg-white' } } }"
            :orientation="tabsOrientation"
        >
            <template #adminPending>
                <UserAdminRequestsPendingTeacher />
            </template>
            <template #scheduled>
                <UserAdminRequestsCompletedScheduled />
            </template>
        </UTabs>
    </UContainer>
</template>

<style scoped></style>
