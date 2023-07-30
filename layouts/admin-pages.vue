<script setup>
// Get user info from session
let user;
try {
    user = await useFetch("/api/user/me");
} catch (error) {
    // Error handling
    console.log(error);
    await navigateTo("/login");
}


// Redirect if user has a wrong role
if (user.data.value.role === "STUDENT") {
    await navigateTo("/student");
} else if (user.data.value.role === "TEACHER") {
    await navigateTo("/teacher");
}

// Make user info available to children pages through provide/inject (so that they dont have to request it again)
provide("user", user.data.value);
</script>

<template>
    <div class="flex flex-row">
        <div class="flex basis-[15.276146%] flex-col">
            <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="basis-[84.723854%]">
            <slot v-if="user.data.value" />
        </div>
    </div>
</template>
