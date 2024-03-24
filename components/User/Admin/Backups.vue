<script setup lang="ts">
import dayjs from "dayjs";

const loadBackupModalIsOpen = ref(false);
const processingLoadedBackupFile = ref(false);

const loadedBackupFile = ref();

const downloadingBackup = ref(false);
async function downloadBackUp() {
    downloadingBackup.value = true;
    const { data: dbBackup } = await useFetch(
        "/api/user/admin/backups/createBackup",
    );

    // Download dbBackup.value as .sql
    const url = window.URL.createObjectURL(new Blob([dbBackup.value]));
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

function onChangeFile(event: Event) {
    const [_file] = (event.target as HTMLInputElement).files as FileList;
    loadedBackupFile.value = _file;
}

async function loadBackupFile() {
    processingLoadedBackupFile.value = true;
    const body = new FormData();
    body.append("file", loadedBackupFile.value, loadedBackupFile.value.name);
    await useFetch("/api/user/admin/backups/loadFromBackup", {
        method: "POST",
        body,
    });
    reloadNuxtApp();
    loadBackupModalIsOpen.value = false;
    processingLoadedBackupFile.value = false;
}
</script>

<template>
    <div>
        <UCard class="w-[300px]">
            <template #header>
                <h1 class="text-center font-bold">Data Backup</h1>
            </template>
            <div class="flex flex-col items-center justify-center">
                <UButton
                    class="my-3"
                    label="Download Current Backup"
                    :disabled="downloadingBackup"
                    @click="downloadBackUp"
                />
                <UButton
                    label="Load from Backup"
                    variant="soft"
                    @click="loadBackupModalIsOpen = true"
                />
            </div>
        </UCard>
        <UModal v-model="loadBackupModalIsOpen">
            <UCard>
                <template #header>
                    <h1>LOAD A BACK UP FILE</h1>
                </template>
                <div>
                    <h3 class="text-red-600">DANGER ZONE</h3>
                    <p>
                        NOTE: This will erase the current database and populate
                        it with the contents inside the uploaded backup file. We
                        suggest saving first a backup file of the current
                        database before replacing it. If you only wish to view
                        contents in a backup file, run a local instance of RAILS
                        (this web app) and load the backup file there.
                    </p>
                    <!-- mb-[1/4 of height] -->
                    <v-file-input
                        class="mb-[-25px] mt-10 h-[100px]"
                        label="Upload .sql Backup File"
                        accept=".sql"
                        @change="onChangeFile"
                    />
                </div>
                <template #footer>
                    <UButton
                        label="Replace Database with Back Up File"
                        variant="outline"
                        color="red"
                        :disabled="processingLoadedBackupFile"
                        @click="loadBackupFile"
                    />
                </template>
            </UCard>
        </UModal>
    </div>
</template>
