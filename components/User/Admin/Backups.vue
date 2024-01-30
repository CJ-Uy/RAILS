<script setup>
const test = ref();
async function downloadBackUp() {
    const dbBackup = await useFetch("/api/user/admin/backups/createBackup");
    console.log(dbBackup);
    test.value = dbBackup.data.value;
}
</script>

<template>
    <UCard>
        <template #heading>
            <h1>Backups</h1>
        </template>

        <template #footer>
            <UButton label="New Backup" @click="downloadBackUp" />
        </template>
    </UCard>
    {{ test }}
</template>
