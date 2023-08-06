<script setup>
const user = inject("user");

const links = [
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
                to: "/admin",
                icon: "i-heroicons-chart-bar-solid",
            },
        ],
    },
    {
        label: "Workspace",
        children: [
            {
                label: "REQUESTS",
                to: "/admin/requests",
                icon: "i-material-symbols-manage-search",
            },
            {
                label: "CALENDAR",
                to: "/admin/calendar",
                icon: "i-material-symbols-calendar-today",
            },
            {
                label: "INVENTORY",
                to: "/admin/inventory",
                icon: "i-material-symbols-database",
            },
            {
                label: "NEW REQUEST",
                to: "/forms",
                icon: "i-codicon-git-pull-request-new-changes"
            },
        ],
    },
    {
        label: "Management",
        children: [
            {
                label: "EDIT REQUEST FORM",
                to: "/admin/manage-requests",
                icon: "i-mdi-clipboard-edit-outline",
            },
            {
                label: "MANAGE USERS",
                to: "/admin/manage-users",
                icon: "i-mdi-account-search",
            },
        ],
    },
    {
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
    },
];
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
