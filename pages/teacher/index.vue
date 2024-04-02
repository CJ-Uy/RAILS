<script setup>
useHead({
    title: "EVC LABS Teacher | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <UserDashboardHeader title="DASHBOARD" />
    </div>
</template>

<style scoped></style>
