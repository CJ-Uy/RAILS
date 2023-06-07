<script setup>
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();
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

    <FormKit type="text" label="Subject" validation="required" />
    <FormKit type="text" label="Concurrent Topic" validation="required" />
    <FormKit
        type="select"
        label="Unit"
        placeholder="Select the Unit the subject/teacher is under"
        validation="required"
        :options="[
            { label: 'Chemistry Unit', value: 'chemUnit' },
            { label: 'Reasearch Unit', value: 'resUnit' },
            { label: 'Physics Unit', value: 'physUnit' },
        ]"
    />
    <FormKit type="text" label="Teacher in Charge" validation="required" />

    <FormKit
        type="number"
        label="Number of Students"
        name="numberOfStudents"
        validation="required"
    />
    <FormsBasicInfoStudentsList />
</template>
