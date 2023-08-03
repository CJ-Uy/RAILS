<script setup>
useHead({
    title: "EVC LABS | Requests Management",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | USER MANAGEMENT" />
        <UContainer>
            <div>
                <UserAdminManageUsersRoleChangeRequests />
            </div>
            <div class="mt-5">
                <UserAdminManageUsersAllUsers />
            </div>
        </UContainer>
    </div>
</template>
