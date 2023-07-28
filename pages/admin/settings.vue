<template>
    <div>
        <canvas ref="canvas"></canvas>
        <button @click="clear">Clear</button>
        <button @click="save">Save</button>
    </div>
</template>

<script setup>
import SignaturePad from "signature_pad";

const signaturePad = new SignaturePad($refs.canvas);

function clear() {
    signaturePad.clear();
}

function save() {
    const signature = signaturePad.toDataURL();
    console.log(signature);
    // Save signature to database or do something else with it
}
</script>
