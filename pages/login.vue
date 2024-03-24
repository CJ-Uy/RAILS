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
            class="flex basis-[50%] flex-col items-center justify-center text-center text-white"
        >
            <NuxtImg
                src="/images/loginArt.png"
                format="webp"
                class="h-full md:h-screen"
            />
        </div>
        <div
            class="md:h[100%] flex basis-[50%] flex-col items-center justify-center bg-white"
        >
            <UCard class="mt-10 w-[80%] text-center md:mt-0">
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
                <template #footer>
                    <p class="mx-10 text-center text-lg">
                        We use the EVC email as proof you are a bonfide student.
                        Hence, if you do not have an EVC email or cannot access
                        it, you will not be able to use this service.
                    </p>
                </template>
            </UCard>
            <p class="mx-20 mt-5 text-center text-lg">
                However, as this website is not yet official, it's sign in
                through EVC is currently blocked by Google. Hence,
                <span class="text-red-500">
                    please actually use any personal account with a @gmail.com
                    email to sign in.
                </span>
            </p>
        </div>
    </div>
</template>
