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
    <div
        class="flex h-screen items-center justify-center bg-[url('/images/01.png')] bg-cover bg-center"
    >
        <div
            class="relative inset-0 top-[-135px] flex h-max w-[90%] items-center justify-center"
        >
            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15656.393576207609!2d125.0030517!3d11.1803503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x330877c845df3f7b%3A0xdb10a6afb48a42ac!2sPhilippine%20Science%20High%20School%20-%20Eastern%20Visayas%20Campus!5e0!3m2!1sen!2sph!4v1704622756358!5m2!1sen!2sph"
                    width="600"
                    height="450"
                    allowfullscreen="false"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="rounded-lg border-none shadow-lg"
                ></iframe>
            </div>
            <div
                class="pl-8 text-left text-4xl font-bold text-gray-800 shadow-none"
            >
                <p class="mb-1">CONTACT PROCESS FOR GUESTS</p>
                <p class="mb-1 text-xl">
                    Submit a Letter of Intent addressed to the school's Campus
                    Director. The letter shall include the following:
                </p>
                <ul class="list-disc text-xl">
                    <li>Title of the Research or Statement of the Problem</li>
                    <li>
                        Name(s), contact numbers, email address(es), and
                        signature(s) of the researcher(s)
                    </li>
                    <li>
                        Name and signature of the research adviser and School
                        Head
                    </li>
                    <li>Capsule proposal</li>
                    <li>List of equipment and materials to be used</li>
                    <li>
                        Duration of the usage of facility, equipment, and
                        materials
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
