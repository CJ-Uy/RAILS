<script setup>
useHead({
    title: "EVC LABS | Admin Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | DASHBOARD" />
        <UserAdminRequestsPending />
    </div>
</template>
