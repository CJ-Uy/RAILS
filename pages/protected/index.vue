<script setup lang="ts"></script>

<template>
    <div>
        <h1>Protected Page</h1>
        <p>This page is protected by auth middleware.</p>
        <NuxtLink to="/protected/forms">
            <h1 class="text-cyan-800 hover:underline active:text-green-500">
                GO TO FORMS
            </h1>
        </NuxtLink>
    </div>
</template>
