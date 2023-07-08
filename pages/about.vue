<script setup lang="ts">
// PAGE META
useHead({
  title: "PSHS-EVC LABS | About",
})

definePageMeta({ auth: false }); // This allows the page to be seen by "Authenticated" and "Unauthenticated" users
// PAGE META END
</script>

<template>
    <div>
        <LandingNavbar />
        <h1>
            This is the about Page
        </h1>
    </div>
</template>
