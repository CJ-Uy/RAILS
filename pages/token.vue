<template>
    <pre>
        {{ token || "No token found!" }}
    </pre>
</template>

<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/user/token", { headers });
</script>
