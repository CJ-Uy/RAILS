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
    <div class="bg-cover bg-center h-screen flex items-center justify-center" style="background-image: url('/images/01.png');">
        <div class="ml-14 text-center" style="margin-top: -190px;">
            <p class="text-3xl text-gray-800 max-w-700">
          The PSHS-EVC provides its scholars with state-of-the-art facilities and high-caliber equipment <br> to hone their scientific proficiency and technological applications with the aim of producing <br> globally-competent leaders and professionals.
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

<style>
body {
    overflow: hidden; /* Hide scrollbars */
}
</style>
