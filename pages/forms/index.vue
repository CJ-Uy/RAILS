<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
// PAGE META
useHead({
    title: "EVC LABS | New Request",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "forms-pages" });
const user = inject("user");

const value = ref();

// TODO: Add error management
async function submitHandler(formValues) {
    // Save response to database
    // TODO: Format formValues to remove useless data (Lab Settings) - Add also a note that all their other requests will be duplicated for those days listed.
    const requestId = await useFetch("/api/forms/save-requests", {
        method: "POST",
        body: { user, formValues },
    });

    // Downloaing pdfs
    if (formValues.data.submission.download) {
        try {
            const requestedForms = [];
            if (
                formValues.data.laboratorySetting.hasLaboratoryReservation ===
                "false"
            ) {
                requestedForms.push(5);
            }
            if (formValues.data.reagents.details.length > 0) {
                requestedForms.push(19);
            }
            if (
                formValues.data.materials.details.length > 0 ||
                formValues.data.equipment.details.length > 0
            ) {
                requestedForms.push(20);
            }

            const pdfBuffers_rawData = await useFetch(
                "/api/forms/create-pdf-buffers",
                {
                    method: "POST",
                    body: {
                        id: requestId.data.value,
                        requestedForms,
                    },
                },
            );
            const pdfBuffers = pdfBuffers_rawData.data.value;

            try {
                downloadRequests(pdfBuffers, user.lastName);
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
}

function downloadRequests(pdfBuffers, lastname) {
    for (const property in pdfBuffers) {
        const buffer = pdfBuffers[property].data;
        const url = window.URL.createObjectURL(
            new Blob([new Uint8Array(buffer).buffer]),
        );
        const link = document.createElement("a");
        link.href = url;
        const filename = `${lastname}-${property}-Request.pdf`;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
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
                        <pre>
                            {{ value }}
                        </pre>
                        <h2 class="mb-3">
                            NOTE: Selecting more options may increase your wait
                            time
                        </h2>
                        <FormKit
                            type="checkbox"
                            label="Download a copy of my request"
                            name="download"
                            value="false"
                        />

                        <FormKit
                            type="checkbox"
                            label="Email a copy of my request"
                            name="email"
                            value="false"
                        />

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
