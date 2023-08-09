<script setup>
const requestedReagents = inject("requestedReagents");

function validateQuantity(reagent) {
    if (reagent.requestedQuantity < 1) {
        reagent.requestedQuantity = 1;
    }
    if (reagent.requestedQuantity > reagent.maxQuantity) {
        reagent.requestedQuantity = reagent.maxQuantity;
    }
}
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">
                FINALIZE REQUESTED REAGENTS
            </h2>
            <p>
                Finalize the quantity of the requested Reagents here. Be sure to
                note the units you are requesting.
            </p>
        </div>

        <!-- Final Requested Equipment -->
        <div class="my-7">
            <UCard>
                <table class="w-[100%] table-auto text-left">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-center">Name</th>
                            <th class="px-4 py-2 text-center">Description</th>
                            <th class="px-4 py-2 text-center">Stock</th>
                            <th class="px-4 py-2 text-center">Units</th>
                            <th class="px-4 py-2 text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="reagent in requestedReagents"
                            :key="reagent.name"
                            class="text-center"
                        >
                            <!-- Item -->
                            <td class="border px-4 py-2">
                                {{ reagent.chemicalName }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ reagent.description }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ reagent.maxQuantity }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ reagent.unit }}
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
                                            reagent.requestedQuantity > 5
                                                ? (reagent.requestedQuantity = reagent.requestedQuantity - 5)
                                                : null
                                        "
                                    />

                                    <!-- Input Quantity -->
                                    <div class="w-[100px] px-5">
                                        <UInput
                                            v-model="reagent.requestedQuantity"
                                            class="text-center"
                                            type="number"
                                            min="1"
                                            @blur="validateQuantity(reagent)"
                                        />
                                    </div>

                                    <!-- (+) Button -->
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-material-symbols-add-rounded"
                                        class="px-2"
                                        @click="
                                            reagent.requestedQuantity <
                                            reagent.maxQuantity
                                                ? (reagent.requestedQuantity = reagent.requestedQuantity + 5)
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
                                            requestedReagents.splice(
                                                requestedReagents.indexOf(
                                                    reagent,
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
