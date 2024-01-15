<script setup>
useHead({
    title: "EVC LABS | Settings",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "student-pages" });

const { signOut } = useAuth();
async function handleSignOut() {
    await navigateTo("/");
    await signOut();
}
</script>

<template>
    <div>
        <UserDashboardHeader title="SETTINGS" />
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
