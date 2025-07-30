<script setup>
import "@formkit/themes/genesis";

const user = ref(inject("user"));

const emit = defineEmits([
    "update:teacherInChargeName",
    "update:unitName",
    "update:gradeSectionName",
]);

const teacherInCharge = ref("");
const unit = ref("");
const gradeSection = ref("");

// ----- Dynamic Selections -----
const schoolYearOptions = ref(
    await makeSelectionOptions("/api/db/forms/getCurrentSchoolYear"),
);

// Grade Sections
const gradeSectionsOptions = ref(
    await makeSelectionOptions("/api/db/forms/getAllGradeSections"),
);

// Units
const unitsOptions = ref(
    await makeSelectionOptions("/api/db/forms/getAllUnits"),
);

// Teachers
const teachersOptions = ref(
    await makeSelectionOptions("/api/db/forms/getAllTeachers"),
);

async function makeSelectionOptions(url) {
    const response = await useFetch(url);
    const options = [];
    for (const key in response.data.value) {
        options.push({
            label: response.data.value[key],
            value: key,
        });
    }
    return options;
}

watch(teacherInCharge, (newVal) => {
    const selectedOption = teachersOptions.value.find(
        (option) => option.value === newVal,
    );
    if (selectedOption) {
        emit("update:teacherInChargeName", selectedOption.label);
    }
});

watch(unit, (newVal) => {
    const selectedOption = unitsOptions.value.find(
        (option) => option.value === newVal,
    );
    if (selectedOption) {
        emit("update:unitName", selectedOption.label);
    }
});

watch(gradeSection, (newVal) => {
    const selectedOption = gradeSectionsOptions.value.find(
        (option) => option.value === newVal,
    );
    if (selectedOption) {
        emit("update:gradeSectionName", selectedOption.label);
    }
});
</script>

<template>
    <div>
        <h2 class="py-5 text-center text-lg font-bold">BASIC INFORMATION</h2>

        <FormKit
            type="text"
            label="Campus"
            name="campus"
            validation="required"
            value="EASTERN VISAYAS CAMPUS"
            :disabled="true"
        />

        <FormKit
            v-model="schoolYearOptions"
            type="select"
            label="School Year"
            name="schoolYear"
            validation="required"
            help="If school year is wrong please inform the Laboratory Unit"
            :options="schoolYearOptions"
            :disabled="true"
        />
        <FormKit
            v-model="user.lastName"
            type="text"
            label="Lastname"
            name="lastname"
            validation="required"
            :disabled="true"
        />
        <FormKit
            v-model="user.firstName"
            type="text"
            label="Firstname"
            name="firstname"
            validation="required"
            :disabled="true"
        />
        <FormKit
            v-model="user.email"
            type="email"
            label="Email"
            name="email"
            validation="required"
            :disabled="true"
        />
        <FormKit
            v-model="gradeSection"
            type="select"
            label="Grade and Section"
            name="gradeSection"
            placeholder="Select a Grade and Section"
            validation="required"
            :options="gradeSectionsOptions"
        />
        <FormKit
            v-model="unit"
            type="select"
            label="Unit"
            name="unit"
            placeholder="Select the Unit the subject/teacher is under"
            validation="required"
            :options="unitsOptions"
        />
        <FormKit
            type="text"
            label="Subject"
            name="subject"
            validation="required"
        />
        <FormKit
            type="text"
            label="Concurrent Topic"
            name="concurrentTopic"
            validation="required"
        />

        <FormKit
            v-model="teacherInCharge"
            type="select"
            name="teacherInCharge"
            label="Teacher in Charge"
            placeholder="Select a Teacher"
            validation="required"
            :options="teachersOptions"
            help="NOTE: if your teacher is not within the options below please fill
            out a hard copy form manually instead an go through the usual
            process."
        />

        <FormKit
            type="number"
            label="Number of Students"
            name="numberOfStudents"
            validation="required"
        />

        <!-- Turn the numberOfStudents into a prop and pass it into the StudentList also display how many students left to add -->
        <FormsBasicInfoStudentsList />
    </div>
</template>

