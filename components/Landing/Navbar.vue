<template>
    <div>
        <!-- Navigation Bar -->
        <nav class="relative container min-w-full p-6 bg-primary-100 ml-0">
            <!-- Flex box container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="pt-2">
                    <NuxtLink to="/">
                        <nuxt-icon name="logo" filled class="cursor-pointer" />
                    </NuxtLink>
                </div>
                <!-- Menu items -->
                <div class="hidden md:flex space-x-6 text-offWhite">
                    <NuxtLink 
                        to="/" 
                        class="hover:text-secondary-100 cursor-pointer" 
                        >HOME</NuxtLink
                    >
                    <NuxtLink
                        to="/about"
                        class="hover:text-secondary-100 cursor-pointer"
                        >ABOUT</NuxtLink
                    >
                    <NuxtLink
                        to="/services"
                        class="hover:text-secondary-100 cursor-pointer"
                        >SERVICES</NuxtLink
                    >
                    <NuxtLink
                        to="/contact"
                        class="hover:text-secondary-100 cursor-pointer"
                        >CONTACT US</NuxtLink
                    >
                </div>
                <!-- Sign in Button -->
                <NuxtLink to="/login" class="p-3 px-6 pt-2">
                    <button
                        class="rounded bg-secondary-100 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </NuxtLink>
            </div>
        </nav>
    </div>
</template>

<style>
.nuxt-icon svg {
    height: 45px;
    width: 46px;
    margin: 0;
}

.router-link-active {
    color: #3AA671;
}
.router-link-active:hover {
    color: #3AA671;
}
</style>
