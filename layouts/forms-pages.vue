<script setup>
// Get user info from session
let user;
try {
    user = await useFetch("/api/user/me");
} catch (error) {
    // Error handling
    console.log(error);
    await navigateTo("/redirect");
}
// Make user info available to children pages through provide/inject (so that they dont have to request it again)
provide("user", user.data.value);
</script>

<template>
    <div>
        <slot />
    </div>
</template>
