<script setup>
useHead({
    title: "EVC LABS | Current Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="ADMIN | CURRENT REQUESTS" />
        <div>
            <UserAdminRequestsTables />
        </div>
    </div>
</template>

<style scoped></style>
