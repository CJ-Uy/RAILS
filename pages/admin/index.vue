<script setup>
useHead({
    title: "EVC LABS | Admin Dashboard",
});

// authentication and the navbar is addedd through the layout
definePageMeta({ layout: "admin-pages" });
const user = inject("user");

// TODO: remove these and just use the /api/user/me apply to forms too
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
        <UserDashboardHeader title="ADMIN | DASHBOARD" />
    </div>
</template>
