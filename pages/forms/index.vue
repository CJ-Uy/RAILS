<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
import downloadPDF from "~/utils/forms/downloadPDF.js";

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
        try {
            const pdfBuffers_rawData = await useFetch(
                "/api/forms/create-pdf-buffers",
                {
                    method: "POST",
                    body: {
                        id: requestId.data.value,
                    },
                },
            );
            const pdfBuffers = pdfBuffers_rawData.data.value;

            try {
                downloadPDF(pdfBuffers[0], pdfBuffers[1]);
            } catch (error) {
                console.error(
                    "There was an error downloading the pdf: ",
                    error,
                );
            }
        } catch (error) {
            console.error("There was an error creating the pdf: ", error);
        }
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
                        <div class="mx-[20%]">
                            <h1 class="mb-5 text-3xl text-light-primary">
                                SUBMISSION REMINDERS
                            </h1>
                            <ul class="mb-5 list-disc space-y-2 pl-5 text-lg">
                                <li>
                                    Please be sure to review your request in the
                                    previous steps carefully before submitting.
                                </li>
                                <li>
                                    After submitting, be sure to inform your
                                    assigned teacher in charge of your
                                    submission.
                                </li>
                                <li>
                                    If submission does not work, please
                                    double-check if all markers in each
                                    reservation in the Laboratory Setting are
                                    checked. If not, please choose valid times.
                                </li>
                                <li>
                                    If all fails you may download the official
                                    forms at this
                                    <a
                                        class="cursor-pointer text-light-primary underline hover:text-accent-500 active:text-accent-300"
                                        @click="downloadOrdinaryPDF"
                                        >link</a
                                    >
                                    and fill them out physically.
                                </li>
                            </ul>

                            <FormKit
                                type="checkbox"
                                label="Download a copy of my request"
                                name="download"
                                value="false"
                            />
                        </div>

                        <!-- <FormKit
                            type="checkbox"
                            label="Email a copy of my request"
                            name="email"
                            value="false"
                        /> -->

                        <!-- using step slot for submit button-->
                        <template #stepNext>
                            <FormKit type="submit" label="Submit" />
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
