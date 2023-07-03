<!-- eslint-disable vue/require-default-prop -->
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
    >
        <template #input-icon>
            <Icon
                id="left-icon"
                name="ic:baseline-calendar-today"
                class="input-slot-image"
            />
        </template>

        <template #clear-icon="{ clear }">
            <Icon
                id="right-icon"
                name="ic:round-close"
                class="input-slot-image"
                @click="clear"
            />
        </template>
    </VueDatePicker>
</template>

<style>
.input-slot-image {
    height: 20px;
    width: auto;
}
#left-icon {
    margin-left: 5px;
}
#right-icon {
    margin-right: 5px;
}
</style>
