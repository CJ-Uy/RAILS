<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>

<template>
    <div>
        <h1>Protected Page</h1>
        <p>This page is protected by auth middleware.</p>
    </div>
</template>
