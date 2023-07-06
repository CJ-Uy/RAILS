<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/protected", // TODO: Find a way to redirect to different pages based on the user's ROLE
    },
});

const { signIn } = useAuth();
</script>

<template>
    <div class="bg-offWhite">
        <LoginLeftSide />
        <div class="bg-slate-500">
            <h1 class="font-bold">SIGN IN PAGE</h1>
            <div class="align-center min-w-500 flex h-12 w-1/6">
                <div class="align-center h-12 w-1/6 bg-white text-center">
                    <Icon class="ml-2 mr-2 mt-3 h-6" name="logos:google-icon" />
                </div>
                <button
                    class="h-12 w-5/6 flex-auto bg-primary text-offWhite"
                    @click="signIn('google')"
                >
                    Sign In With Google
                </button>
            </div>
        </div>
    </div>
</template>
