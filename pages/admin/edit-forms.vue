<script setup>
useHead({
    title: "EVC LABS | Edit Forms",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | EDIT FORMS" />
        <UContainer>
            <UCard class="m-auto w-2/3">
                <template #header>
                    <h2 class="text-center">FORM APPROVAL SETTINGS</h2>
                </template>
                <UserAdminSaveSignature />
            </UCard>
            <div class="mt-10">
                <UserAdminEditFormsGradeSection />
            </div>
            <div class="mt-10">
                <UserAdminEditFormsUnits />
            </div>
            <div class="my-10">
                <UserAdminEditFormsLaboratories />
            </div>
        </UContainer>
    </div>
</template>
