<script setup>
const user = inject("user");

let links = [
    {
        label: `${user.firstName} ${user.lastName}\n${user.email}`,
        avatar: {
            src: user.imageLink,
            alt: `${user.firstName} ${user.lastName}`,
        },
    },
    {
        label: "Main Menu",
        children: [
            {
                label: "DASHBOARD",
                to: "/teacher",
                icon: "i-heroicons-chart-bar-solid",
            },
            {
                label: "STUDENT REQUESTS",
                to: "/teacher/student-requests",
                icon: "i-material-symbols-manage-search",
            }
        ],
    },
    {
        label: "Laboratory",
        children: [
            {
                label: "NEW REQUEST",
                to: "/forms",
                icon: "i-codicon-git-pull-request-new-changes",
            },
            {
                label: "CALENDAR",
                to: "/teacher/calendar",
                icon: "i-material-symbols-calendar-today",
            },
            {
                label: "INVENTORY",
                to: "/teacher/inventory",
                icon: "i-material-symbols-database",
            },
        ],
    },
    {
        label: "Settings",
        children: [
            {
                label: "SETTINGS",
                to: "/teacher/settings",
                icon: "i-material-symbols-settings-rounded",
            },
            {
                label: "BACK TO LANDING",
                to: "/",
                icon: "i-heroicons-home",
            },
        ],
    },
];

if (user.role === "ADMIN") {
    links.push({
        label: "Role Views",
        children: [
            {
                label: "ADMIN",
                to: "/admin",
                icon: "i-eos-icons-admin",
            },
            {
                label: "TEACHER",
                to: "/teacher",
                icon: "i-ph-chalkboard-teacher-fill",
            },
            {
                label: "STUDENT",
                to: "/student",
                icon: "i-ph-student-fill",
            },
            {
                label: "LANDING",
                to: "/",
                icon: "i-heroicons-home",
            },
        ],
    });
}
</script>

<template>
    <div>
        <UVerticalNavigation
            :links="links"
            class="h-screen bg-main"
            :ui="{
                inactive: 'hover:before:bg-primary-500 text-white',
                avatar: {
                    size: 'md',
                    base: 'rounded-lg',
                },
            }"
        >
            <template #default="{ link }">
                <!-- Parent Header -->
                <div class="group relative w-full text-left text-white">
                    <!-- Catch if its the profile -->
                    <div
                        v-if="
                            link.label ==
                            `${user.firstName} ${user.lastName}\n${user.email}`
                        "
                        class="my-5"
                    >
                        {{ link.label }}
                    </div>
                    <div v-else class="mb-2">
                        {{ link.label }}
                    </div>

                    <UVerticalNavigation
                        v-if="link.children"
                        :links="link.children"
                        :ui="{
                            active: 'bg-primary-700 text-white',
                            inactive: 'text-gray-300 hover:bg-primary-600',
                            icon: {
                                active: 'text-white',
                                inactive: 'text-gray-300',
                            },
                        }"
                    >
                        <!-- Child Link -->
                        <template #default="{ link }">
                            <div>
                                {{ link.label }}
                            </div>
                        </template>
                    </UVerticalNavigation>
                </div>
            </template>
        </UVerticalNavigation>
    </div>
</template>
