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
const rangeMode = ref([]);

const dateTimes = ref([
    {
        requestDates: [],
        inclusiveTimeOfUse: [],
    },
]);
function addDateTime() {
    dateTimes.value.push({
        requestDates: [],
        inclusiveTimeOfUse: [],
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
            <h2>
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
        <h3 class="font-bold">Add Date(s) and their Time Range</h3>
        <p>
            All Inclusive Time of Use applies to all dates selected in with
            their respective calendar. You can also select multiple dates in the
            calendar date picker.
        </p>
        <br />
        <UButton
            icon="i-material-symbols-add"
            label="Add Date & Time of Use"
            @click="addDateTime"
            class="mb-3"
        />
        {{ dateTimes }}
        <div v-for="(dateTime, index) in dateTimes" :key="index" class="mb-3">
            <table>
                <tr>
                    <td class="border-2 p-5 text-center">Dates</td>
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
                    <td rowspan="3" class="w-min border-2 p-5">
                        <div v-if="rangeMode[index]">
                            <!-- Try to change this into the raw Vue date picker component -->
                            <FormKit
                                v-model="dateTime.requestDates"
                                type="RangedCalendarDatePicker"
                                validation="required"
                            />
                        </div>
                        <div v-else>
                            <FormKit
                                v-model="dateTime.requestDates"
                                type="calendarDatePicker"
                                validation="required"
                            />
                        </div>
                    </td>
                    <td
                        class="flex-row items-center justify-center border-2 p-2"
                    >
                        <UToggle v-model="rangeMode[index]" />
                        Range Mode
                    </td>
                </tr>
                <tr>
                    <td class="border-2 p-5">Inclusive Dates</td>
                </tr>
                <tr>
                    <td class="border-2 p-5">Date Picker</td>
                </tr>
            </table>
        </div>
        <!-- <div class="mb-5">
            <table class="w-full bg-slate-100">
                <tr class="text-center">
                    <th class="py-3">DATES</th>
                    <th></th>
                </tr>
                <div v-for="(dateTime, index) in dateTimes" :key="index">
                    <tr>
                        <td
                            rowspan="4"
                            class="flex items-center justify-center border-2 border-black"
                        >
                            <div class="mr-2 w-min text-center">
                                <FormKit
                                    v-model="dateTime.requestDates"
                                    type="calendarDatePicker"
                                    validation="required"
                                />
                            </div>
                        </td>
                        <td class="border-2 border-black">RANGE MODE</td>
                    </tr>
                    <tr>
                        <td>RANGE BAR</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mr-2 border-2 border-black">
                                <FormKit
                                    v-model="dateTime.inclusiveTimeOfUse"
                                    type="timeDatePicker"
                                    validation="required"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="flex items-center justify-center border-2">
                            <UButton
                                v-if="index !== 0"
                                color="red"
                                variant="outline"
                                icon="i-material-symbols-delete-outline"
                                @click="removeDateTime(index)"
                                class="h-[37px]"
                            />
                        </td>
                    </tr>
                </div>
            </table>
        </div> -->
        <!-- Save all Date Times -->
        <FormKit
            v-model="dateTimes"
            type="list"
            name="allDates"
            validation="required"
        />
    </div>
</template>
