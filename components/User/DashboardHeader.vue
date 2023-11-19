<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <UContainer class="mb-10 mt-5">
            <h1 class="border-primary border-b-4 p-4 text-3xl font-bold">
                {{ title }}
            </h1>
        </UContainer>
    </div>
</template>
