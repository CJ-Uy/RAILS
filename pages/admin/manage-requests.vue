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
    <div class="flex flex-row">
        <div class="basis-[15.276146%]">
            <!-- Taken from figma 260/1702-->
            <UserAdminNavbar />
        </div>
        <div class="basis-auto">
            <h1>ADMIN REQUEST MANAGEMENT</h1>
            <div>
                <canvas ref="canvasRef"></canvas>
                <button @click="clear">Clear</button>
                <button @click="save">Save</button>
            </div>
        </div>
    </div>
</template>
