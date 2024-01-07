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
    <div>
        <NuxtImg
            format="webp"
            src="/images/03.png"
            alt="PSHS-EVC LABS"
            class="w-full"
        />
    </div>
</template>

<style>
body {
    overflow: hidden; /* Hide scrollbars */
}
</style>
