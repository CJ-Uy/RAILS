<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
const submitted = ref(false);
const requestStatus = ref("Loading...");

async function submitHandler(formValues) {
    requestStatus.value = await useFetch("/api/forms/process-request", {
        method: "POST",
        body: formValues,
    });
}
</script>

<template>
    <div>
        <h1>LABORATORY REQUESTS</h1>
        <NuxtLink
            to="/protected"
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
        <div v-if="submitted">
            <h2>{{ requestStatus }}</h2>
        </div>
    </div>
</template>
