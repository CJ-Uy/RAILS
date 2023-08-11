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

        <UContainer class="w-auto md:w-1/2">
            <UCard>
                <template #header>
                    <h2>Form Approval Settings</h2>
                </template>

                <UserAdminSaveSignature />
            </UCard>
            <UCard class="mt-5">
                <template #header>
                    <h2>Form Input Settings</h2>
                </template>
                <p>
                    Change request form inputs in this section.
                </p>
                <div>
                    <UserAdminEditForms />
                </div>
            </UCard>
        </UContainer>
    </div>
</template>
