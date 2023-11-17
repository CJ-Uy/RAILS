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
                    <UserAdminInventoryLaboratories />
                </template>
                <template #equipmentInventory>
                    <UserAdminInventoryEquipment />
                </template>
                <template #materialsInventory>
                    <UserAdminInventoryMaterials />
                </template>
                <template #reagentsInventory>
                    <UserAdminInventoryReagents />
                </template>
                <template #transactionHistory>
                    <UserAdminInventoryTransactions />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>

<style scoped></style>
