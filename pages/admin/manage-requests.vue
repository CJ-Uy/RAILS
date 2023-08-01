<script setup>
useHead({
    title: "EVC LABS | Requests Management",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");

</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | REQUEST MANAGEMENT" />

        <UContainer class="w-auto md:w-1/2">
            <UCard>
                <template #header>
                    <h2>Form Approval Settings</h2>
                </template>

                <UserAdminSaveSignature />
            </UCard>
            <UCard>
                <template #header>
                    <h2>Form Input Settings</h2>
                </template>
                <p>
                    Here the change for each value is placed like the section laboratories and stuff
                </p>
            </UCard>
        </UContainer>
    </div>
</template>
