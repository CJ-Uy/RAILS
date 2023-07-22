<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Home",
});

definePageMeta({ auth: false }); // This allows the page to be seen by "Authenticated" and "Unauthenticated" users
// PAGE META END

// AUTH FUNCTIONS
const { status, signOut } = useAuth();
const { data } = await useFetch("/api/user/me");

const isSignedIn = computed(() => status.value === "authenticated"); // authenticated, loading, or unauthenticated ONLY

async function handleSignOut() {
    await signOut();
}
// AUTH FUNCTIONS END

// EMAIL FUNCTIONS
const gmailRes = ref();
const errors = ref();
async function sendEmail() {
    const { data } = await useFetch("/api/user/me");

    gmailRes.value = `Loading...Sending Email to ${data.value.email} This may take a minute or 2`;

    gmailRes.value = await useFetch("/api/send-email/test", {
        method: "POST",
        body: {
            name: String(data.value.firstName).concat(" ", data.value.lastName),
            email: String(data.value.email),
        },
    });
}
// EMAIL FUNCTIONS END
</script>

<template>
    <div>
        <LandingNavbar />

        <h1 class="text-3xl font-bold text-green-500">GOOGLE SIGN IN</h1>

        <!-- CHANGE BASED ON LOGIN STATUS EXAMPLE -->
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
        <h1>
            {{ data }}
        </h1>
        <!-- CHANGE BASED ON LOGIN STATUS EXAMPLE END -->

        <!-- EMAIL COMPONENT EXAMPLE -->
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
        <!-- EMAIL COMPONENT EXAMPLE END-->
    </div>
</template>
