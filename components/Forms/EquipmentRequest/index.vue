<script setup>
// All Equipment selected
const requestedEquipment = ref([]);
provide("requestedEquipment", requestedEquipment);

// Tabs
const items = computed(() => {
    if (requestedEquipment.value.length == 0) {
        return [
            {
                slot: "selectEquipment",
                label: "Select",
            },
            {
                slot: "orderEquipment",
                label: "Orders",
                disabled: true,
            },
        ];
    } else {
        return [
            {
                slot: "selectEquipment",
                label: "Select",
            },
            {
                slot: "orderEquipment",
                label: `Orders (${requestedEquipment.value.length})`,
                disabled: false,
            },
        ];
    }
});
</script>

<template>
    <div class="w-full">
        <div class="pb-5 text-center">
            <h1 class="text-xl font-bold">EQUIPMENT REQUEST</h1>
        </div>

        <!-- Tabs -->
        <UTabs
            :items="items"
            class="w-full"
            :ui="{ list: { tab: { active: 'bg-white' } } }"
        >
            <template #selectEquipment>
                <FormsEquipmentRequestSelection />
            </template>
            <template #orderEquipment>
                <FormsEquipmentRequestOrder />
            </template>
        </UTabs>

        <FormKit
            v-model="requestedEquipment"
            type="list"
            name="details"
            dynamic
        />
    </div>
</template>
