<script setup>
useHead({
    title: "EVC LABS | Settings",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "student-pages" });
</script>

<template>
    <div>
        <UContainer>
            <h1>SETTINGS</h1>
            <h2>
                If you are a teacher please send a request to change your role
                by clicking the button below
            </h2>
            <UserStudentRoleRequestChange />
        </UContainer>
    </div>
</template>
