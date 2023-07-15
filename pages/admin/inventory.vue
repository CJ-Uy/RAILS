<script setup>
useHead({
    title: "EVC LABS | Admin Inventory",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role == "STUDENT"){
    await navigateTo("/student");
} else if (data.value.role == "TEACHER") {
    await navigateTo("/teacher");
}
</script>

<template>
    <div class="flex flex-row">
        <div class="basis-[15.276146%]"> <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="basis-auto">
            <h1>ADMIN INVENTORY PAGE</h1>
        </div>
    </div>
</template>

<style scoped>

</style>