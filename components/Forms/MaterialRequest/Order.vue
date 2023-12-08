<script setup>
const requestedMaterials = inject("requestedMaterials");

function validateQuantity(Material) {
    if (Material.requestedQuantity < 1) {
        Material.requestedQuantity = 1;
    }
    if (Material.requestedQuantity > Material.quantity) {
        Material.requestedQuantity = Material.quantity;
    }
}
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">
                FINALIZE REQUESTED MATERIALS
            </h2>
            <p>
                Finalize your requested materials and Materials here.<br />
                <span class="font-semibold">
                    A Laboratory Request and Materials Accountability Form will
                    automatically be created
                </span>
            </p>
        </div>

        <!-- Final Requested Materials -->
        <div class="my-7">
            <UCard>
                <table class="w-[100%] table-auto text-left">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-center">Name</th>
                            <th class="px-4 py-2 text-center">Description</th>
                            <th class="px-4 py-2 text-center">Stock</th>
                            <th class="px-4 py-2 text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="Materials in requestedMaterials"
                            :key="Materials.name"
                            class="text-center"
                        >
                            <!-- Item -->
                            <td class="border px-4 py-2">
                                {{ Materials.itemName }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ Materials.description }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ Materials.quantity }}
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
                                            Materials.requestedQuantity > 1
                                                ? Materials.requestedQuantity--
                                                : null
                                        "
                                    />

                                    <!-- Input Quantity -->
                                    <div class="w-[85px] px-5">
                                        <UInput
                                            v-model="
                                                Materials.requestedQuantity
                                            "
                                            :ui="{
                                                base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 text-center', // It overrides the default UI classes so you have to 
                                            }"
                                            type="number"
                                            min="1"
                                            @blur="validateQuantity(Materials)"
                                        />
                                    </div>

                                    <!-- (+) Button -->
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-material-symbols-add-rounded"
                                        class="px-2"
                                        @click="
                                            Materials.requestedQuantity <
                                            Materials.quantity
                                                ? Materials.requestedQuantity++
                                                : null
                                        "
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
                                            requestedMaterials.splice(
                                                requestedMaterials.indexOf(
                                                    Materials,
                                                ),
                                                1,
                                            )
                                        "
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </UCard>
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
