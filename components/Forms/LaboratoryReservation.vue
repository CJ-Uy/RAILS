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
        <div v-if="showLabRes">
            <h2>
                NOTICE: We will now automatically add a Laboratory Reservation
                to your request
            </h2>
        </div>
        <br />
        <br />
        <!-- TODO: Add icons https://vue3datepicker.com/slots/icons/#icons currently the default ones are invisible (idk why) -->
        <FormKit
            type="select"
            label="Preferred Laboratory Room"
            name="venue"
            validation="required"
            :options="[
                { label: 'Biology Laboratory', value: 'Biology Laboratory' },
                {
                    label: 'Chemistry Laboratory',
                    value: 'Chemistry Laboratory',
                },
                { label: 'Physics Laboratory', value: 'Physics Laboratory' },
            ]"
        />
        <FormKit
            v-model="requestDates"
            type="calendarDatePicker"
            label="Date/s of Activity"
            name="requestDates"
            validation="required"
        />
        <FormKit
            type="timeDatePicker"
            label="Inclusive Time of Use"
            name="inclusiveTimeOfUse"
            validation="required"
        />
    </div>
</template>
