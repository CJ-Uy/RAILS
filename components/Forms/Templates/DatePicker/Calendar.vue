<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
const props = defineProps({
    context: Object,
});
</script>

<template>
    <VueDatePicker
        multi-dates
        :enable-time-picker="false"
        placeholder="Select Dates of Activity"
        auto-apply
        :close-on-auto-apply="false"
        :model-value="context._value"
        @update:model-value="context.node.input($event)"
    />
</template>
