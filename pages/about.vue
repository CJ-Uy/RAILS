<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | About",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div>
        <div class="flex h-screen items-center justify-center">
            <div class="ml-14 text-center" style="margin-top: -190px">
                <p class="max-w-700 text-3xl text-gray-800">
                    The PSHS-EVC provides its scholars with state-of-the-art
                    facilities and high-caliber equipment <br />
                    to hone their scientific proficiency and technological
                    applications with the aim of producing <br />
                    globally-competent leaders and professionals.
                </p>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <div
                class="mb-[50px] flex h-[360px] w-[60%] flex-row justify-start"
            >
                <div
                    class="h-full w-[300px] bg-[url('/images/staff/sir_nestor.jpg')] bg-cover bg-center"
                ></div>
                <div
                    class="ml-[50px] flex w-[30%] items-center justify-center text-xl text-gray-800"
                >
                    Insert Name and Title
                </div>
            </div>
            <div class="mb-[50px] flex h-[360px] w-[60%] flex-row justify-end">
                <div
                    class="mr-[50px] flex w-[30%] items-center justify-center text-xl text-gray-800"
                >
                    Insert Name and Title
                </div>
                <div
                    class="h-full w-[300px] bg-[url('/images/staff/sir_nestor.jpg')] bg-cover bg-center"
                ></div>
            </div>
            <div
                class="mb-[50px] flex h-[360px] w-[60%] flex-row justify-start"
            >
                <div
                    class="h-full w-[300px] bg-[url('/images/staff/sir_nestor.jpg')] bg-cover bg-center"
                ></div>
                <div
                    class="ml-[50px] flex w-[30%] items-center justify-center text-xl text-gray-800"
                >
                    Insert Name and Title
                </div>
            </div>
            <div class="mb-[50px] flex h-[360px] w-[60%] flex-row justify-end">
                <div
                    class="mr-[50px] flex w-[30%] items-center justify-center text-xl text-gray-800"
                >
                    Insert Name and Title
                </div>
                <div
                    class="h-full w-[300px] bg-[url('/images/staff/sir_nestor.jpg')] bg-cover bg-center"
                ></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: "Gilroy-ExtraBold";
    src: url("~/assets/fonts/Gilroy-ExtraBold.otf");
}

.font-gilroy-extrabold {
    font-family: "Gilroy-ExtraBold", sans-serif;
}
</style>

<style scoped>
body {
    overflow: hidden; /* Hide scrollbars */
}
</style>
