<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | About",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div
        class="flex h-screen items-center justify-center bg-cover bg-center"
        style="background-image: url(&quot;/images/01.png&quot;)"
    >
        <div class="ml-14 text-center" style="margin-top: -190px">
            <p class="max-w-700 text-3xl text-gray-800">
                The PSHS-EVC provides its scholars with state-of-the-art
                facilities and high-caliber equipment <br />
                to hone their scientific proficiency and technological
                applications with the aim of producing <br />
                globally-competent leaders and professionals.
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

<style scoped>
body {
    overflow: hidden; /* Hide scrollbars */
}
</style>
