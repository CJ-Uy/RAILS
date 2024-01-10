<script setup>
import dayjs from "dayjs";

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
const dateTimes = ref([
    {
        requestDates: [],
        startTime: null,
        endTime: null,
        ranged: false, // When changed to ranged it visually shows the first and second date in the array
    },
]);
function addDateTime() {
    dateTimes.value.push({
        requestDates: [],
        startTime: null,
        endTime: null,
        ranged: false,
    });
}

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
                custom: 'I will not be using a Laboratory for this activity',
            }"
            help="If this is for a class activity select the first option"
            validation="required" 
        />
        <div v-if="showLabRes">
            <h2 class="font-bold">
                NOTICE: We will now automatically add a Laboratory Reservation
                to your request
            </h2>
        </div>
        <br />
        <FormKit
            v-if="labResStatus != 'custom'"
            type="select"
            label="Preferred Laboratory Room"
            name="venue"
            validation="required"
            placeholder="Select Your Laboratory Room"
            :options="laboratoriesOptions"
        />
        <FormKit
            v-if="labResStatus === 'custom'"
            type="text"
            label="Location of Activity"
            name="customLocation"
            placeholder="Enter Custom Location"
            validation="required"
        />
        <h3 class="font-bold">Add Reservations</h3>
        <p>
            All Inclusive Time of Use applies to all dates selected in with
            their respective calendar. You can also select multiple dates in the
            calendar date picker.
        </p>
        <br />
        <UButton
            icon="i-material-symbols-add"
            label="Add Reservation"
            class="mb-5"
            @click="addDateTime"
        />
        <div
            v-for="(dateTime, index) in dateTimes"
            :key="index"
            class="mb-3 bg-slate-50 py-5"
        >
            <table>
                <tr>
                    <td class="pb-1 text-center text-xl font-bold">
                        Reservation #{{ index + 1 }}
                    </td>
                    <td class="flex justify-end">
                        <UButton
                            v-if="index !== 0"
                            color="red"
                            variant="outline"
                            icon="i-material-symbols-delete-outline"
                            @click="removeDateTime(index)"
                        />
                    </td>
                </tr>
                <tr>
                    <td rowspan="3" class="w-min px-5">
                        <div v-if="dateTimes[index].ranged">
                            <!-- Try to change this into the raw Vue date picker component -->
                            <VueDatePicker
                                v-model="dateTime.requestDates"
                                inline
                                range
                                :enable-time-picker="false"
                                placeholder="Select Date(s)"
                                auto-apply
                                :min-date="new Date()"
                                :close-on-auto-apply="false"
                                required
                            >
                            </VueDatePicker>
                        </div>
                        <div v-else>
                            <VueDatePicker
                                v-model="dateTime.requestDates"
                                inline
                                multi-dates
                                :enable-time-picker="false"
                                placeholder="Select Date(s)"
                                auto-apply
                                :min-date="new Date()"
                                :close-on-auto-apply="false"
                                required
                            >
                            </VueDatePicker>
                        </div>
                    </td>
                    <td class="flex-row items-center justify-center p-2">
                        <UToggle v-model="dateTimes[index].ranged" />
                        Range Mode
                    </td>
                </tr>
                <tr>
                    <td class="flex flex-col items-center justify-center pr-5">
                        <h3 class="my-3 font-semibold">Time of Use</h3>
                        <VueDatePicker
                            v-model="dateTime.startTime"
                            time-picker
                            auto-apply
                            placeholder="Start Time"
                            :start-time="{ hours: 0, minutes: 0 }"
                            required
                        >
                            <template #input-icon>
                                <Icon
                                    id="left-icon"
                                    name="ic:round-access-time"
                                    class="vue-date-picker-icons"
                                />
                            </template>

                            <template #clear-icon="{ clear }">
                                <Icon
                                    id="right-icon"
                                    name="ic:round-close"
                                    class="vue-date-picker-icons"
                                    @click="clear"
                                />
                            </template>
                        </VueDatePicker>

                        <VueDatePicker
                            v-model="dateTime.endTime"
                            time-picker
                            auto-apply
                            placeholder="End Time"
                            :start-time="{ hours: 0, minutes: 0 }"
                            required
                        >
                            <template #input-icon>
                                <Icon
                                    id="left-icon"
                                    name="ic:round-access-time"
                                    class="vue-date-picker-icons"
                                />
                            </template>

                            <template #clear-icon="{ clear }">
                                <Icon
                                    id="right-icon"
                                    name="ic:round-close"
                                    class="vue-date-picker-icons"
                                    @click="clear"
                                />
                            </template>
                        </VueDatePicker>
                        <p class="text-xs">Note the 24hr time format</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="mr-3">
                            <!-- Selected Date Validat -->
                            <div class="mb-3">
                                <UCheckbox
                                    v-if="dateTime.requestDates.length > 0"
                                    :model-value="true"
                                    label="Date(s) Selected"
                                    disabled
                                    color="emerald"
                                    required
                                />
                                <UCheckbox
                                    v-else
                                    :model-value="false"
                                    label="Date(s) Selected"
                                    disabled
                                    color="emerald"
                                    required
                                />
                            </div>

                            <!-- Start and End Time Validation -->
                            <div v-if="dateTime.startTime && dateTime.endTime">
                                <UCheckbox
                                    v-if="
                                        // eslint-disable
                                        dateTime.startTime.hours <
                                            dateTime.endTime.hours ||
                                        (dateTime.startTime.hours ==
                                            dateTime.endTime.hours &&
                                            dateTime.startTime.minutes <
                                                dateTime.endTime.minutes)
                                        // eslint-enable
                                    "
                                    :model-value="true"
                                    label="Start Time is BEFORE End Time"
                                    disabled
                                    color="emerald"
                                    required
                                />
                                <UCheckbox
                                    v-else
                                    :model-value="false"
                                    label="Start Time is BEFORE End Time"
                                    disabled
                                    color="emerald"
                                    required
                                />
                            </div>
                            <UCheckbox
                                v-else
                                :model-value="false"
                                label="Select Start and End Time"
                                disabled
                                color="emerald"
                                required
                            />
                        </div>
                    </td>
                </tr>
            </table>
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

<style>
.vue-date-picker-icons {
    height: 20px;
    width: auto;
}
#left-icon {
    margin-left: 5px;
}
#right-icon {
    margin-right: 5px;
}
</style>
