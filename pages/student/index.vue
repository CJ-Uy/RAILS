<script setup>
useHead({
    title: "EVC LABS Student | Dashboard",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role == "TEACHER"){
    await navigateTo("/teacher");
}
</script>

<template>
    <div>
        <h1>STUDENT PAGE</h1>
    </div>
</template>

<style scoped>

</style>