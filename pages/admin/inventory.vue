<script setup>
useHead({
    title: "EVC LABS | Admin Inventory",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });

// Tabs
const inventoryCategories = [
    {
        label: "Laboratories",
        slot: "laboratories",
    },
    {
        label: "Equipment",
        slot: "equipmentInventory",
    },
    {
        label: "Materials",
        slot: "materialsInventory",
    },
    {
        label: "Reagents",
        slot: "reagentsInventory",
    },
    {
        label: "Transaction History",
        slot: "transactionHistory",
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
    <div>
        <UserDashboardHeader title="ADMIN | INVENTORY" />
        <UContainer>
            <UTabs
                :items="inventoryCategories"
                :ui="{ list: { tab: { active: 'bg-white' } } }"
                :orientation="tabsOrientation"
            >
                <template #laboratories>
                    <h1>Laboratories</h1>
                </template>
                <template #equipmentInventory>
                    <h1>Equiment Inventory</h1>
                </template>
                <template #materialsInventory>
                    <h1>Materials Inventory</h1>
                </template>
                <template #reagentsInventory>
                    <h1>Reagent Inventory</h1>
                </template>
                <template #transactionHistory>
                    <h1>Inventory Transaction History</h1>
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>

<style scoped></style>
