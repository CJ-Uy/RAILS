<script setup>
const labResStatus = ref(true);
const showLabRes = computed(() => labResStatus.value === "false"); // Manual ! sign idk why it doesn't work

const requestDates = ref();
</script>

<template>
    <div>
        <h1>TIME AND PLACE</h1>
        <FormKit
            v-model="labResStatus"
            type="radio"
            label="Laboratory Reservation Status"
            :options="{
                true: 'I already have a Laboratory Reservation for this activity',
                false: 'I do NOT have a Laboratory Reservation yet',
            }"
            help="If this is for a class activity select the first option"
        />
        <!-- TODO: Add icons https://vue3datepicker.com/slots/icons/#icons currently the default ones are invisible (idk why) -->
        <VueDatePicker
            v-model="requestDates"
            multi-dates
            :enable-time-picker="false"
            placeholder="Select Dates of Activity"
            auto-apply
            :close-on-auto-apply="false"
        />
        <FormKit
            type="time"
            label="Time of START of Activity"
            name="timeStartOfActivity"
            validation="required"
        />
        <FormKit
            type="time"
            label="Time of END of Activity"
            name="timeEndOfActivity"
            validation="required"
        />
        <div v-if="showLabRes">
            <h2>Laboratory Reservation</h2>
            <FormKit
                type="text"
                label="Laboratory Room"
                name="LaboratoryVenue"
                validation="required"
            />
        </div>
    </div>
</template>
