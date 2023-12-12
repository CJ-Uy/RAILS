<script setup>
// All Reagents selected
const requestedReagents = ref([]);
provide("requestedReagents", requestedReagents);

// Tabs
const items = computed(() => {
    if (requestedReagents.value.length === 0) {
        return [
            {
                slot: "selectReagents",
                label: "Select",
            },
            {
                slot: "orderReagents",
                label: "Orders",
                disabled: true,
            },
        ];
    } else {
        return [
            {
                slot: "selectReagents",
                label: "Select",
            },
            {
                slot: "orderReagents",
                label: `Orders (${requestedReagents.value.length})`,
                disabled: false,
            },
        ];
    }
});
</script>

<template>
    <div class="w-full">
        <div class="pb-5 text-center">
            <h1 class="text-xl font-bold">REAGENT REQUEST</h1>
        </div>

        <!-- Tabs -->
        <UTabs
            :items="items"
            class="w-full"
            :ui="{ list: { tab: { active: 'bg-white' } } }"
        >
            <template #selectReagents>
                <FormsReagentRequestSelection />
            </template>
            <template #orderReagents>
                <FormsReagentRequestOrder />
            </template>
        </UTabs>

        <FormKit
            v-model="requestedReagents"
            type="list"
            name="details"
            dynamic
        />
    </div>
</template>
