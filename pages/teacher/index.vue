<script setup>
useHead({
    title: "EVC LABS Teacher | Dashboard",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role == "STUDENT") {
    await navigateTo("/student");
}

// Initialize state variables
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();

// Set state variables based on user identity, this is so it can auto populate forms but still be changeable
accountEmail.value = data.value?.email;
accountFirstName.value = data.value?.firstName;
accountLastName.value = data.value?.lastName;
</script>

<template>
    <div>
        <h1>TEACHER PAGE</h1>
    </div>
</template>

<style scoped>

</style>