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
        <h1 class="font-bold">SIGN IN PAGE</h1>
        <button
            class="rounded bg-primary px-4 py-2 font-bold text-offWhite"
            @click="signIn('google')"
        >
            <Icon class="bg-offWhite" name="logos:google-icon" />
            Sign In With Google
        </button>
    </div>
</template>
