<script setup lang="ts">
// Initialize state variables
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();

// Get user identity
/*
    Not that state varaibles can be changed by the user, so be sure to query "/api/user/me"
    for when validity of the information is important (e.g. sending them to their respective dashboards)
*/
const { data } = await useFetch("/api/user/me");

// Set state variables based on user identity, this is so it can auto populate forms but still be changeable
// Don't mind the errors regarding interface mismatch
accountEmail.value = data.value?.email;
accountFirstName.value = data.value?.firstName;
accountLastName.value = data.value?.lastName;

switch (String(data.value?.role)) {
    case "STUDENT":
        await navigateTo("/student");
        break;
    case "TEACHER":
        await navigateTo("/teacher");
        break;
    case "ADMIN":
        await navigateTo("/admin");
        break;
}
</script>

<template>
    <div>
        <h1>Redirecting...</h1>
        <p>Please wait</p>
    </div>
</template>
