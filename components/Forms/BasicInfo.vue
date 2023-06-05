<template>
    <h1>BASIC INFORMATION</h1>
    <FormKit
        type="text"
        label="Campus"
        validation="required"
        value="EASTERN VISAYAS CAMPUS"
        help="Enter the PSHS Campus"
    />
    <FormKit type="text" label="Lastname" validation="required" />
    <FormKit type="text" label="Firstname" validation="required" />

    <FormKit
        type="select"
        label="Grade and Section"
        placeholder="Select a Grade and Section"
        validation="required"
        :options="[
            { label: 'G7 - Diamond', value: '7-Diamond' },
            { label: 'G7 - Emerald', value: '7-Emerald' },
            { label: 'G7 - Ruby', value: '7-Ruby' },
        ]"
    />

    <FormKit type="number" label="Number of Students" validation="required" />

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
</template>
