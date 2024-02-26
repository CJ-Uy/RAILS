<script setup>
useHead({
    title: "EVC LABS | Completed Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="ADMIN | COMPLETED REQUESTS" />
        <div>
            <UserAdminRequestsTablesUnderwayCompleted />
        </div>
    </div>
</template>

<style scoped></style>
