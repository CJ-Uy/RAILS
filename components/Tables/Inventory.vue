<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    startingColumns: {
        type: Array,
        required: true,
    },
    listOfAllColumns: {
        type: Array,
        required: false,
        default: () => [],
    },
    fetchPath: {
        type: String,
        required: true,
    },
});

const { pending, data: allItems } = await useLazyFetch(props.fetchPath);
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ fetchPath }}</p>
        <p>{{ startingColumns }}</p>
        <p>{{ listOfAllColumns }}</p>
        <slot name="modal-content" />

        <pre>
            {{ allItems }}
        </pre>
    </div>
</template>
