<script setup>
useHead({
    title: "EVC LABS | Current Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });

// Tabs
const timelineCategories = [
    {
        label: "Scheduled",
        slot: "teacherPending",
    },
    {
        label: "Underway",
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
    <div class="flex flex-col">
        <UserDashboardHeader title="TEACHER | CURRENT REQUESTS" />
        <div>
            <UContainer>
                <UTabs
                    :items="timelineCategories"
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
    </div>
</template>

<style scoped></style>
