<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup></script>

<template>
    <div>
        <h1>LABORATORY REQUESTS</h1>
        <NuxtLink
            to="/protected"
            class="text-blue-500 hover:underline active:text-green-500"
            >RETURN</NuxtLink
        >

        <FormKit type="form" :actions="false">
            <FormKit type="multi-step" tab-style="progress">
                <FormKit type="step" name="basicInfo">
                    <FormsBasicInfo />
                </FormKit>

                <FormKit type="step" name="materialsRequest">
                    <!-- component for example brevity. -->
                    <FormsMaterialsRequest />
                </FormKit>

                <FormKit type="step" name="reagentRequest">
                    <!-- component for example brevity. -->
                    <FormsSummarize />

                    <!-- using step slot for submit button-->
                    <template #stepNext>
                        <FormKit type="submit" />
                    </template>
                </FormKit>
            </FormKit>
        </FormKit>
    </div>
</template>

<style scoped></style>
