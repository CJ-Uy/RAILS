<script setup>
useHead({
    title: "EVC LABS | Inventory",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });

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
        <UserDashboardHeader title="TEACHER | INVENTORY" />
        <UContainer>
            <UTabs
                :items="inventoryCategories"
                :ui="{ list: { tab: { active: 'bg-white' } } }"
                :orientation="tabsOrientation"
            >
                <template #laboratories>
                    <UserTeacherInventoryLaboratories />
                </template>
                <template #equipmentInventory>
                    <UserTeacherInventoryEquipment />
                </template>
                <template #materialsInventory>
                    <UserTeacherInventoryMaterials />
                </template>
                <template #reagentsInventory>
                    <UserTeacherInventoryReagents />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>

<style scoped></style>
