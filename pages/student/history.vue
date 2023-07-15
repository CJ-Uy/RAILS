<script setup>
useHead({
    title: "EVC LABS | Past Requests",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role == "TEACHER"){
    await navigateTo("/teacher");
}
</script>

<template>
    <div class="flex flex-row">
        <div class="basis-[15.276146%]"> <!-- Taken from figma 260/1702-->
            <UserStudentNavbar />
        </div>
        <div class="basis-auto">
            <h1>STUDENT PAST REQUESTS</h1>
        </div>
    </div>
</template>

<style scoped>

</style>