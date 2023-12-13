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
        label: "SY & Campus",
        slot: "syCampus",
    },
    {
        label: "Grades & Sections",
        slot: "gradeSection",
    },
    {
        label: "Units & Teachers",
        slot: "unitsTeachers",
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
                <template #syCampus>
                    <UserAdminEditFormsSyCampus />
                </template>
                <template #gradeSection>
                    <UserAdminEditFormsGradeSection />
                </template>
                <template #unitsTeachers>
                    <UserAdminEditFormsUnits />
                </template>
            </UTabs>
        </UContainer>
    </div>
</template>
