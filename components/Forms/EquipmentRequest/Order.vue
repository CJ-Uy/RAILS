<script setup>
const requestedEquipment = inject("requestedEquipment");

function validateQuantity(equipment) {
    if (equipment.requestedQuantity < 1) {
        equipment.requestedQuantity = 1;
    }
    if (equipment.requestedQuantity > equipment.quantity) {
        equipment.requestedQuantity = equipment.quantity;
    }
}
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">
                FINALIZE REQUESTED EQUIPMENT
            </h2>
            <p>Finalize your requested materials and equipment here</p>
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
                            <th class="px-4 py-2 text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="equipment in requestedEquipment"
                            :key="equipment.name"
                            class="text-center"
                        >
                            <!-- Item -->
                            <td class="border px-4 py-2">
                                {{ equipment.equipmentName }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ equipment.description }}
                            </td>

                            <td class="border px-4 py-2">
                                {{ equipment.quantity }}
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
                                            equipment.requestedQuantity > 1
                                                ? equipment.requestedQuantity--
                                                : null
                                        "
                                    />

                                    <!-- Input Quantity -->
                                    <div class="w-[85px] px-5">
                                        <UInput
                                            v-model="
                                                equipment.requestedQuantity
                                            "
                                            class="text-center"
                                            type="number"
                                            min="1"
                                            @blur="validateQuantity(equipment)"
                                        />
                                    </div>

                                    <!-- (+) Button -->
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-material-symbols-add-rounded"
                                        class="px-2"
                                        @click="
                                            equipment.requestedQuantity <
                                            equipment.quantity
                                                ? equipment.requestedQuantity++
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
                                            requestedEquipment.splice(
                                                requestedEquipment.indexOf(
                                                    equipment,
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
