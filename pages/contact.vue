<script setup lang="ts">
// PAGE META
useHead({
    title: "PSHS-EVC LABS | Contact Us",
});

// [auth: false] allows the page to be seen by "Authenticated" and "Unauthenticated" users
definePageMeta({ auth: false, layout: "landing-pages" });
// PAGE META END
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="mt-15 flex w-[90%] flex-col items-center justify-center">
            <div class="mb-15 flex w-full flex-col items-center justify-center">
                <NuxtImg
                    src="/images/process.png"
                    format="webp"
                    class="w-screen md:w-[75%] xl:w-[50%]"
                />
                <p class="mt-4 text-2xl">
                    For any further inquires please email
                    <span class="font-extrabold text-light-primary"
                        >reslab@evc.pshs.edu.ph</span
                    >
                </p>
            </div>
            <div class="mb-20 flex w-full flex-col items-center justify-center">
                <h1
                    class="mb-5 text-center text-6xl font-extrabold text-light-primary"
                >
                    LOCATION
                </h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15656.393576207609!2d125.0030517!3d11.1803503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x330877c845df3f7b%3A0xdb10a6afb48a42ac!2sPhilippine%20Science%20High%20School%20-%20Eastern%20Visayas%20Campus!5e0!3m2!1sen!2sph!4v1704622756358!5m2!1sen!2sph"
                    allowfullscreen="false"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="h-screen w-[80%] rounded-lg border-none shadow-lg"
                ></iframe>
            </div>
        </div>
    </div>
</template>
