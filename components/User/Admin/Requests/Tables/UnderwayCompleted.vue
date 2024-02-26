<script setup>
// Tabs
const inventoryCategories = [
    {
        label: "Underway",
        slot: "underway",
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
    <UContainer>
        <UTabs
            :items="inventoryCategories"
            :ui="{ list: { tab: { active: 'bg-white' } } }"
            :orientation="tabsOrientation"
        >
            <template #underway>
                <UserAdminRequestsTablesUnderway />
            </template>
            <template #completed>
                <UserAdminRequestsTablesCompleted />
            </template>
        </UTabs>
    </UContainer>
</template>

<style scoped></style>
