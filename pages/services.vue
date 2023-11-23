<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Services",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div>
        <NuxtImg
            format="webp"
            src="../public/images/02.png"
            alt="PSHS-EVC LABS"
            class="w-full"
        />
    </div>
</template>
