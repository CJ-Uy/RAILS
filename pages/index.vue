<template>
    <div class="absolute bg-gray-50">
        <h1 class="text-3xl font-bold text-green-500">GOOGLE SIGN IN</h1>
        <button v-if="!isSignedIn" @click="handleSignIn" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
        <button v-else @click="handleSignOut" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
        <p v-if="isSignedIn">
            NAME:
            {{ token.user.name }}
            <br>
            EMAIL:
            {{ token.user.email }}
        </p>
        <button v-if="isSignedIn" @click="sendEmail" class="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Send Email</button>
    </div>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth();
const { data: token } = await useFetch("/api/me");

const isSignedIn = computed(() => status.value === 'authenticated'); //authenticated, loading, or unauthenticated ONLY

async function handleSignIn() {
    //Custom Sign In pages: https://sidebase.io/nuxt-auth/application-side/custom-sign-in-page
    await signIn("google");
}

async function handleSignOut() {
    await signOut();
}

async function sendEmail() {
    await useFetch("/api/send-email/test-email");
}

</script>
