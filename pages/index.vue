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
    <div class="flex items-start justify-start">
        <div class="ml-14 flex flex-col justify-center md:h-[85vh]">
            <h1 class="font-gilroy-extrabold text-9xl font-bold text-gray-800">
                SIGN UP NOW
            </h1>
            <p class="text-3xl text-gray-800">
                Welcome to the PSHS-EVC<br />Online Laboratory Reservation
                System
            </p>
            <NuxtImg
                src="/images/seal.png"
                format="webp"
                class="w-[50%] md:w-[30%]"
            />
            <p class="mb-20 w-[80%] text-justify text-gray-400">
                This website is owned and operated by the Philippine Science
                High School - Eastern Visayas Campus (PSHS-EVC). The views,
                opinions, and content presented on this website are solely those
                of the authors and contributors and do not necessarily reflect
                the official policy or position of PSHS-EVC. While we strive to
                ensure the accuracy and reliability of the information provided,
                we make no representations or warranties of any kind, express or
                implied, about the completeness, accuracy, reliability,
                suitability, or availability with respect to the website or the
                information, products, services, or related graphics contained
                on the website for any purpose.
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
