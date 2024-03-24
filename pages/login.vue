<script setup lang="ts">
useHead({
    title: "PSHS-EVC LABS | Login",
});

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/redirect",
    },
});

const { signIn } = useAuth();
</script>

<template>
    <div class="flex h-screen flex-col md:flex-row">
        <div
            class="flex basis-[50%] flex-col items-center justify-center bg-light-primary text-center"
        >
            <p class="mx-10 text-3xl text-white">
                We use the EVC email as proof you are a bonfide student. Hence,
                if you do not have an EVC email or cannot access it, you will
                not be able to use this service.
            </p>
            <p class="mx-10 mt-5 text-lg text-white">
                However, as this website is not yet official, it's sign in
                through EVC is currently blocked by Google. Hence, please use
                any personal account with a @gmail.com email to sign in.
            </p>
        </div>
        <div
            class="md:h[100%] flex basis-[50%] flex-col items-center justify-center bg-white"
        >
            <UCard class="w-[80%] text-center">
                <template #header>
                    <h1 class="text-3xl font-extrabold text-main-500">
                        SIGN IN TO RAILS
                    </h1>
                </template>
                <UButton
                    label="Sign in with Google"
                    icon="i-logos-google-icon"
                    color="gray"
                    size="xl"
                    padding="xl"
                    @click="signIn('google')"
                />
            </UCard>
        </div>
    </div>
</template>
