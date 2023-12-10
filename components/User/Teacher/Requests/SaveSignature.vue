<script setup>
import SignaturePad from "signature_pad";

// Load Current Signature
const user = inject("user");
const signatureData = await useFetch(
    "/api/user/teacher/signature/getSignature",
    {
        method: "POST",
        body: user,
    },
);
const signature = ref(signatureData.data);

// Initialize Signature Pad
const sigModalIsOpen = ref(false);
const canvasRef = ref(null);
let signaturePad;

watch(sigModalIsOpen, () => {
    nextTick(() => {
        signaturePad = new SignaturePad(canvasRef.value, {
            minWidth: 0.5,
            maxWidth: 2.5,
            backgroundColor: "rgba(0,0,0,0)",
        });
    });
});

function saveSig() {
    let svg = signaturePad.toSVG().toString();
    svg = svg.replace(/viewBox="[^"]*"/, `viewBox="0 0 500 250"`); // It automatically crops it for some reason so this uncrops it

    // Save the svg output as the signature value
    if (typeof signature.value[1] === "string") {
        signature.value[1] = {};
    }
    signature.value[1].signature = svg;
    signature.value[0] = true;
    sigModalIsOpen.value = false;
    useFetch("/api/user/teacher/signature/saveSignature", {
        method: "POST",
        body: {
            user,
            signature: svg,
        },
    });
}

async function deleteSig() {
    await useFetch("/api/user/admin/signature/deleteSignature", {
        method: "POST",
        body: {
            user,
        },
    });

    const signatureData = await useFetch(
        "/api/user/admin/signature/getSignature",
        {
            method: "POST",
            body: user,
        },
    );

    signature.value = signatureData.data.value;
}

function clearSig() {
    signaturePad.clear();
}
</script>

<template>
    <div>
        <!-- BUG: Even if the canvas is set to 500 X 250 the svg saved is 400 X 200 by croppping it
                The issue is with the viewbox attribute so i just manually change it
        -->
        <div class="mx-[2.5%] flex items-center justify-center text-center">
            <UCard class="w-[50%]">
                <template #header> E-Signature </template>
                <div
                    v-if="signature[0]"
                    class="flex items-center justify-center"
                >
                    <div v-html="signature[1].signature" class="scale-75"></div>
                </div>
                <div v-else>{{ signature[1] }}</div>
                <template #footer>
                    <UButton
                        label="Save New Signature"
                        @click="sigModalIsOpen = true"
                        class="mr-2"
                    />
                    <UButton
                        label="Delete Signature"
                        @click="deleteSig"
                        variant="outline"
                        color="red"
                    />
                </template>
            </UCard>
        </div>

        <!-- Modals -->

        <!-- Signaturepad -->
        <UModal
            v-model="sigModalIsOpen"
            prevent-close
            :ui="{
                width: 'sm:max-w-[555px]',
            }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                            Save a New Signature
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="sigModalIsOpen = false"
                        />
                    </div>
                </template>

                <div
                    class="flex items-center justify-center rounded border-2 border-black"
                >
                    <canvas
                        ref="canvasRef"
                        class="rounded bg-light-background"
                        width="500"
                        height="250"
                    ></canvas>
                </div>

                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton
                            label="CLEAR"
                            color="gray"
                            variant="solid"
                            size="lg"
                            @click="clearSig"
                        />
                        <UButton label="SAVE" size="lg" @click="saveSig()" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
