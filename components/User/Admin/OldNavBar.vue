<script setup>
const { data } = await useFetch("/api/user/me");
const profileImageSrc = ref(data.value.imageLink);

</script>

<template>
    <div class="flex h-screen flex-col bg-light-primary">
        <!-- User profile info -->
        <div>
            <!-- TODO: Check if loaded because it keeps not loading sometimes -->
            <img :src="profileImageSrc" alt="Google Profile's Image" />
        </div>

        <!-- Links -->
        <div class="text-white">
            <!-- Main Menu -->
            <div>
                <h3 class="text-light-accent">Main Menu</h3>
                <NuxtLink
                    to="/admin"
                    class="flex cursor-pointer items-center hover:text-light-accent"
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
                <h3 class="text-light-accent">Workspace</h3>
                <NuxtLink
                    to="/admin/calendar"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    <nuxt-icon
                        name="Calendar"
                        filled
                        class="navbar-icon cursor-pointer"
                    />
                    CALENDAR</NuxtLink
                >
                <NuxtLink
                    to="/admin/inventory"
                    class="flex cursor-pointer items-center hover:text-light-accent"
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
                <h3 class="text-light-accent">Requests</h3>
                <NuxtLink
                    to="/forms"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    <!-- TODO: Make this icon conisstent with the others -->
                    <nuxt-icon
                        name="New_request"
                        filled
                        class="cursor-pointer"
                    />
                    NEW REQUEST</NuxtLink
                >
                <NuxtLink
                    to="/admin/manage-requests"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    <!-- TODO: Make this icon conisstent with the others -->
                    <Icon
                        name="material-symbols:manage-search"
                        class="cursor-pointer"
                    />
                    MANAGE REQUESTS</NuxtLink
                >
                <NuxtLink
                    to="/admin/manage-users"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    <!-- TODO: Make this icon conisstent with the others -->
                    <Icon name="mdi:user-search" class="cursor-pointer" />
                    MANAGE USERS</NuxtLink
                >
                <NuxtLink
                    to="/admin/history"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    <nuxt-icon
                        name="Folder_alt"
                        filled
                        class="cursor-pointer"
                    />
                    HISTORY</NuxtLink
                >
            </div>

            <!-- Views -->
            <div class="flex flex-col">
                <h3 class="text-light-accent">Other Views</h3>
                <NuxtLink
                    to="/student"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                >
                    STUDENT</NuxtLink
                >
                <NuxtLink
                    to="/teacher"
                    class="flex cursor-pointer items-center hover:text-light-accent"
                    >TEACHER</NuxtLink
                >
            </div>
        </div>

        <!-- Closing -->
        <div>
            <!-- Back to Landing Page -->
            <NuxtLink to="/" class="p-3 px-6 pt-2">
                <button
                    class="hidden rounded bg-light-accent px-4 py-2 font-bold text-white hover:bg-blue-600 md:flex"
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
