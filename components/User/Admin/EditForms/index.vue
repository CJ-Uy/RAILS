<script setup>
// TODO: CHARLESSS
// const gradeSections = {
//     0: { label: "7-Diamond" },
//     1: { label: "7-Emerald" },
//     2: { label: "7-Ruby" },
// };
// const gradeSectionsOptions = ref(gradeSections[0].label);
const gradeSections = [
    "7 - Diamond",
    "7 - Emerald",
    "7 - Ruby",
];
const gradeSectionsOptions = ref(gradeSections[0]);
</script>

<template>
    <div>
        <UContainer class="w-auto">
            <div>
                <h4>Grades and Section</h4>
                <USelect
                    v-model="gradeSectionsOptions"
                    :options="gradeSections"
                    class="my-2"
                />
                <UButton>Edit</UButton>
                <UButton class="mx-2">Remove</UButton>
            </div><br>
            <div>
                <h4>Units</h4>
                <USelect
                    v-model="gradeSectionsOptions"
                    :options="gradeSections"
                    class="my-2"
                />
                <UButton>Edit</UButton>
                <UButton class="mx-2">Remove</UButton>
            </div><br>
            <div>
                <h4>Laboratory Rooms</h4>
                <USelect
                    v-model="gradeSectionsOptions"
                    :options="gradeSections"
                    class="my-2"
                />
                <UButton>Edit</UButton>
                <UButton class="mx-2">Remove</UButton>
            </div>
        </UContainer>
    </div>
</template>

<style>
</style>
