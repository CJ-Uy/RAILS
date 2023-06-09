<script setup lang="ts">
const { data } = await useFetch("/api/user/me");
const accountEmail = useEmail();
const accountFirstName = useFirstName();
const accountLastName = useLastName();
const accountName = useName();

accountEmail.value = data.value.user.email;
accountFirstName.value = data.value.given_name;
accountLastName.value = data.value.family_name;
accountName.value = data.value.user.name;

const date = ref();
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
        <VueDatePicker v-model="date" range />
        <pre>
            {{ date }}
        </pre>
    </div>
</template>
