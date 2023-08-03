<script setup>
const { pending, data: allUsers } = await useLazyFetch(
    "/api/db/manageUsers/getAll",
);
</script>

<template>
    <div>
        <h1>HELLO WORLD</h1>
    </div>
</template>
