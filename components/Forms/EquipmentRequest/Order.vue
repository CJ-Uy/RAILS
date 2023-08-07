<script setup>
const requestedEquipment = inject("requestedEquipment");

function validateQuantity(equipment) {
    if (equipment.quantity < 1) {
        equipment.quantity = 1;
    }
}
</script>

<template>
    <div>
        <h2>Search for and select your needed equipment and materials</h2>
        <!-- Final Requested Equipment -->
        <div>
            <UCard>
                <template #header>
                    <h2 class="text-center text-lg font-bold">
                        Selected Equipment
                    </h2>
                </template>
                <table class="w-[100%] table-auto text-left">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-center">Equipment</th>
                            <th class="px-4 py-2 text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="equipment in requestedEquipment"
                            :key="equipment.name"
                        >
                            <!-- Item -->
                            <td class="border px-4 py-2">
                                {{ equipment.equipmentName }} -
                                {{ equipment.description }}
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
                                            equipment.quantity > 1
                                                ? equipment.quantity--
                                                : null
                                        "
                                    />

                                    <!-- Input Quantity -->
                                    <div class="w-[85px] px-5">
                                        <UInput
                                            v-model="equipment.quantity"
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
                                        @click="equipment.quantity++"
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
