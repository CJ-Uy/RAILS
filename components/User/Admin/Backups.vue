<script setup>
import dayjs from "dayjs";

const downloadingBackup = ref(false);
async function downloadBackUp() {
    downloadingBackup.value = true;
    const { data: dbBackup } = await useFetch(
        "/api/user/admin/backups/createBackup",
    );

    // Download dbBackup.value as .sql
    const url = window.URL.createObjectURL(
        new Blob([JSON.stringify(dbBackup.value)]),
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
        "download",
        `${dayjs().format("MMM-DD-YYYY-HH;mm;ss")}  RAILS Backup.sql`,
    );
    document.body.appendChild(link);
    link.click();
    downloadingBackup.value = false;
}
</script>

<template>
    <UCard>
        <template #heading>
            <h1>Backups</h1>
        </template>

        <template #footer>
            <UButton
                label="New Backup"
                @click="downloadBackUp"
                :disabled="downloadingBackup"
            />
        </template>
    </UCard>
</template>
