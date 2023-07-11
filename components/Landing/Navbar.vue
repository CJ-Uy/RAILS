<script setup>
const isMenuOpen = ref(false);
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
    console.log(isMenuOpen.value);
}
</script>

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
                    <NuxtLink to="/" class="hover:text-secondary-100 cursor-pointer">HOME</NuxtLink>
                    <NuxtLink to="/about" class="hover:text-secondary-100 cursor-pointer">ABOUT</NuxtLink>
                    <NuxtLink to="/services" class="hover:text-secondary-100 cursor-pointer">SERVICES</NuxtLink>
                    <NuxtLink to="/contact" class="hover:text-secondary-100 cursor-pointer">CONTACT US</NuxtLink>
                </div>
                <!-- Sign in Button -->
                <NuxtLink to="/login" class="p-3 px-6 pt-2">
                    <button
                        class="rounded bg-secondary-100 px-4 py-2 font-bold text-white hover:bg-blue-600 hidden md:flex">
                        Go to Dashboard
                    </button>
                </NuxtLink>

                <!-- Hamburger Icon -->
                <div id="menu-btn" class="block md:hidden focus:outline-none ml-auto" @click="toggleMenu">
                    <div :class="{ hidden: isMenuOpen }">
                        <Icon name="icon-park-outline:hamburger-button" class="input-slot-image" />
                    </div>
                    <div :class="{ hidden: !isMenuOpen }">
                        <Icon name="ic:twotone-close" class="input-slot-image" />
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div class="md:hidden">
                    <div id="menu" :class="{ hidden: !isMenuOpen }"
                        class="absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                        <NuxtLink to="/" class="hover:text-secondary-100 cursor-pointer">HOME</NuxtLink>
                        <NuxtLink to="/about" class="hover:text-secondary-100 cursor-pointer">ABOUT</NuxtLink>
                        <NuxtLink to="/services" class="hover:text-secondary-100 cursor-pointer">SERVICES</NuxtLink>
                        <NuxtLink to="/contact" class="hover:text-secondary-100 cursor-pointer">CONTACT US</NuxtLink>
                        <!-- Sign in Button -->
                        <NuxtLink to="/login" class="p-3 px-6 pt-2">
                            <button class="font-bold rounded bg-secondary-100 px-4 py-2 text-white hover:bg-blue-600">
                                Go to Dashboard
                            </button>
                        </NuxtLink>
                    </div>
                </div>
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
    color: #3aa671;
}

.router-link-active:hover {
    color: #3aa671;
}

.input-slot-image {
    color: white;
    height: 45px;
    width: 45px;
}
</style>
