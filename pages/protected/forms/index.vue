<!-- nuxt-pdf by sidebase is easiest solution for downloading pdf versions of vue pages -->
<script setup></script>

<template>
    <div>
        <h1>Choose a Form</h1>
        <div class="text-blue-500">
            <NuxtLink to="/protected/forms/CID20">
                <h2 class="hover:underline active:text-green-500">
                    CID-20 Laboratory Request and Equipment Accountability Form
                </h2>
            </NuxtLink>
            <NuxtLink to="/protected/forms/CID19">
                <h2 class="hover:underline active:text-green-500">
                    CID-19 Reagent Request Form
                </h2>
            </NuxtLink>
            <NuxtLink to="/protected/forms/CID05">
                <h2 class="hover:underline active:text-green-500">
                    CID-05 Laboratory Request Reservation Form
                </h2>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
