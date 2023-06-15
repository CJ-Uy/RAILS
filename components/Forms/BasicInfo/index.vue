<script setup>
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();
const schoolYear = useSchoolYear();
</script>

<template>
    <h1>BASIC INFORMATION</h1>

    <FormKit
        type="text"
        label="Campus"
        name="campus"
        validation="required"
        value="EASTERN VISAYAS CAMPUS"
        help="Enter the PSHS Campus"
    />
    <FormKit
        v-model="schoolYear"
        type="text"
        label="School Year"
        name="schoolYear"
        validation="required"
        help="Enter the PSHS Campus"
    />
    <FormKit
        v-model="accountLastName"
        type="text"
        label="Lastname"
        name="lastname"
        validation="required"
    />
    <FormKit
        v-model="accountFirstName"
        type="text"
        label="Firstname"
        name="firstname"
        validation="required"
    />
    <FormKit
        v-model="accountEmail"
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
        :options="[
            { label: 'G7 - Diamond', value: '7-Diamond' },
            { label: 'G7 - Emerald', value: '7-Emerald' },
            { label: 'G7 - Ruby', value: '7-Ruby' },
        ]"
    />
    <FormKit
        type="select"
        label="Unit"
        name="unit"
        placeholder="Select the Unit the subject/teacher is under"
        validation="required"
        :options="[
            { label: 'Chemistry Unit', value: 'chemUnit' },
            { label: 'Reasearch Unit', value: 'resUnit' },
            { label: 'Physics Unit', value: 'physUnit' },
        ]"
    />
    <FormKit type="text" label="Subject" name="subject" validation="required" />
    <FormKit
        type="text"
        label="Concurrent Topic"
        name="concurrentTopic"
        validation="required"
    />

    <!-- TODO: Make teacher in charge a select based on the current USERS with the role teacher -->
    <FormKit
        type="text"
        name="teacherInCharge"
        label="Teacher in Charge"
        validation="required"
    />

    <FormKit
        type="number"
        label="Number of Students"
        name="numberOfStudents"
        validation="required"
    />

    <!-- Turn the numberOfStudents into a prop and pass it into the StudentList also display how many students left to add -->
    <FormsBasicInfoStudentsList />
</template>
