<script setup>
const labResStatus = ref(true);
const showLabRes = computed(() => labResStatus.value === "false"); // Manual ! sign idk why it doesn't work

const laboratories = await useFetch("/api/db/forms/getAllLaboratories");
const laboratoriesOptions = ref(makeSelectionOptions(laboratories));

function makeSelectionOptions(response) {
    const options = [];
    for (const key in response.data.value) {
        options.push({
            label: response.data.value[key],
            value: key,
        });
    }
    return options;
}

// Support for multiple date(s) and time range
const dateTimes = ref([]);
function addDateTime() {
    dateTimes.value.push({
        requestDates: "",
        inclusiveTimeOfUse: "",
    });
}
addDateTime(); // Add one by default

function removeDateTime(index) {
    dateTimes.value.splice(index, 1);
}
</script>

<template>
    <div>
        <h1 class="mb-3 text-center text-xl font-bold">TIME AND PLACE</h1>
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
        <!-- TODO: Add icons https://vue3datepicker.com/slots/icons/#icons currently the default ones are invisible (idk why) -->
        <FormKit
            type="select"
            label="Preferred Laboratory Room"
            name="venue"
            validation="required"
            placeholder="Select Your Laboratory Room"
            :options="laboratoriesOptions"
        />
        <h3 class="font-bold">Add Date(s) and their Time Range</h3>
        <p>
            For example if the 3 dates are chosen on a single calendar the time
            range chosen beside it applies to all 3 dates as well
        </p>
        <br />
        <UButton
            icon="i-material-symbols-add"
            label="Add Date & Time of Use"
            @click="addDateTime"
            class="mb-2"
        />
        <div class="mb-5">
            <div
                v-for="(dateTime, index) in dateTimes"
                :key="index"
                class="flex flex-row"
            >
                <div class="mr-2 w-[175px]">
                    <FormKit
                        v-model="dateTime.requestDates"
                        type="calendarDatePicker"
                        validation="required"
                    />
                </div>
                <div class="mr-2 w-[175px]">
                    <FormKit
                        v-model="dateTime.inclusiveTimeOfUse"
                        type="timeDatePicker"
                        validation="required"
                    />
                </div>
                <UButton
                    v-if="index !== 0"
                    color="red"
                    variant="outline"
                    icon="i-material-symbols-delete-outline"
                    @click="removeDateTime(index)"
                    class="h-[37px]"
                />
            </div>
        </div>

        <!-- Save all Date Times -->
        <FormKit
            v-model="dateTimes"
            type="list"
            name="allDates"
            validation="required"
        />
    </div>
</template>
