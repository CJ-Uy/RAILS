<script setup>
useHead({
    title: "EVC LABS | Edit Forms",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");

// Tabs
const editFormsTabs = [
    {
        label: "Locations",
        slot: "locations",
    },
    {
        label: "SY & Campus",
        slot: "syCampus",
    },
    {
        label: "Grades & Sections",
        slot: "gradeSection",
    },
    {
        label: "Units",
        slot: "units",
    },
];
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | FORM DATA" />
        <UContainer>
            <UTabs
                :items="editFormsTabs"
                :ui="{ list: { tab: { active: 'bg-white' } } }"
            >
                <template #locations>
                    <UserAdminEditFormsLocations />
                </template>
                <template #syCampus>
                    <UserAdminEditFormsSyCampus />
                </template>
                <template #gradeSection>
                    <UserAdminEditFormsGradeSection />
                </template>
                <template #units>
                    <UserAdminEditFormsUnits />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>
