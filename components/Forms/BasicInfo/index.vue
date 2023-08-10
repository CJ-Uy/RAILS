<script setup>
const user = ref(inject("user"));

// ----- Dynamic Selections -----
const schoolYear = await useFetch("/api/db/forms/getCurrentSchoolYear");
const schoolYearOptions = ref(makeSelectionOptions(schoolYear));

// Grade Sections
const gradeSections = await useFetch("/api/db/forms/getAllGradeSections");
const gradeSectionsOptions = ref(makeSelectionOptions(gradeSections));

// Units
const units = await useFetch("/api/db/forms/getAllUnits");
const unitsOptions = ref(makeSelectionOptions(units));

// Teachers
const teachers = await useFetch("/api/db/forms/getAllTeachers");
const teachersOptions = ref(makeSelectionOptions(teachers));

function makeSelectionOptions(response) {
    const options = [];
    for (const key in response.data.value) {
        options.push({
            label: response.data.value[key],
            value: key,
        });
    }
    return options;
}
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
            help="Enter the PSHS Campus"
        />
        <!-- TODO: Make the School year dynamic based on database -->
        <!-- You dodnt even need to send this just show it in the form -->
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
        />
        <FormKit
            v-model="user.firstName"
            type="text"
            label="Firstname"
            name="firstname"
            validation="required"
        />
        <FormKit
            v-model="user.email"
            type="email"
            label="Email"
            name="email"
            validation="required"
        />
        <FormKit
            type="select"
            label="Grade and Section"
            name="gradeSection"
            placeholder="Select a Grade and Section"
            validation="required"
            :options="gradeSectionsOptions"
        />
        <FormKit
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
            type="select"
            name="teacherInCharge"
            label="Teacher in Charge"
            placeholder="Select a Teacher"
            validation="required"
            :options="teachersOptions"
            help="NOTE: if your teacher is not within the options below please fill
            out a hardcopy form manually instead an go through the usual
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
