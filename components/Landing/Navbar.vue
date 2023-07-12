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
        <nav class="container relative ml-0 min-w-full bg-primary-100 p-6">
            <!-- Flex box container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="pt-2">
                    <NuxtLink to="/">
                        <nuxt-icon name="Logo" filled class="logo cursor-pointer" />
                    </NuxtLink>
                </div>
                <!-- Menu items -->
                <div class="hidden space-x-6 text-offWhite md:flex">
                    <NuxtLink
                        to="/"
                        class="cursor-pointer hover:text-secondary-100"
                        >HOME</NuxtLink
                    >
                    <NuxtLink
                        to="/about"
                        class="cursor-pointer hover:text-secondary-100"
                        >ABOUT</NuxtLink
                    >
                    <NuxtLink
                        to="/services"
                        class="cursor-pointer hover:text-secondary-100"
                        >SERVICES</NuxtLink
                    >
                    <NuxtLink
                        to="/contact"
                        class="cursor-pointer hover:text-secondary-100"
                        >CONTACT US</NuxtLink
                    >
                </div>
                <!-- Sign in Button -->
                <NuxtLink to="/login" class="p-3 px-6 pt-2">
                    <button
                        class="hidden rounded bg-secondary-100 px-4 py-2 font-bold text-white hover:bg-blue-600 md:flex"
                    >
                        Go to Dashboard
                    </button>
                </NuxtLink>

                <!-- Hamburger Icon -->
                <div
                    id="menu-btn"
                    class="ml-auto block focus:outline-none md:hidden"
                    @click="toggleMenu"
                >
                    <div :class="{ hidden: isMenuOpen }">
                        <Icon
                            name="icon-park-outline:hamburger-button"
                            class="input-slot-image"
                        />
                    </div>
                    <div :class="{ hidden: !isMenuOpen }">
                        <Icon
                            name="ic:twotone-close"
                            class="input-slot-image"
                        />
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div class="md:hidden">
                    <div
                        id="menu"
                        :class="{ hidden: !isMenuOpen }"
                        class="absolute left-6 right-6 mt-10 flex flex-col items-center space-y-6 self-end bg-white py-8 font-bold drop-shadow-md sm:w-auto sm:self-center"
                    >
                        <NuxtLink
                            to="/"
                            class="cursor-pointer hover:text-secondary-100"
                            >HOME</NuxtLink
                        >
                        <NuxtLink
                            to="/about"
                            class="cursor-pointer hover:text-secondary-100"
                            >ABOUT</NuxtLink
                        >
                        <NuxtLink
                            to="/services"
                            class="cursor-pointer hover:text-secondary-100"
                            >SERVICES</NuxtLink
                        >
                        <NuxtLink
                            to="/contact"
                            class="cursor-pointer hover:text-secondary-100"
                            >CONTACT US</NuxtLink
                        >
                        <!-- Sign in Button -->
                        <NuxtLink to="/login" class="p-3 px-6 pt-2">
                            <button
                                class="rounded bg-secondary-100 px-4 py-2 font-bold text-white hover:bg-blue-600"
                            >
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
.logo svg {
    height: 45px;
    width: 46px; 
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
