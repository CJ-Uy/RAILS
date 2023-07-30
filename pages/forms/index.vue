<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
// PAGE META
useHead({
    title: "EVC LABS | New Request",
});

const { data } = await useFetch("/api/user/me");

let value = ref();

async function submitHandler(formValues) {
    // Save response to database
    // const requestSaveStatus = await useFetch("/api/forms/save-requests", {
    //     method: "POST",
    //     body: { ...data.value, ...formValues },
    // });

    // Emailing pdfs
    if (formValues.requestData.submission.email) {
        // TODO: Make it so they send the info to their email
    }

    // Downloaing pdfs
    if (formValues.requestData.submission.download) {
        try {
            const pdfBuffers_rawData = await useFetch(
                "/api/forms/create-pdf-buffers",
                {
                    method: "POST",
                    body: formValues,
                },
            );
            const pdfBuffers = pdfBuffers_rawData.data.value;

            try {
                downloadRequests(
                    pdfBuffers,
                    formValues.requestData.basicInfo.lastname,
                );
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
</script>

<template>
    <div>
        <h1>LABORATORY REQUESTS</h1>
        <NuxtLink
            to="/redirect"
            class="text-blue-500 hover:underline active:text-green-500"
            >RETURN</NuxtLink
        >
        <FormKit
            type="form"
            :actions="false"
            name="requestData"
            use-local-storage
            @submit="submitHandler"
        >
            <FormKit
                v-model="value"
                type="multi-step"
                tab-style="progress"
                name="requestData"
            >
                <FormKit type="step" name="basicInfo">
                    <FormsBasicInfo />
                </FormKit>

                <FormKit type="step" name="laboratorySetting">
                    <FormsLaboratoryReservation />
                </FormKit>

                <FormKit type="step" name="materials">
                    <FormsMaterialsRequest />
                </FormKit>

                <FormKit type="step" name="reagents">
                    <FormsReagentsRequest />
                </FormKit>

                <FormKit type="step" name="submission">
                    <pre>
                        {{ value }}
                    </pre>
                    <!-- TODO: Maybe add something to show the progress of each request if it succeede or failed and if its loading -->
                    <h2>
                        NOTE: Selecting more options may increase your wait time
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
</template>
