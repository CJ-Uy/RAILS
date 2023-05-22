<template>
    <pre>
        {{ token || "No token found!" }}
    </pre>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });
</script>
