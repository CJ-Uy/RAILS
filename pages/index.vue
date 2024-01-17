<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Home",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END

// AUTH FUNCTIONS
const { status, signOut } = useAuth();
const { data } = await useFetch("/api/user/me");
// AUTH FUNCTIONS END

// EMAIL FUNCTIONS
const gmailRes = ref();
// EMAIL FUNCTIONS END
</script>

<template>
    <div
        class="flex h-screen items-start justify-start bg-[url('/images/01.png')] bg-cover bg-center"
    >
        <div class="ml-14 mt-[255px]">
            <h1 class="font-gilroy-extrabold text-9xl font-bold text-gray-800">
                SIGN UP NOW
            </h1>
            <p class="text-3xl text-gray-800">
                Welcome to the PSHS-EVC<br />Online Laboratory Reservation
                System
            </p>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: "Gilroy-ExtraBold";
    src: url("~/assets/fonts/Gilroy-ExtraBold.otf");
}

.font-gilroy-extrabold {
    font-family: "Gilroy-ExtraBold", sans-serif;
}
</style>
