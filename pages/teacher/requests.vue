<script setup>
useHead({
    title: "EVC LABS Teacher | Student Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="ASSIGNED LABORATORY REQUESTS" />
        <UserTeacherRequestsSaveSignature />
        <UContainer class="mt-10">
            <UserTeacherRequestsAllRequests />
        </UContainer>
    </div>
</template>
