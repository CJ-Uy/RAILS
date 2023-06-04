<script setup lang="ts">
definePageMeta({ auth: false });

const { status, signOut } = useAuth();
const { data } = await useFetch("/api/user/me");

const isSignedIn = computed(() => status.value === "authenticated"); // authenticated, loading, or unauthenticated ONLY

async function handleSignOut() {
    await signOut();
}

const gmailRes = ref();
const errors = ref();
async function sendEmail() {
    const { data } = await useFetch("/api/user/me");

    gmailRes.value = `Loading...Sending Email to ${data.value.user.email} This may take a minute or 2`;

    gmailRes.value = await useFetch("/api/send-email/test", {
        method: "POST",
        body: {
            name: String(data.value.user.name),
            email: String(data.value.user.email),
        },
    });
}
</script>

<template>
    <div class="absolute bg-gray-50">
        <h1 class="text-3xl font-bold text-green-500">GOOGLE SIGN IN</h1>
        <NuxtLink v-if="!isSignedIn" to="/login">
            <button
                class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Sign In
            </button>
        </NuxtLink>
        <button
            v-else
            class="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            @click="handleSignOut"
        >
            Sign Out
        </button>
        <p v-if="isSignedIn">
            DATA:
            {{ data }}
        </p>
        <div v-if="isSignedIn">
            <button
                class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                @click="sendEmail"
            >
                Send Email
            </button>
            <div v-if="gmailRes" class="min">
                Gmail Respose:
                <div>
                    {{ gmailRes }}
                </div>
            </div>
            <div v-if="errors" class="min">
                Error:
                <div>
                    {{ errors }}
                </div>
            </div>
        </div>
    </div>
</template>
