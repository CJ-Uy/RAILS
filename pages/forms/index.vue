<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
async function submitHandler(formValues) {
    try {
        const pdfBuffers_rawData = await useFetch(
            "/api/forms/process-request",
            {
                method: "POST",
                body: formValues,
            }
        );

        const pdfBuffers = pdfBuffers_rawData.data.value;

        try {
            console.log("Trying to donwload pdfs...");
            for (let i = 0; i < pdfBuffers.length; i++) {
                let buffer = pdfBuffers[i].data;
                console.log(buffer);

                const url = window.URL.createObjectURL(
                    new Blob([new Uint8Array(buffer).buffer])
                );
                const link = document.createElement("a");
                link.href = url;
                const filename = `request${i}.pdf`;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();

            }
        } catch (error) {
            console.error("PDF generation failed:", error);
        }

        // await navigateTo({
        //     path: "/forms/success",
        // });
    } catch (error) {
        requestStatus.value = "ERROR";
        console.error("Error submitting form: ", error);

        await navigateTo({ path: "/forms/error", query: { error: error } });
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
            @submit="submitHandler"
        >
            <FormKit
                v-slot="{ value }"
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

                <FormKit type="step" name="summary">
                    <pre>
                        {{ value }}
                    </pre>

                    <!-- using step slot for submit button-->
                    <template #stepNext>
                        <FormKit type="submit" label="Submit" />
                    </template>
                </FormKit>
            </FormKit>
        </FormKit>
    </div>
</template>
