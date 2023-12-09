<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    defaultSortKey: {
        type: String,
        required: false,
        default: "name",
    },
    startingColumns: {
        type: Array,
        required: true,
    },
    listOfAllColumns: {
        type: Array,
        required: true,
    },
    fetchPath: {
        type: String,
        required: true,
    },
    updatePath: {
        type: String,
        required: false,
        default: "",
    },
    editModeIsOpen: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<template>
    <div>
        <h1>Table Requests</h1>
    </div>
</template>

<style scoped></style>
