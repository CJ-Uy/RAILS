<script setup>
useHead({
    title: "EVC LABS Teacher | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
const user = inject("user");

// Tabs
const approvalCategories = [
    {
        label: "Teacher Pending",
        slot: "teacherPending",
    },
    {
        label: "Admin Pending",
        slot: "adminPending",
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
        <UserDashboardHeader title="DASHBOARD" />

        <UContainer>
            <UTabs
                :items="approvalCategories"
                :ui="{ list: { tab: { active: 'bg-white' } } }"
                :orientation="tabsOrientation"
            >
                <template #teacherPending>
                    <UserTeacherRequestsPending />
                </template>
                <template #adminPending>
                    <UserAdminRequestsPendingTeacher />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>

<style scoped></style>
