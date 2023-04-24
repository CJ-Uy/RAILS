<template>
    <div>
        <button v-if="!loggedIn" @click="handleSignIn">Sign In</button>
        <button v-else @click="handleSignOut">Sign Out</button>
    </div>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth()

const loggedIn = computed(() => status.value === 'authenticated') //authenticated, loading, or unauthenticated

async function handleSignIn() {
    await signIn()
}
async function handleSignOut() {
    await signOut()
}

</script>