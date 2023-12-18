<script setup>
useHead({
    title: "EVC LABS | Past Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "student-pages" });
</script>

<template>
    <div>
        <UserDashboardHeader title="CALENDAR" />
        <TablesCalendar />
    </div>
</template>

<style scoped></style>
