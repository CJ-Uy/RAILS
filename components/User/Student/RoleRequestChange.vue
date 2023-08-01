<script setup>
const user = inject("user");

const roleChangeModalIsOpen = ref(false);
const hasAgreedToChangeRolesTerms = ref(false);
const savedRequestModalIsOpen = ref(false);
const failedRequestModalIsOpen = ref(false);
const requestError = ref();

async function sendChangeRoleRequest() {
    // Send Requst here
    try {
        const roleChangeRequest = await useFetch(
            "/api/user/student/change-role",
            {
                method: "POST",
                body: {
                    userId: user.id,
                    role: "TEACHER",
                },
            },
        );

        roleChangeModalIsOpen.value = false;
        savedRequestModalIsOpen.value = true;
    } catch (error) {
        roleChangeModalIsOpen.value = false;

        requestError.value = error;
        failedRequestModalIsOpen.value = true;
    }
}
</script>

<template>
    <div>
        <UButton
            label="Role Request Change"
            @click="roleChangeModalIsOpen = true"
        />

        <!-- ROLE CHANGE MODAL -->
        <UModal v-model="roleChangeModalIsOpen">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold">Changing Roles</h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="roleChangeModalIsOpen = false"
                        />
                    </div>
                </template>
                <UContainer>
                    <p>
                        Insert a warning here about how teachers should only be
                        the one requesting a role change. If a student were to
                        do so something something face possible consequences.
                    </p>
                </UContainer>
                <template #footer>
                    <UContainer
                        class="flex flex-row items-center justify-between"
                    >
                        <div class="ml-0">
                            <UCheckbox
                                v-model="hasAgreedToChangeRolesTerms"
                                label="I agree to the Terms and Conditions"
                                required
                            />
                        </div>
                        <UButton
                            class="ml-auto"
                            :disabled="!hasAgreedToChangeRolesTerms"
                            @click="sendChangeRoleRequest"
                            >Change Roles</UButton
                        >
                    </UContainer>
                </template>
            </UCard>
        </UModal>

        <!-- SAVED REQUEST -->
        <UModal v-model="savedRequestModalIsOpen">
            <UCard class="flex items-center justify-center">
                <h3>SAVED</h3>
                <p>
                    {{ successfulRequest }}
                </p>
            </UCard>
        </UModal>

        <!-- FAILED REQUEST -->
        <UModal v-model="failedRequestModalIsOpen">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold">ERROR</h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="failedRequestModalIsOpen = false"
                        />
                    </div>
                </template>
                <div>
                    <p>
                        {{ requestError }}
                    </p>
                </div>
            </UCard>
        </UModal>
    </div>
</template>
