<template>
        <h1 class="text-3xl font-bold text-green-500">GOOGLE SIGN IN</h1>
        <button v-if="!isSignedIn" @click="handleSignIn">Sign In</button>
        <button v-else @click="handleSignOut">Sign Out</button>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth();

const isSignedIn = computed(() => status.value === 'authenticated'); //authenticated, loading, or unauthenticated ONLY

async function handleSignIn() {
    await signIn();
}
async function handleSignOut() {
    await signOut();
}

</script>