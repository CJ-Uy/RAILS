<script setup>
useHead({
    title: "EVC LABS | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "student-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <UserDashboardHeader title="DASHBOARD" />
        <UserStudentDashboard />
    </div>
</template>
