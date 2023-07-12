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
    <div class="flex h-screen flex-row">
        <div
            class="flex basis-[60%] items-center justify-center bg-primary-100"
        >
            <LoginLeftSide />
        </div>
        <div
            class="flex w-[40%] basis-auto flex-col items-center justify-center bg-white"
        >
            <h1 class="font-bold">SIGN IN</h1>
            <button
                @click="signIn('google')"
                class="flex h-[8%] w-[40%] items-center justify-center rounded border-2 border-secondary-100 bg-primary-100 text-white hover:bg-primary-200"
            >
                <Icon
                    class="h-[100%] w-[30%] bg-white p-3"
                    name="logos:google-icon"
                />
                <div class="w-[70%] p-2">Sign In with EVC</div>
            </button>
        </div>
    </div>
</template>
