<script setup>
import SignaturePad from "signature_pad";

useHead({
    title: "EVC LABS | Requests Management",
});

const canvasRef = ref(null);

let signaturePad;
onMounted(() => {
    signaturePad = new SignaturePad(canvasRef.value);
});

function clear() {
    signaturePad.clear();
}

function save() {
    const signature = signaturePad.toDataURL();
    console.log(signature);
    // Save signature to database or do something else with it
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
            <div class="flex flex-col items-center justify-center p-2">
                <div class="rounded border-2 border-black">
                    <canvas ref="canvasRef"></canvas>
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
</template>
