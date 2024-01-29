<script setup>
useHead({
    title: "EVC LABS | Admin Settings",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });

const { signOut } = useAuth();
async function handleSignOut() {
    await navigateTo("/");
    await signOut();
}
</script>

<template>
    <div>
        <UserDashboardHeader title="ADMIN | SETTINGS" />
        <UserAdminRequestsSaveSignature />
        <UserAdminBackups />
        <UContainer class="mt-10 flex w-full items-center justify-center">
            <UButton
                icon="i-ph-sign-out"
                label="Sign Out"
                variant="outline"
                color="red"
                @click="handleSignOut()"
            />
        </UContainer>
    </div>
</template>

<style scoped></style>
