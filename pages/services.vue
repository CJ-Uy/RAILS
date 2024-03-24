<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Services",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div class="flex h-[100vh] flex-col">
        <div class="flex w-full flex-1 flex-col justify-between md:flex-row">
            <div
                class="flex h-full w-[50%] min-w-[300px] flex-col items-center justify-center text-center text-gray-800"
            >
                <h1 class="text-6xl font-extrabold text-light-primary">
                    SERVICES
                </h1>
                <p class="mx-5 text-2xl">
                    Scholars are offered state-of-the-art tools and equipment,
                    as well as laboratories fit for any scientific work.
                </p>
            </div>
            <div
                class="flex h-full w-[50%] min-w-[512px] flex-col justify-around border-r-2 border-r-gray-300"
            >
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/labPhotos/BioLab.jpg"
                        class="ml-[-24px] w-[30%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/ChemLab.jpg"
                        class="w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/EqptRoom.jpg"
                        class="w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/labPhotos/ChemicalRoom.jpg"
                        class="ml-[-24px] w-[10%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/PhysicsLab.jpg"
                        class="inline-block w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/FabLab.jpg"
                        class="inline-block w-[50%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/labPhotos/ChemicalRoom.jpg"
                        class="ml-[-24px] w-[15%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/InstruRoom.jpg"
                        class="inline-block w-[40%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/labPhotos/ResLab.jpg"
                        class="inline-block w-[35%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
