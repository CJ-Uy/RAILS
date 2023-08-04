<script setup>
// All materials selected
const materials = ref([]);

// TODO: olumns for the table

const rows = [
    {
        name: "Item 1",
        description: "First",
        quantity: 1,
    },
    {
        name: "Item 2",
        description: "Second",
        quantity: 1,
    },
    {
        name: "Item 3",
        description: "Third",
        quantity: 1,
    },
];

function addItem(item) {
    materials.value.push(item);
}

function validateQuantity(material) {
    if (material.quantity < 1) {
        material.quantity = 1;
    }
}
</script>

<template>
    <div class="w-full">
        <h1 class="pb-5">MATERIALS REQUEST</h1>
        <div class="mb-5 flex flex-row items-center justify-center">
            <!-- Show all materials -->
            <div>
                <UCard>
                    <template #header>
                        <h2 class="text-center text-lg font-bold">
                            Search For Materials
                        </h2>
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
                        <h2 class="text-center text-lg font-bold">
                            Selected Materials
                        </h2>
                    </template>
                    <table class="w-full table-auto text-left">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-center">Materials</th>
                                <th class="px-4 py-2 text-center">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="material in materials"
                                :key="material.name"
                            >
                                <!-- Item -->
                                <td class="border px-4 py-2">
                                    {{ material.name }} -
                                    {{ material.description }}
                                </td>

                                <!-- Controls -->
                                <td class="border px-4 py-2">
                                    <div
                                        class="flex flex-row items-center justify-center"
                                    >
                                        <!-- (-) button -->
                                        <UButton
                                            color="primary"
                                            variant="soft"
                                            icon="i-material-symbols-remove-rounded"
                                            class="px-2"
                                            @click="
                                                material.quantity > 1
                                                    ? material.quantity--
                                                    : null
                                            "
                                        />

                                        <!-- Input Quantity -->
                                        <div class="w-[85px] px-5">
                                            <UInput
                                                v-model="material.quantity"
                                                class="text-center"
                                                type="number"
                                                min="1"
                                                @blur="
                                                    validateQuantity(material)
                                                "
                                            />
                                        </div>

                                        <!-- (+) Button -->
                                        <UButton
                                            color="primary"
                                            variant="soft"
                                            icon="i-material-symbols-add-rounded"
                                            class="px-2"
                                            @click="material.quantity++"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="pl-3">
                                        <!-- Delete Item Button -->
                                        <UButton
                                            color="red"
                                            variant="outline"
                                            icon="i-material-symbols-delete-outline"
                                            @click="
                                                materials.splice(
                                                    materials.indexOf(material),
                                                    1,
                                                )
                                            "
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

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

<style>
/* Remove the default up and down arrows for input type number */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
