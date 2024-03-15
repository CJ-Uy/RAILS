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
        <div class="flex w-full flex-1 flex-row justify-between">
            <div
                class="flex h-full w-[50%] min-w-[512px] flex-col justify-around border-r-2 border-r-gray-300"
            >
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <div
                        class="ml-[-24px] w-[30%] justify-self-start rounded-r-3xl bg-[url('/images/labPhotos/BioLab.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="w-[30%] rounded-3xl bg-[url('/images/labPhotos/ChemLab.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="w-[30%] rounded-3xl bg-[url('/images/labPhotos/EqptRoom.jpg')] bg-cover bg-center"
                    ></div>
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <div
                        class="ml-[-24px] w-[10%] justify-self-start rounded-r-3xl bg-[url('/images/labPhotos/ChemicalRoom.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="inline-block w-[30%] rounded-3xl bg-[url('/images/labPhotos/PhysicsLab.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="inline-block w-[50%] rounded-3xl bg-[url('/images/labPhotos/FabLab.jpg')] bg-cover bg-center"
                    ></div>
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <div
                        class="ml-[-24px] w-[15%] justify-self-start rounded-r-3xl bg-[url('/images/labPhotos/ChemicalRoom.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="inline-block w-[40%] rounded-3xl bg-[url('/images/labPhotos/InstruRoom.jpg')] bg-cover bg-center"
                    ></div>
                    <div
                        class="inline-block w-[35%] rounded-3xl bg-[url('/images/labPhotos/ResLab.jpg')] bg-cover bg-center"
                    ></div>
                </div>
            </div>
            <div
                class="flex h-full w-[50%] min-w-[300px] items-center justify-center text-center text-xl text-gray-800"
            >
                Scholars are offered state-of-the-art tools and equipment,<br />
                as well as laboratories fit for any scientific work.
            </div>
        </div>
    </div>
</template>
