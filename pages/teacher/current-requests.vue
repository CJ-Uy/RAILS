<script setup>
useHead({
    title: "EVC LABS | Current Requests",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
</script>

<template>
    <div class="flex flex-col">
        <UserDashboardHeader title="TEACHER | CURRENT REQUESTS" />
        <div>
            <UContainer>
                <UserTeacherRequestsPending />
            </UContainer>
        </div>
    </div>
</template>

<style scoped></style>
