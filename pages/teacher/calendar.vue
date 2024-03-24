<script setup>
useHead({
    title: "EVC LABS Teacher | Calendar",
});

// authentication and the navbar is added through the layout
definePageMeta({ layout: "teacher-pages" });
</script>

<template>
    <div>
        <UserDashboardHeader title="CALENDAR" />
        <TablesCalendar />
    </div>
</template>
