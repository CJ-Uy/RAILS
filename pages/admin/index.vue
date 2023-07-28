<script setup>
useHead({
    title: "EVC LABS | Admin Dashboard",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role === "STUDENT") {
    await navigateTo("/student");
} else if (data.value.role === "TEACHER") {
    await navigateTo("/teacher");
}

// TODO: remove these and just use the /api/user/me apply to forms too
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
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="flex basis-[84.723854%] flex-col">
            <h1>ADMIN DASHBOARD PAGE</h1>
        </div>
    </div>
</template>

<style scoped></style>
