<script setup>
useHead({
    title: "EVC LABS Teacher | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "teacher-pages" });
const user = inject("user");

// Initialize state variables
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();

// Set state variables based on user identity, this is so it can auto populate forms but still be changeable
accountEmail.value = user.email;
accountFirstName.value = user.firstName;
accountLastName.value = user.lastName;
</script>

<template>
    <div>
        <h1>TEACHER PAGE</h1>
    </div>
</template>

<style scoped>

</style>