<script setup>
useHead({
    title: "EVC LABS Teacher | Student Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="REQUESTS FROM STUDENTS" />
        <UserTeacherStudentRequestsSaveSignature />
        <UContainer class="mt-10">
            <UserTeacherStudentRequestsAllRequests />
        </UContainer>
    </div>
</template>
