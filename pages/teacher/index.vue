<script setup>
useHead({
    title: "EVC LABS Teacher | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <h1>TEACHER PAGE</h1>
    </div>
</template>

<style scoped>

</style>