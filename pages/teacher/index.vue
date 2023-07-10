<script setup>
const { data } = await useFetch("/api/user/me");
if (data.value.role == "STUDENT"){
    await navigateTo("/student");
}
</script>

<template>
    <div>
        <h1>TEACHER PAGE</h1>
    </div>
</template>

<style scoped>

</style>