<script setup>
useHead({
    title: "EVC LABS | Admin Calendar",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | CALENDAR" />
        <TablesCalendar />
    </div>
</template>

<style scoped></style>
