<script setup>
import { prisma } from "server/db/prisma";
import SignaturePad from "signature_pad";

useHead({
    title: "EVC LABS | Requests Management",
});

const { data } = await useFetch("/api/user/me");
if (data.value.role === "STUDENT") {
    await navigateTo("/student");
} else if (data.value.role === "TEACHER") {
    await navigateTo("/teacher");
}

const saveNewSignature = ref(false);
const canvasRef = ref(null);

let signaturePad;
watch(saveNewSignature, () => {
    if (saveNewSignature.value) {
        nextTick(() => {
            signaturePad = new SignaturePad(canvasRef.value, {
                minWidth: 0.5,
                maxWidth: 2.5,
                backgroundColor: "rgba(0,0,0,0)",
            });
        });
    }
});

function clear() {
    signaturePad.clear();
}

async function save() {
    const signature = signaturePad.toSVG();
    await prisma.users.update({
        where: {
            id: data.value.id,
        },
        data: {
            adminProfile: {
                update: {
                    signature: signature.toString(),
                },
            },
        },
    });
    console.log(signature.toString());
    // Save signature to database
    // 1. Make dataURL to svg with signaturePad.toSVG();
    // 2. convert svg to base 64 svgFileData.toString()
    // 3. save String to database
    // 4. retrieve svg from string ¯\_(ツ)_/¯ (https://stackoverflow.com/questions/24107288/creating-an-svg-dom-element-from-a-string)

}
</script>

<template>
    <div class="flex w-screen flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="flex basis-[84.723854%] flex-col">
            <div>
                <h1>ADMIN REQUEST MANAGEMENT</h1>
            </div>
            <div>
                <button
                    v-if="!saveNewSignature"
                    class="rounded bg-light-primary p-2 text-dark-text"
                    @click="saveNewSignature = !saveNewSignature"
                >
                    New Signature
                </button>
                <button
                    v-else
                    class="rounded bg-light-secondary p-2"
                    @click="saveNewSignature = !saveNewSignature"
                >
                    Close
                </button>
                <div
                    v-if="saveNewSignature"
                    class="flex flex-col items-center justify-center bg-light-secondary p-2"
                >
                    <div class="flex-1 rounded border-2 border-black">
                        <canvas
                            ref="canvasRef"
                            class="rounded bg-light-background"
                            width="500"
                            height="250"
                        ></canvas>
                    </div>
                    <div class="p-2">
                        <button
                            class="mx-1 w-20 rounded bg-gray-400 p-1.5"
                            @click="clear"
                        >
                            Clear
                        </button>
                        <button
                            class="mx-1 w-20 rounded bg-light-accent p-1.5"
                            @click="save"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
