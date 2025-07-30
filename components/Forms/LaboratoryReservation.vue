<script setup>
const labResStatus = ref();
const venueRef = ref(null);
const customLocationRef = ref(null);

const props = defineProps({
    venue: String,
    customLocation: String,
});

const emit = defineEmits(["update:venue", "update:customLocation"]);

watch(
    () => props.venue,
    (newVal) => {
        venueRef.value = newVal;
    },
    { immediate: true },
);

watch(
    () => props.customLocation,
    (newVal) => {
        customLocationRef.value = newVal;
    },
    { immediate: true },
);

watch(venueRef, (newVal) => {
    emit("update:venue", newVal);
});

watch(customLocationRef, (newVal) => {
    emit("update:customLocation", newVal);
});
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

const formattedLabSummary = computed(() => {
    const labSetting = {
        hasLaboratoryReservation: labResStatus.value,
        venue: venueRef.value,
        customLocation: customLocationRef.value,
        allDates: dateTimes.value,
    };

    const result = {
        venue: undefined, // Initialize to undefined
        customLocation: undefined, // Initialize to undefined
        formattedDates: undefined, // Initialize to undefined
        message: undefined, // Initialize to undefined
        hasReservation: labSetting.hasLaboratoryReservation === "true",
    };

    // Always process dates if they exist
    if (labSetting.allDates && labSetting.allDates.length) {
        result.formattedDates = labSetting.allDates.map((dateEntry) => {
            let datesString;
            if (dateEntry.ranged) {
                datesString = `${new Date(dateEntry.requestDates[0]).toLocaleDateString()} to ${new Date(dateEntry.requestDates[1]).toLocaleDateString()}`;
            } else {
                datesString = dateEntry.requestDates
                    .map((d) => new Date(d).toLocaleDateString())
                    .join(", ");
            }
            return {
                datesString,
                startTime: dateEntry.startTime
                    ? `${dateEntry.startTime.hours}:${String(dateEntry.startTime.minutes).padStart(2, "0")}`
                    : "N/A",
                endTime: dateEntry.endTime
                    ? `${dateEntry.endTime.hours}:${String(dateEntry.endTime.minutes).padStart(2, "0")}`
                    : "N/A",
                ranged: dateEntry.ranged ? "Yes" : "No",
            };
        });
    }

    if (labSetting.hasLaboratoryReservation === "true") {
        result.venue = labSetting.venue;
    } else if (labSetting.hasLaboratoryReservation === "false") {
        result.venue = labSetting.venue; // Still show venue if selected
        result.message = "A Laboratory Reservation will be made.";
    } else if (labSetting.hasLaboratoryReservation === "custom") {
        result.customLocation = labSetting.customLocation;
        result.message = `Custom Location: ${labSetting.customLocation || "N/A"}`;
    }

    return result;
});

defineExpose({
    formattedLabSummary,
});
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
            v-model="venueRef"
        />
        <FormKit
            v-if="labResStatus === 'custom'"
            type="text"
            label="Location of Activity"
            name="customLocation"
            placeholder="Enter Custom Location"
            validation="required"
            v-model="customLocationRef"
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
            <div class="grid grid-cols-1 gap-4 px-5 md:grid-cols-2">
                <!-- Reservation Number -->
                <div
                    class="col-span-1 flex items-center justify-between md:col-span-2"
                >
                    <span class="text-center text-xl font-bold"
                        >Reservation #{{ index + 1 }}</span
                    >
                    <UButton
                        v-if="index !== 0"
                        color="red"
                        variant="outline"
                        icon="i-material-symbols-delete-outline"
                        @click="removeDateTime(index)"
                    />
                </div>

                <!-- Date Picker -->
                <div class="col-span-1">
                    <div v-if="dateTimes[index].ranged">
                        <!-- VueDatePicker component for Range Mode -->
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
                        ></VueDatePicker>
                    </div>

                    <!-- VueDatePicker component for Multiple Dates -->
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
                        ></VueDatePicker>
                    </div>
                </div>

                <div
                    class="col-span-1 mr-5 flex h-max w-max flex-col items-center justify-center"
                >
                    <!-- Range Mode -->
                    <div
                        class="mr-5 flex h-min w-full flex-row items-center justify-center"
                    >
                        <v-switch
                            v-model="dateTimes[index].ranged"
                            color="primary"
                            hide-details
                            class="mr-3"
                        />
                        <h2 class="text-dark-primary">Range Mode</h2>
                    </div>

                    <!-- Time Selection -->
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
                </div>

                <!-- Selected Date Validation -->
                <div class="col-span-1 md:col-span-1">
                    <v-checkbox
                        v-if="dateTime.requestDates.length > 0"
                        label="Date(s) Selected"
                        :readonly="true"
                        required
                        :model-value="true"
                        color="success"
                        hide-details
                    />
                    <v-checkbox
                        v-else
                        label="Date(s) Selected"
                        :readonly="true"
                        required
                        :model-value="false"
                        color="success"
                        hide-details
                    />
                </div>

                <!-- Start and End Time Validation -->
                <div class="col-span-1 md:col-span-1">
                    <div v-if="dateTime.startTime && dateTime.endTime">
                        <v-checkbox
                            v-if="
                                dateTime.startTime.hours <
                                    dateTime.endTime.hours ||
                                (dateTime.startTime.hours ==
                                    dateTime.endTime.hours &&
                                    dateTime.startTime.minutes <
                                        dateTime.endTime.minutes)
                            "
                            :model-value="true"
                            label="Start Time is BEFORE End Time"
                            :readonly="true"
                            color="success"
                            required
                            hide-details
                        />
                        <v-checkbox
                            v-else
                            :model-value="false"
                            label="Start Time is BEFORE End Time"
                            :readonly="true"
                            color="success"
                            required
                            hide-details
                        />
                    </div>
                    <v-checkbox
                        v-else
                        :model-value="false"
                        label="Select Start and End Time"
                        :readonly="true"
                        color="success"
                        required
                        hide-details
                    />
                </div>
            </div>
        </div>
    </div>

    <div>
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