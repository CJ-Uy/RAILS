<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    columns: {
        type: Array,
        required: false,
    },
    fetchPath: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <slot name="modal-content" />
    </div>
</template>
