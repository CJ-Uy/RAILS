<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/protected", // This does not work for some reason
    },
});

const { signIn } = useAuth();
</script>

<template>
    <div>
        <h1>SIGN IN PAGE</h1>
        <button
            class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            @click="signIn('google')"
        >
            SIGN IN
        </button>
    </div>
</template>
