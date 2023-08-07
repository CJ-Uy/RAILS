<script setup>
// All Equipment selected
const requestedEquipment = ref([]);

// TODO: filter rows
// TODO: add and subtract the objects from one list to the other make them "move" so no duplicates
// TODO: columns for the table

// Pagination
const page = ref(1);
const pageCount = 10;
const totalItems = ref();

// Searching Rows
const { pending, data: allEquipment } = await useLazyFetch("/api/db/forms/getAllEquipment");

let filteredRows = ref(allEquipment); 
totalItems.value = filteredRows.value.length;

// Filter rows
const searchQuery = ref("");



function addItem(item) {
    requestedEquipment.value.push(item);
}

function validateQuantity(equipment) {
    if (equipment.quantity < 1) {
        equipment.quantity = 1;
    }
}
</script>

<template>
    <div class="w-full">
        <h1 class="pb-5">EQUIPMENT REQUEST</h1>
        <div class="mb-5 flex flex-row items-center justify-center">
            <!-- Show all requestedEquipment -->
            <div>
                <UCard>
                    <template #header>
                        <h2 class="text-center text-lg font-bold">
                            Search For Equipment
                        </h2>
                    </template>

                <!-- SEARCH TABLE -->
                    <!-- Search bar filter -->
                    <div class="w-[150px]">
                        <UInput
                            v-model="searchQuery"
                            placeholder="Search..."
                            size="sm"
                            icon="i-heroicons-magnifying-glass-20-solid"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                        >
                            <template #trailing>
                                <UButton
                                    v-show="searchQuery !== ''"
                                    color="gray"
                                    variant="link"
                                    icon="i-heroicons-x-mark-20-solid"
                                    :padded="false"
                                    @click="searchQuery = ''"
                                />
                            </template>
                        </UInput>
                    </div>

                    <!-- Table -->
                    <UTable :rows="filteredRows" @select="addItem" :loading="pending" />
                    <!-- Pagination -->
                    <div class="flex w-[100%] items-center justify-end">
                        <UPagination
                            v-model="page"
                            :page-count="pageCount"
                            :total="totalItems"
                        />
                    </div>

                </UCard>
            </div>

            <!-- Arrows -->
            <div class="px-5 text-2xl">
                <Icon name="ooui:arrow-next-ltr" />
            </div>

            <!-- Final Requested Equipment -->
            <div>
                <UCard>
                    <template #header>
                        <h2 class="text-center text-lg font-bold">
                            Selected Equipment
                        </h2>
                    </template>
                    <table class="w-full table-auto text-left">
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
                                    {{ equipment.name }} -
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
                                                @blur="
                                                    validateQuantity(equipment)
                                                "
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
                                                    requestedEquipment.indexOf(equipment),
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
                        v-model="requestedEquipment"
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
