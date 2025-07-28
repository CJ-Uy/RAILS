<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
import { useDownloader } from "~/composables/useDownloader";
const { loading, loadingMessage, download } = useDownloader();

// PAGE META
useHead({
    title: "EVC LABS | New Request",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "forms-pages" });
const user = inject("user");

const value = ref();
const labReservationRef = ref(null);
const labVenue = ref(null);
const labCustomLocation = ref(null);

async function submitHandler(formValues) {
    // Ensure venue and customLocation are updated in formValues
    if (labVenue.value) {
        formValues.data.laboratorySetting.venue = labVenue.value;
    }
    if (labCustomLocation.value) {
        formValues.data.laboratorySetting.customLocation =
            labCustomLocation.value;
    }

    // Save response to database
    const requestId = await useFetch("/api/forms/save-requests", {
        method: "POST",
        body: { user, formValues },
    });
    // Downloaing pdfs
    if (formValues.data.submission.download === true) {
        download(formValues.data.submission.id);
    }

    // // Emailing pdfs
    // if (formValues.data.submission.email) {
    //     // TODO: Make it so they send the info to their email
    // }

    // Redirect to the home page
    await navigateTo("/redirect");
}

// Remove progress bad labels on mobile
const hideLabels = ref(false);

const updateHideLabels = () => {
    // Only access window if on client side
    if (process.client) {
        hideLabels.value = window.innerWidth <= 768; // or any other value you want
    }
};

// Update the value on window resize
if (process.client) {
    window.addEventListener("resize", updateHideLabels);
}

// Update the value on initial load
updateHideLabels();

