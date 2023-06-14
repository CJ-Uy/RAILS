<script setup lang="ts">
// Initialize state variables
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();
const accountName = useName();

// Get user identity
/*
    Not that state varaibles can be changed by the user, so be sure to query "/api/user/me"
    for when validity of the information is important (e.g. sending them to their respective dashboards)
*/
const { data } = await useFetch("/api/user/me");

// Set state variables based on user identity, this is so it can auto populate forms but still be changeable
// Don't mind the errors regarding interface mismatch
accountEmail.value = data.value?.user.email;
accountFirstName.value = data.value?.given_name;
accountLastName.value = data.value?.family_name;
accountName.value = data.value?.user.name;
</script>

<template>
    <div>
        <h1>Protected Page</h1>
        <p>This page is protected by auth middleware.</p>
        <NuxtLink to="/protected/forms">
            <h1 class="text-cyan-800 hover:underline active:text-green-500">
                GO TO FORMS
            </h1>
        </NuxtLink>
        <p>
            {{ accountEmail }}
            {{ accountFirstName }}
            {{ accountLastName }}
            {{ accountName }}
        </p>
    </div>
</template>
