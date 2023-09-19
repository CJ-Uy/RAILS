<script setup>
// All Materials selected
const requestedMaterials = ref([]);
provide("requestedMaterials", requestedMaterials);

// Tabs
const items = computed(() => {
    if (requestedMaterials.value.length === 0) {
        return [
            {
                slot: "selectMaterials",
                label: "Select",
            },
            {
                slot: "orderMaterials",
                label: "Orders",
                disabled: true,
            },
        ];
    } else {
        return [
            {
                slot: "selectMaterials",
                label: "Select",
            },
            {
                slot: "orderMaterials",
                label: `Orders (${requestedMaterials.value.length})`,
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
                <FormsMaterialRequestSelection />
            </template>
            <template #orderEquipment>
                <FormsMaterialRequestOrder />
            </template>
        </UTabs>

        <FormKit
            v-model="requestedMaterials"
            type="list"
            name="details"
            dynamic
        />
    </div>
</template>
