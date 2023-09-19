<script setup>
const requestedMaterials = inject("requestedMaterials");
</script>

<template>
    <div>
        <div class="mt-7 text-center">
            <h2 class="text-lg font-bold text-main-500">SELECT MATERIALS</h2>
            <p>Select any materials you would like to add to this request.</p>
            <div v-if="requestedMaterials.length != 0">
                <p class="text-red-600">
                    Finalize Materials and Equipment Request in the
                    <span class="font-bold"
                        >Orders ({{ requestedMaterials.length }})</span
                    >
                    tab
                </p>
            </div>
        </div>

        <!-- TODO: api get all materials call -->
        <!-- TODO: Materials Search table -->
    </div>
</template>
