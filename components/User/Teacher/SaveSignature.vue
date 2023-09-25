<script setup>
const user = inject("user");
const signatureData = await useFetch(
    "/api/db/manageUsers/getTeacherSignature",
    {
        method: "POST",
        body: user,
    },
);

const signature = ref();
if (signatureData.data.signature) {
    signature.value = signatureData.data.signature;
} else {
    signature.value = signatureData.data;
}
</script>

<template>
    <div class="mx-[2.5%] flex items-center justify-center text-center">
        <UCard class="w-[50%]">
            <template #header> E-Signature </template>
            <div>
                {{ signature }}
            </div>
            <template #footer>
                <UButton label="Save New Signature" />
            </template>
        </UCard>
    </div>
</template>
