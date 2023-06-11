<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
const props = defineProps({
    context: Object,
});
</script>

<template>
    <VueDatePicker
        time-picker
        enable-time-range-validation
        range
        placeholder="Select Time"
        :model-value="context._value"
        @update:model-value="context.node.input($event)"
    />
</template>
