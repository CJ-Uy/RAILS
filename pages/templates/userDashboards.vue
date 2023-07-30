<!-- NOTES -->
<!-- Maybe use Layouts in nuxt instead -->
<!-- For the manual role auth maybe use a function you can import if it is not supported in layouts -->

<script setup>
// Import statements
useHead({
    title: "EVC LABS | Name of Page",
});

// Manual Role Auth
const { data } = await useFetch("/api/user/me");
// STUDENT Role
// if (data.value.role === "TEACHER") {
//     await navigateTo("/teacher");
// }
// TEACHER Role
// if (data.value.role == "STUDENT") {
//     await navigateTo("/student");
// }
// ADMIN Role
// if (data.value.role === "STUDENT") {
//     await navigateTo("/student");
// } else if (data.value.role === "TEACHER") {
//     await navigateTo("/teacher");
// }

// Actual Script
</script>

<template>
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <!-- UserStudentNavbar -->
            <!-- UserTeacherNavBar -->
            <!-- UserAdminNavbar -->
        </div>
        <div class="flex basis-[84.723854%] flex-col">
            <h1>Name of Page</h1>
        </div>
    </div>
</template>