function downloadOrdinaryPDF() {
    const files = [
        "Laboratory Request and Equipment Accountability Form",
        "Laboratory Reservation Form",
        "Reagent Request Form",
    ];

    files.forEach((file) => {
        const link = document.createElement("a");
        link.href = `/officialForms/laboratoryUnit/${file}.pdf`;
        link.download = file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center">
        <div class="fixed top-0 z-10 w-full bg-white text-center">
            <h1 class="mt-5 text-2xl font-bold">LABORATORY REQUESTS</h1>
            <NuxtLink
                to="/redirect"
                class="text-blue-500 hover:underline active:text-green-500"
                >RETURN</NuxtLink
            >
        </div>
        <div class="mt-16 flex w-[80%] items-center justify-center">
            <FormKit
                type="form"
                :actions="false"
                name="requestData"
                use-local-storage
                @submit="submitHandler"
                @keydown.enter.prevent
            >
                <FormKit
                    v-model="value"
                    type="multi-step"
                    tab-style="progress"
                    name="data"
                    :hide-progress-labels="hideLabels"
                >
                    <FormKit
                        type="step"
                        name="basicInfo"
                        :classes="{ step: 'md:w-1/2' }"
                    >
                        <FormsBasicInfo />
                    </FormKit>

                    <FormKit
                        type="step"
                        name="laboratorySetting"
                        :classes="{ step: 'md:w-1/2' }"
                    >
                        <FormsLaboratoryReservation
                            ref="labReservationRef"
                            v-model:venue="labVenue"
                            v-model:customLocation="labCustomLocation"
                        />
                    </FormKit>

                    <FormKit
                        type="step"
                        name="materials"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <FormsMaterialRequest />
                    </FormKit>

                    <FormKit
                        type="step"
                        name="equipment"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <FormsEquipmentRequest />
                    </FormKit>

                    <FormKit
                        type="step"
                        name="reagents"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <FormsReagentRequest />
                    </FormKit>

                    <FormKit type="step" name="submission">
                        <div class="flex justify-center p-4">
                            <div
                                class="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg"
                            >
                                <div class="flex items-center justify-center">
                                    <h1
                                        class="mb-6 text-center text-3xl font-bold text-gray-700"
                                    >
                                        Final Step: Submit Your Request
                                    </h1>
                                </div>
                                <p class="mb-6 text-center text-gray-600">
                                    You're just one step away! Please review the
                                    information below before submitting.
                                </p>

                                <div
                                    v-if="
                                        labReservationRef?.formattedLabSummary &&
                                        labReservationRef.formattedLabSummary
                                            .hasReservation
                                    "
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Overall Request Dates/Times
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li
                                            v-for="(
                                                dateEntry, index
                                            ) in labReservationRef
                                                .formattedLabSummary
                                                .formattedDates"
                                            :key="index"
                                        >
                                            Dates: {{ dateEntry.datesString
                                            }}<br />
                                            Time: {{ dateEntry.startTime }} -
                                            {{ dateEntry.endTime }}<br />
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    v-if="value && value.basicInfo"
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Basic Information
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li v-if="value.basicInfo.campus">
                                            <strong>Campus:</strong>
                                            {{ value.basicInfo.campus }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo.schoolYear &&
                                                value.basicInfo.schoolYear[0]
                                            "
                                        >
                                            <strong>School Year:</strong>
                                            {{
                                                value.basicInfo.schoolYear[0]
                                                    .label
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo.firstname ||
                                                value.basicInfo.lastname
                                            "
                                        >
                                            <strong>Name:</strong>
                                            {{ value.basicInfo.firstname }}
                                            {{ value.basicInfo.lastname }}
                                        </li>
                                        <li v-if="value.basicInfo.email">
                                            <strong>Email:</strong>
                                            {{ value.basicInfo.email }}
                                        </li>
                                        <li v-if="value.basicInfo.gradeSection">
                                            <strong>Grade/Section:</strong>
                                            {{ value.basicInfo.gradeSection }}
                                        </li>
                                        <li v-if="value.basicInfo.unit">
                                            <strong>Unit:</strong>
                                            {{ value.basicInfo.unit }}
                                        </li>
                                        <li v-if="value.basicInfo.subject">
                                            <strong>Subject:</strong>
                                            {{ value.basicInfo.subject }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo.concurrentTopic
                                            "
                                        >
                                            <strong>Concurrent Topic:</strong>
                                            {{
                                                value.basicInfo.concurrentTopic
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo.teacherInCharge
                                            "
                                        >
                                            <strong>Teacher In Charge:</strong>
                                            {{
                                                value.basicInfo.teacherInCharge
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo.numberOfStudents
                                            "
                                        >
                                            <strong>Number of Students:</strong>
                                            {{
                                                value.basicInfo.numberOfStudents
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                value.basicInfo
                                                    .nameOfStudents &&
                                                value.basicInfo.nameOfStudents
                                                    .length
                                            "
                                        >
                                            <strong>Names of Students:</strong>
                                            {{
                                                value.basicInfo.nameOfStudents.join(
                                                    ", ",
                                                )
                                            }}
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    v-if="
                                        labReservationRef?.formattedLabSummary
                                    "
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Laboratory Reservation
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li
                                            v-if="
                                                labReservationRef
                                                    .formattedLabSummary.venue
                                            "
                                        >
                                            <strong>Venue:</strong>
                                            {{
                                                labReservationRef
                                                    .formattedLabSummary.venue
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                labReservationRef
                                                    .formattedLabSummary
                                                    .customLocation
                                            "
                                        >
                                            <strong>Custom Location:</strong>
                                            {{
                                                labReservationRef
                                                    .formattedLabSummary
                                                    .customLocation
                                            }}
                                        </li>
                                        <li
                                            v-if="
                                                labReservationRef
                                                    .formattedLabSummary
                                                    .formattedDates &&
                                                labReservationRef
                                                    .formattedLabSummary
                                                    .formattedDates.length
                                            "
                                        >
                                            <strong
                                                >Requested Dates/Times:</strong
                                            >
                                            <ul
                                                class="list-circle ml-4 list-inside space-y-1"
                                            >
                                                <li
                                                    v-for="(
                                                        dateEntry, index
                                                    ) in labReservationRef
                                                        .formattedLabSummary
                                                        .formattedDates"
                                                    :key="index"
                                                >
                                                    Dates:
                                                    {{ dateEntry.datesString
                                                    }}<br />
                                                    Time:
                                                    {{ dateEntry.startTime }} -
                                                    {{ dateEntry.endTime
                                                    }}<br />
                                                    Ranged:
                                                    {{ dateEntry.ranged }}
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            v-else-if="
                                                labReservationRef
                                                    .formattedLabSummary.message
                                            "
                                        >
                                            {{
                                                labReservationRef
                                                    .formattedLabSummary.message
                                            }}
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    v-if="
                                        value &&
                                        value.materials &&
                                        value.materials.details &&
                                        value.materials.details.length
                                    "
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Materials Requested
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li
                                            v-for="(item, index) in value
                                                .materials.details"
                                            :key="index"
                                        >
                                            <strong>{{ item.itemName }}</strong>
                                            ({{
                                                item.description ||
                                                "No description"
                                            }}) - Quantity:
                                            {{ item.requestedQuantity }}
                                            {{ item.unit }}
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    v-if="
                                        value &&
                                        value.equipment &&
                                        value.equipment.details &&
                                        value.equipment.details.length
                                    "
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Equipment Requested
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li
                                            v-for="(item, index) in value
                                                .equipment.details"
                                            :key="index"
                                        >
                                            <strong>{{
                                                item.equipmentName
                                            }}</strong>
                                            ({{
                                                item.description ||
                                                "No description"
                                            }}) - Quantity:
                                            {{ item.requestedQuantity }}
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    v-if="
                                        value &&
                                        value.reagents &&
                                        value.reagents.details &&
                                        value.reagents.details.length
                                    "
                                    class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-gray-800"
                                    >
                                        Reagents Requested
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-2 text-gray-700"
                                    >
                                        <li
                                            v-for="(item, index) in value
                                                .reagents.details"
                                            :key="index"
                                        >
                                            <strong>{{
                                                item.chemicalName
                                            }}</strong>
                                            ({{
                                                item.description ||
                                                "No description"
                                            }}) - Quantity:
                                            {{ item.requestedQuantity }}
                                            {{ item.unit }}
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    class="rounded-lg border border-blue-200 bg-blue-50 p-6"
                                >
                                    <h2
                                        class="mb-4 text-xl font-semibold text-blue-800"
                                    >
                                        Submission Reminders
                                    </h2>
                                    <ul
                                        class="list-inside list-disc space-y-3 text-blue-700"
                                    >
                                        <li>
                                            Please be sure to review your
                                            request in the previous steps
                                            carefully before submitting.
                                        </li>
                                        <li>
                                            After submitting, be sure to inform
                                            your assigned teacher in charge of
                                            your submission.
                                        </li>
                                        <li>
                                            If submission does not work, please
                                            double-check if all markers in each
                                            reservation in the Laboratory
                                            Setting are checked. If not, please
                                            choose valid times.
                                        </li>
                                        <li>
                                            If all else fails, you may download
                                            the official forms at this
                                            <a
                                                class="cursor-pointer font-semibold text-blue-600 underline hover:text-blue-800"
                                                @click="downloadOrdinaryPDF"
                                                >link</a
                                            >
                                            and fill them out physically.
                                        </li>
                                    </ul>
                                </div>

                                <div class="mt-8">
                                    <FormKit
                                        type="checkbox"
                                        label="Download a copy of my request"
                                        name="download"
                                        :value="false"
                                        label-class="text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- using step slot for submit button-->
                        <template #stepNext>
                            <FormKit
                                type="submit"
                                label="Submit Request"
                                input-class="!bg-blue-600 !hover:bg-blue-700"
                            />
                        </template>
                    </FormKit>
                </FormKit>
            </FormKit>
        </div>
    </div>
</template>

<style>
.formkit-outer[data-type="multi-step"] > .formkit-wrapper {
    max-width: 100%;
    width: 100%;
}
.formkit-form {
    width: 100%;
}

.formkit-steps {
    display: flex;
    justify-content: center;
}
</style>
