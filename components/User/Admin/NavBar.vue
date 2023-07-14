<script setup>
const { data } = await useFetch("/api/user/me");
const profileImageSrc = ref(data.value.imageLink);
</script>

<template>
    <div class="flex h-screen flex-col bg-primary-100">
        <!-- User profile info -->
        <div>
            <img :src="profileImageSrc" alt="Google Profile's Image" />
        </div>

        <!-- Links -->
        <div class="text-white">
            <!-- Main Menu -->
            <div>
                <h3 class="text-secondary-100">Main Menu</h3>
                <NuxtLink
                    to="/admin"
                    class="flex cursor-pointer items-center hover:text-secondary-100"
                >
                    <nuxt-icon
                        name="Chart_fill"
                        filled
                        class="cursor-pointer"
                    />
                    DASHBOARD</NuxtLink
                >
            </div>

            <!-- Workspace -->
            <div class="flex flex-col">
                <h3 class="text-secondary-100">Workspace</h3>
                <NuxtLink
                    to="/admin/calendar"
                    class="flex cursor-pointer items-center hover:text-secondary-100"
                >
                    <nuxt-icon name="Calendar" filled class="navbar-icon cursor-pointer" />
                    CALENDAR</NuxtLink
                >
                <NuxtLink
                    to="/admin/inventory"
                    class="flex cursor-pointer items-center hover:text-secondary-100"
                >
                    <nuxt-icon
                        name="Search_alt"
                        filled
                        class="cursor-pointer"
                    />
                    INVENTORY</NuxtLink
                >
            </div>

            <!-- Requests -->
            <div class="flex flex-col">
                <h3 class="text-secondary-100">Requests</h3>
            </div>
        </div>

        <!-- Closing -->
        <div>
            <!-- Back to Landing Page -->
            <NuxtLink to="/" class="p-3 px-6 pt-2">
                <button
                    class="hidden rounded bg-secondary-100 px-4 py-2 font-bold text-white hover:bg-blue-600 md:flex"
                >
                    Back to Landing
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<style>
.navbar-icon svg {
    height: 20px;
    width: 20px; 
}
</style>
