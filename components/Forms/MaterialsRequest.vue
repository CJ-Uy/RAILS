<script setup>
const materials = ref([]);

const rows = [
    {
        name: "Item 1",
        description: "First",
    },
    {
        name: "Item 2",
        description: "Second",
    },
    {
        name: "Item 2",
        description: "Third",
    },
];

function addItem(item) {
    materials.value.push(item);
}
</script>

<template>
    <div>
        <h1 class="pb-5">MATERIALS REQUEST</h1>
        <div class="mb-5 flex flex-row items-center justify-center">
            <!-- Show all materials -->
            <div>
                <UCard>
                    <template #header>
                        <h2>Search For Materials</h2>
                    </template>
                    <UTable :rows="rows" @select="addItem" />
                </UCard>
            </div>

            <!-- Arrows -->
            <div class="px-5 text-2xl">
                <Icon name="ooui:arrow-next-ltr" />
            </div>

            <!-- Final Requested Materials -->
            <div>
                <UCard>
                    <template #header>
                        <h2>Selected Materials</h2>
                    </template>
                    <ul>
                        <li v-for="material in materials" :key="material.name">
                            {{ material.name }} - {{ material.description }}
                        </li>
                    </ul>
                    <FormKit
                        v-model="materials"
                        type="list"
                        name="details"
                        dynamic
                    />
                </UCard>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
