<template>
    <div class="relative">
        <div
            class="fixed z-[-999] h-screen w-full bg-[url('/images/01.png')] bg-cover bg-center"
        ></div>
        <div>
            <LandingNavBar />
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>
