<script setup>
useHead({
    title: "EVC LABS | Admin Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="ADMIN | REQUESTS" />
        <UserAdminRequestsSaveSignature />
        <div class="mt-10">
            <UserAdminRequestsTables />
        </div>
    </div>
</template>

<style scoped></style>
