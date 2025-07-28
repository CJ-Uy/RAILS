<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
import { useDownloader } from '~/composables/useDownloader';
const { loading, loadingMessage, download } = useDownloader();

// PAGE META
useHead({
    title: "EVC LABS | New Request",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "forms-pages" });
const user = inject("user");

const value = ref();

async function submitHandler(formValues) {
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
                        <FormsLaboratoryReservation />
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
                                    reminders below before submitting.
                                </p>

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
