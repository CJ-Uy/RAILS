<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
const props = defineProps({
    context: Object,
});
</script>

<template>
    <!-- 
        For the time picker with "enable-time-range-validation" it makes sure that the first time is before the second time
        However, it does not tell the end user that the times are invalid andd simply does not change making it feel buggy.
        TODO: figure out how to do validation on this
     -->
    <VueDatePicker
        time-picker
        disable-time-range-validation
        range
        auto-apply
        placeholder="Select Time"
        :model-value="context._value"
        @update:model-value="context.node.input($event)"
    >
        <template #input-icon>
            <Icon
                id="left-icon"
                name="ic:round-access-time"
                class="vue-date-picker-icons"
            />
        </template>

        <template #clear-icon="{ clear }">
            <Icon
                id="right-icon"
                name="ic:round-close"
                class="vue-date-picker-icons"
                @click="clear"
            />
        </template>
    </VueDatePicker>
</template>

<style>
.vue-date-picker-icons {
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
