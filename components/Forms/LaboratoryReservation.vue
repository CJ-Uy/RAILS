<script setup>
const labResStatus = ref(true);
const showLabRes = computed(() => labResStatus.value === "false"); // Manual ! sign idk why it doesn't work

const requestDates = ref([]);
</script>

<template>
    <div>
        <h1>TIME AND PLACE</h1>
        <FormKit
            v-model="labResStatus"
            type="radio"
            label="Laboratory Reservation Status"
            name="hasLaboratoryReservation"
            :options="{
                true: 'I already have a Laboratory Reservation for this activity',
                false: 'I do NOT have a Laboratory Reservation yet',
            }"
            help="If this is for a class activity select the first option"
        />
        <!-- TODO: Add icons https://vue3datepicker.com/slots/icons/#icons currently the default ones are invisible (idk why) -->
        <FormKit
            v-model="requestDates"
            type="calendarDatePicker"
            label="Date/s of Activity"
            name="reqestDates"
            validation="required"
        />
        <FormKit
            type="timeDatePicker"
            label="Inclusive Time of Use"
            name="inclusiveTimeOfUse"
            validation="required"
        />
        <div v-if="showLabRes">
            <h2>Reserve a Laboratory</h2>
            <FormKit
                type="select"
                label="Preferred Laboratory Room"
                name="venue"
                validation="required"
                :options="[
                    { label: 'Biology Laboratory', value: 'BioLab' },
                    { label: 'Chemistry Laboratory', value: 'ChemLab' },
                    { label: 'Physics Laboratory', value: 'PhysLab' },
                ]"
            />
        </div>
    </div>
</template>
