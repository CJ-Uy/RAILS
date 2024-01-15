<script setup>
const user = inject("user");

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});

const notifications = ref();
async function getNotifications() {
    const request = await useFetch("/api/db/notifications/getNotifications", {
        method: "POST",
        body: {
            userId: user.id,
        },
    });
    notifications.value = request.data.value;
}

getNotifications();

async function redirectNotification(item) {
    const request = await useFetch("/api/db/notifications/setNotification", {
        method: "POST",
        body: {
            notificationId: item.id,
        },
    });

    await navigateTo("/" + user.role.toLowerCase() + "/" + item.redirect);
}
</script>

<template>
    <div>
        <UContainer class="relative mb-10 mt-5">
            <h1 class="border-primary border-b-4 p-4 text-3xl font-bold">
                {{ title }}
            </h1>
            <div class="absolute right-4 top-0 inline-block h-12 w-12">
                <UPopover
                    :ui="{ width: 'w-[300px] h-[400px]' }"
                    :popper="{ placement: 'bottom-end', offsetSkid: -4 }"
                >
                    <UButton
                        variant="outline"
                        size="xl"
                        icon="i-ion-notifications"
                    />

                    <template #panel>
                        <div class="m-4 max-h-[532px] overflow-auto px-2">
                            <div
                                v-for="notification in notifications"
                                :key="notification.id"
                                class="border-radius my-3 cursor-pointer rounded-sm p-2 px-3 drop-shadow-sm hover:drop-shadow-md"
                                :class="
                                    notification.isRead
                                        ? 'text-gray bg-gray-100'
                                        : 'bg-[#14245e] text-white'
                                "
                                @click="redirectNotification(notification)"
                            >
                                {{ notification.message }}
                            </div>
                        </div>
                    </template>
                </UPopover>
            </div>
        </UContainer>
    </div>
</template>
