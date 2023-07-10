<script setup>
const { data } = await useFetch("/api/user/me");
if (data.value.role == "STUDENT"){
    await navigateTo("/student");
} else if (data.value.role == "TEACHER") {
    await navigateTo("/teacher");
}
</script>

<template>
    <div>
        <h1>ADMIN PAGE</h1>
    </div>
</template>

<style scoped>

</style>