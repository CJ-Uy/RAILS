<script setup lang="ts">
useHead({
    title: "Redirecting...",
});
// Get user identity
/*
    Not that state varaibles can be changed by the user, so be sure to query "/api/user/me"
    for when validity of the information is important (e.g. sending them to their respective dashboards)
*/
const { data } = await useFetch("/api/user/me");

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
        <!-- TODO: Style and or add a loading screen animation -->
        <h1>Redirecting...</h1>
        <p>Please wait</p>
    </div>
</template>
