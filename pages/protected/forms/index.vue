<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
const submitted = ref(false);
const isFormValid = async (value) => {
    console.log("checking form");
    return true;
};

const submitHandler = async (value) => {
    submitted.value = true;
    console.log("submitting...");
};
</script>

<template>
    <div>
        <h1>LABORATORY REQUESTS</h1>
        <NuxtLink
            to="/protected"
            class="text-blue-500 hover:underline active:text-green-500"
            >RETURN</NuxtLink
        >

        <FormKit v-slot="{ value }" type="multi-step" tab-style="progress">
            <pre>
                {{ value }}
            </pre>
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
                <FormsSummarize />

                <!-- using step slot for submit button-->
                <template #stepNext>
                    <FormKit
                        type="submit"
                        label="Submit"
                        :disabled="!isFormValid(value)"
                        @click="submitHandler(value)"
                    />
                </template>
            </FormKit>
        </FormKit>
        <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div>
    </div>
</template>
