<script setup>
useHead({
    title: "EVC LABS | Requests Management",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");

// Tabs
const adminUserSettings = [
    {
        label: "All Users",
        slot: "allUsers",
    },
    {
        label: "Accountability",
        slot: "accountability",
    },
];
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | USER MANAGEMENT" />
        <UContainer>
            <UTabs
                :items="adminUserSettings"
                :ui="{ list: { tab: { active: 'bg-white' } } }"
            >
                <template #allUsers>
                    <UserAdminManageUsersAllUsers />
                </template>
                <template #accountability>
                    <UserAdminManageUsersAccountability />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>
