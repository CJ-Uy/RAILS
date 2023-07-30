<script setup>
useHead({
    title: "EVC LABS | Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "student-pages" });
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
        <h1>STUDENT DASHBOARD PAGE</h1>
    </div>
</template>
