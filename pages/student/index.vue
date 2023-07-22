<script setup>
useHead({
    title: "EVC LABS | Dashboard",
});
const { data } = await useFetch("/api/user/me");
if (data.value.role === "TEACHER") {
    await navigateTo("/teacher");
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
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserStudentNavbar />
        </div>
        <div class="basis-auto">
            <h1>STUDENT DASHBOARD PAGE</h1>
        </div>
    </div>
</template>

<style scoped></style>
