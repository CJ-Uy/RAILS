<script setup>
useHead({
    title: "EVC LABS | Inventory",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role === "TEACHER") {
    await navigateTo("/teacher");
}
</script>

<template>
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserStudentNavbar />
        </div>
        <div class="flex basis-[84.723854%] flex-col">
            <h1>STUDENT INVENTORY VIEW</h1>
        </div>
    </div>
</template>

<style scoped></style>
