<script setup>
const isMenuOpen = ref(false);
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <div>
        <!-- Navigation Bar -->
        <nav class="container relative ml-2 min-w-full bg-white p-6">
            <!-- Flex box container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div>
                    <NuxtLink to="/">
                        <img
                            src="/images/header.png"
                            alt="Logo"
                            class="logo cursor-pointer"
                            style="height: 60px; width: auto"
                        />
                    </NuxtLink>
                </div>
                <!-- Menu items -->
                <div class="-ml-24 space-x-16 md:flex">
                    <NuxtLink
                        to="/"
                        class="menu-item cursor-pointer hover:text-light-accent"
                    >
                        HOME
                    </NuxtLink>
                    <NuxtLink
                        to="/about"
                        class="menu-item cursor-pointer hover:text-light-accent"
                    >
                        ABOUT
                    </NuxtLink>
                    <NuxtLink
                        to="/services"
                        class="menu-item cursor-pointer hover:text-light-accent"
                    >
                        SERVICES
                    </NuxtLink>
                    <NuxtLink
                        to="/contact"
                        class="menu-item cursor-pointer hover:text-light-accent"
                    >
                        CONTACT US
                    </NuxtLink>
                </div>
                <!-- Sign in Button -->
                <NuxtLink to="/login" class="p-3 px-6 pt-2">
                    <button
                        class="hidden rounded bg-light-accent px-4 py-2 font-bold text-white hover:bg-blue-600 md:flex"
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
                    <div v-if="!isMenuOpen">
                        <Icon
                            name="icon-park-outline:hamburger-button"
                            class="input-slot-image"
                        />
                    </div>
                    <div v-else>
                        <Icon
                            name="ic:twotone-close"
                            class="input-slot-image"
                        />
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div v-auto-animate class="md:hidden">
                    <div
                        v-if="isMenuOpen"
                        id="menu"
                        class="fixed left-6 right-6 mt-10 flex flex-col items-center space-y-6 self-end bg-blue-600 py-8 font-bold drop-shadow-md sm:w-auto sm:self-center"
                    >
                        <NuxtLink to="/" class="menu-item cursor-pointer">
                            HOME
                        </NuxtLink>
                        <NuxtLink to="/about" class="menu-item cursor-pointer">
                            ABOUT
                        </NuxtLink>
                        <NuxtLink
                            to="/services"
                            class="menu-item cursor-pointer"
                        >
                            SERVICES
                        </NuxtLink>
                        <NuxtLink
                            to="/contact"
                            class="menu-item cursor-pointer"
                        >
                            CONTACT US
                        </NuxtLink>
                        <!-- Sign in Button -->
                        <NuxtLink to="/login" class="p-3 px-6 pt-2">
                            <button
                                class="rounded bg-light-accent px-4 py-2 font-bold text-white hover:bg-blue-600"
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
.logo {
    height: 60px;
    width: auto;
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

.ml-4 {
    margin-left: -1rem;
}

.menu-item {
    position: relative;
    text-decoration: none;
}

.menu-item:hover,
.menu-item.router-link-exact-active {
    color: #4299e1;
}

.menu-item::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: #4299e1;
    transition:
        background-color 0.3s ease,
        transform 0.3s ease; /* Added transform property */
    opacity: 0;
    transform: scaleX(0); /* Initial scale to hide the underline */
    transform-origin: bottom left; /* Set transform origin to start from bottom left */
}

.menu-item:hover::before,
.menu-item.router-link-exact-active::before {
    opacity: 1;
    background-color: #4299e1;
    transform: scaleX(1); /* Scale to show the underline on hover */
}
</style>
