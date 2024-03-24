<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | About",
});
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div>
        <div class="mt-15 flex items-center justify-center">
            <div class="mb-15 mx-14 flex flex-col items-center justify-center">
                <h1
                    class="mb-10 text-center text-6xl font-extrabold text-main-500"
                >
                    ABOUT US
                </h1>
                <p
                    class="max-w-700 w-[75%] text-center text-xl text-gray-800 sm:text-2xl md:text-3xl"
                >
                    The PSHS-EVC provides its scholars with state-of-the-art
                    facilities and high-caliber equipment to hone their
                    scientific proficiency and technological applications with
                    the aim of producing globally-competent leaders and
                    professionals.
                </p>
            </div>
        </div>
        <div class="flex w-full flex-col items-center justify-center">
            <h1
                class="mt-15 mb-10 text-center text-6xl font-extrabold text-main-500"
            >
                OUR STAFF
            </h1>

            <!-- For smaller than medium screens -->
            <div
                class="grid w-full grid-cols-1 items-center justify-items-center gap-4 md:hidden"
            >
                <!-- Sir Nestor -->
                <NuxtImg
                    src="/images/staff/sir_nestor.jpg"
                    class="w-[50%] md:w-[300px]"
                    format="webp"
                />
                <div
                    class="mb-5 flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">
                        Mr. Nestor Paderogo Carlon Jr.
                    </h1>
                    <h2>Science Research Specialist - SRS</h2>
                </div>

                <!-- Maam Niña -->
                <NuxtImg
                    src="/images/staff/maam_petilla.jpg"
                    class="w-[50%] md:w-[300px]"
                    format="webp"
                />
                <div
                    class="mb-5 flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mrs. Niña Petilla</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>

                <!-- Sir Israel -->
                <NuxtImg
                    src="/images/staff/sir_israel.jpg"
                    class="w-[50%] md:w-[300px]"
                    format="webp"
                />
                <div
                    class="mb-5 flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mr. Israel Decena Malaca</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>

                <!-- Maam Cyrill -->
                <NuxtImg
                    src="/images/staff/maam_cyrill.jpg"
                    class="w-[50%] md:w-[300px]"
                    format="webp"
                />
                <div
                    class="mb-5 flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mrs. Cyrill D. Tapales</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>
            </div>

            <!-- For medium and larger screens -->
            <div
                class="hidden w-[50%] grid-cols-2 items-center justify-items-center gap-4 md:grid"
            >
                <!-- Sir Nestor -->
                <div>
                    <NuxtImg
                        src="/images/staff/sir_nestor.jpg"
                        class="w-[50%] md:w-[300px]"
                        format="webp"
                    />
                </div>
                <div
                    class="flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">
                        Mr. Nestor Paderogo Carlon Jr.
                    </h1>
                    <h2>Science Research Specialist - SRS</h2>
                </div>

                <!-- Maam Niña -->
                <div
                    class="flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mrs. Niña Petilla</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>
                <div>
                    <NuxtImg
                        src="/images/staff/maam_petilla.jpg"
                        class="w-[50%] md:w-[300px]"
                        format="webp"
                    />
                </div>

                <!-- Sir Israel -->
                <div>
                    <NuxtImg
                        src="/images/staff/sir_israel.jpg"
                        class="w-[50%] md:w-[300px]"
                        format="webp"
                    />
                </div>
                <div
                    class="flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mr. Israel Decena Malaca</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>

                <!-- Maam Cyrill -->
                <div
                    class="flex flex-col justify-center text-center text-2xl text-gray-800"
                >
                    <h1 class="font-extrabold">Mrs. Cyrill D. Tapales</h1>
                    <h2>Science Research Assistant - SRA</h2>
                </div>
                <div>
                    <NuxtImg
                        src="/images/staff/maam_cyrill.jpg"
                        class="w-[50%] md:w-[300px]"
                        format="webp"
                    />
                </div>
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
