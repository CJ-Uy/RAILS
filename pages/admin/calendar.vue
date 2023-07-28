<script setup>
useHead({
    title: "EVC LABS | Admin Calendar",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role === "STUDENT") {
    await navigateTo("/student");
} else if (data.value.role === "TEACHER") {
    await navigateTo("/teacher");
}
</script>

<template>
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="flex basis-[84.723854%] flex-col">
            <h1>ADMIN CALENDAR PAGE</h1>
        </div>
    </div>
</template>

<style scoped></style>
