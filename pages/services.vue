<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Services",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END

const services = [
    {
        label: "MAJOR",
        slot: "MajorEquipments",
    },
    {
        label: "FABLAB",
        slot: "FabLab",
    },
    {
        label: "LABS",
        slot: "Labs",
    },
];
</script>

<template>
    <div class="flex h-[100vh] flex-col">
        <div class="flex w-full flex-1 flex-col justify-between md:flex-row">
            <div
                class="flex h-full w-full min-w-[300px] flex-col items-center justify-center space-y-3 text-center text-gray-800 md:w-[50%]"
            >
                <h1 class="text-6xl font-extrabold text-light-primary">
                    SERVICES
                </h1>
                <p class="mx-[10%] text-2xl">
                    Scholars are offered state-of-the-art tools and equipment,
                    as well as laboratories fit for any scientific work. For any
                    further inquires please email
                    <span class="font-extrabold text-light-primary"
                        >reslab@evc.pshs.edu.ph</span
                    >
                </p>
                <UTabs :items="services" class="h-[275px] w-[80%] md:h-[450px]">
                    <template #MajorEquipments>
                        <ul class="text-lg">
                            <li class="mt-3">Rotary Evaporator</li>
                            <li>Autoclave</li>
                            <li>Incubator</li>
                            <li>Water Sonicator</li>
                            <li>Vortex Mixer</li>
                            <li>Oven</li>
                            <li>Analytical Balance</li>
                        </ul>
                    </template>
                    <template #FabLab>
                        <ul class="text-lg">
                            <li class="mt-3">3D Printer</li>
                            <li>Laser Precision Milling</li>
                            <li>CNC-Milling</li>
                            <li>Vinyl Cutting</li>
                            <li>Tarpaulin Printing</li>
                        </ul>
                    </template>
                    <template #Labs>
                        <ul class="text-lg">
                            <li class="mt-3">
                                Research Room & Instrument Unit Equipment (Crest
                                3rd Floor)
                            </li>
                            <li>Chemistry Unit Equipment</li>
                            <li>Biology Unit Equipment</li>
                            <li>Physics Unit Equipment</li>
                        </ul>
                    </template>
                </UTabs>
            </div>
            <div
                class="flex h-full w-full min-w-[512px] flex-col items-center justify-center border-l-2 border-l-gray-300 pl-5 md:w-[50%]"
            >
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/bioLab.jpg"
                        class="ml-[-24px] w-[30%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/chemLab.jpg"
                        class="w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/eqptRoom.jpg"
                        class="w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/chemicalRoom.jpg"
                        class="ml-[-24px] w-[10%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/physicsLab.jpg"
                        class="inline-block w-[30%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/fabLab.jpg"
                        class="inline-block w-[50%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
                <div class="flex h-[30%] w-full flex-row justify-evenly">
                    <NuxtImg
                        src="/images/chemicalRoom.jpg"
                        class="ml-[-24px] w-[15%] justify-self-start rounded-r-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/instruRoom.jpg"
                        class="inline-block w-[40%] rounded-3xl object-cover"
                        format="webp"
                    />
                    <NuxtImg
                        src="/images/resLab.jpg"
                        class="inline-block w-[35%] rounded-3xl object-cover"
                        format="webp"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
