<!-- eslint-disable camelcase -->
<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup>
import { useDownloader } from '~/composables/useDownloader';
const { loading, loadingMessage, download } = useDownloader();

// PAGE META
useHead({
    title: "EVC LABS | New Request",
});

// authentication and the navbar is added through the layout
definePageMeta({ layout: "forms-pages" });
const user = inject("user");

async function redirectToDashboard() {
    await navigateTo("/student");
}
const revisionId = useRevisionId().value;
if (revisionId === undefined) {
    redirectToDashboard();
}

const revisedRequest = ref();
const value = ref({});
const reviseMaterial = ref(false);
const reviseLaboratory = ref(false);
const reviseReagent = ref(false);
const reviseEquipment = ref(false);
const materialRequestsAnnotation = ref();
const reagentRequestsAnnotation = ref();
const equipmentRequestsAnnotation = ref();
const laboratoryReservationsAnnotation = ref();
function setInitialValueToRequest() {
    value.value = {
        basicInfo: {
            concurrentTopic: revisedRequest.value.concurrentTopic,
            gradeSection: revisedRequest.value["gradeSection-id"],
            unit: revisedRequest.value.unitId,
            subject: revisedRequest.value.forSubject,
            teacherInCharge: revisedRequest.value["teacherInCharge-id"],
            numberOfStudents: revisedRequest.value.noOfStudents.toString(),
            nameOfStudents: revisedRequest.value.otherGroupMembers,
        },
    };
}
async function getRevisedRequest() {
    const request = await useFetch("/api/user/student/getRequest", {
        method: "POST",
        body: {
            requestId: revisionId,
        },
    });
    revisedRequest.value = request.data.value[0];

    if (
        revisedRequest.value.laboratoryReservationsTeacherApproval ===
            "REVISION_NEEDED" ||
        revisedRequest.value.laboratoryReservationsAdminApproval ===
            "REVISION_NEEDED"
    ) {
        reviseLaboratory.value = true;
    }
    if (
        revisedRequest.value.materialRequestsTeacherApproval ===
            "REVISION_NEEDED" ||
        revisedRequest.value.materialRequestsAdminApproval === "REVISION_NEEDED"
    ) {
        reviseMaterial.value = true;
    }
    if (
        revisedRequest.value.reagentRequestsTeacherApproval ===
            "REVISION_NEEDED" ||
        revisedRequest.value.reagentRequestsAdminApproval === "REVISION_NEEDED"
    ) {
        reviseReagent.value = true;
    }
    if (
        revisedRequest.value.equipmentRequestsTeacherApproval ===
            "REVISION_NEEDED" ||
        revisedRequest.value.equipmentRequestsAdminApproval ===
            "REVISION_NEEDED"
    ) {
        reviseEquipment.value = true;
    }

    // Material Revisions
    if (
        revisedRequest.value.materialRequestsTeacherApproval ===
        "REVISION_NEEDED"
    ) {
        materialRequestsAnnotation.value =
            revisedRequest.value.materialRequestsTeacherAnnotation;
    } else if (
        revisedRequest.value.materialRequestsAdminApproval === "REVISION_NEEDED"
    ) {
        materialRequestsAnnotation.value =
            revisedRequest.value.materialRequestsAdminAnnotation;
    }
    // Laboratory Revisions
    if (
        revisedRequest.value.laboratoryReservationsTeacherApproval ===
        "REVISION_NEEDED"
    ) {
        laboratoryReservationsAnnotation.value =
            revisedRequest.value.laboratoryReservationsTeacherAnnotation;
    } else if (
        revisedRequest.value.laboratoryReservationsAdminApproval ===
        "REVISION_NEEDED"
    ) {
        laboratoryReservationsAnnotation.value =
            revisedRequest.value.laboratoryReservationsAdminAnnotation;
    }
    // Reagent Revisions
    if (
        revisedRequest.value.reagentRequestsTeacherApproval ===
        "REVISION_NEEDED"
    ) {
        reagentRequestsAnnotation.value =
            revisedRequest.value.reagentRequestsTeacherAnnotation;
    } else if (
        revisedRequest.value.reagentRequestsAdminApproval === "REVISION_NEEDED"
    ) {
        reagentRequestsAnnotation.value =
            revisedRequest.value.reagentRequestsAdminAnnotation;
    }
    // Equipment Revisions
    if (
        revisedRequest.value.equipmentRequestsTeacherApproval ===
        "REVISION_NEEDED"
    ) {
        equipmentRequestsAnnotation.value =
            revisedRequest.value.equipmentRequestsTeacherAnnotation;
    } else if (
        revisedRequest.value.equipmentRequestsAdminApproval ===
        "REVISION_NEEDED"
    ) {
        equipmentRequestsAnnotation.value =
            revisedRequest.value.equipmentRequestsAdminAnnotation;
    }
    setInitialValueToRequest();
}
getRevisedRequest();

// TODO: Add error management
async function submitHandler(formValues) {
    // Save response to database
    const requestId = await useFetch("/api/forms/revise-requests", {
        method: "POST",
        body: { user, formValues, revisedRequest: revisedRequest.value },
    });
    // Downloaing pdfs
    if (formValues.data.submission.download === true) {
            download(formValues.data.submission.id);
        }

    await navigateTo("/student");

    // // Emailing pdfs
    // if (formValues.data.submission.email) {
    //     // TODO: Make it so they send the info to their email
    // }
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
                        v-show="revisedRequest !== undefined"
                        type="step"
                        name="basicInfo"
                        :classes="{ step: 'md:w-1/2' }"
                    >
                        <RevisionBasicInfo />
                    </FormKit>

                    <FormKit
                        v-show="reviseLaboratory"
                        type="step"
                        name="laboratorySetting"
                        :classes="{ step: 'md:w-1/2' }"
                    >
                        <div>
                            <UTextarea
                                v-model="laboratoryReservationsAnnotation"
                                disabled
                            />
                        </div>
                        <br />
                        <RevisionLaboratoryReservation />
                    </FormKit>

                    <FormKit
                        v-show="reviseMaterial"
                        type="step"
                        name="materials"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <div>
                            <UTextarea
                                v-model="materialRequestsAnnotation"
                                disabled
                            />
                        </div>
                        <br />
                        <RevisionMaterialRequest />
                    </FormKit>

                    <FormKit
                        v-show="reviseEquipment"
                        type="step"
                        name="equipment"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <div>
                            <UTextarea
                                v-model="equipmentRequestsAnnotation"
                                disabled
                            />
                        </div>
                        <br />
                        <RevisionEquipmentRequest />
                    </FormKit>

                    <FormKit
                        v-show="reviseReagent"
                        type="step"
                        name="reagents"
                        :classes="{ step: 'md:w-full' }"
                    >
                        <div>
                            <UTextarea
                                v-model="reagentRequestsAnnotation"
                                disabled
                            />
                        </div>
                        <br />
                        <RevisionReagentRequest />
                    </FormKit>

                    <FormKit
                        v-show="revisedRequest !== undefined"
                        type="step"
                        name="submission"
                    >
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
