<script setup>
import { FormKitIcon } from "@formkit/vue";
const students = ref([]);
</script>

<template>
    <div>
        <h1>Name of Students</h1>
        <div>
            <FormKit
                v-slot="{ items }"
                v-model="students"
                type="list"
                name="nameOfStudents"
                dynamic
            >
                <button
                    id="addStudent"
                    type="button"
                    @click="students.unshift('')"
                >
                    + Add a Student
                </button>
                <div v-for="(item, index) in items" :key="item" class="student">
                    <FormKit type="text" :index="index" />
                    <ul class="controls">
                        <li>
                            <button
                                type="button"
                                class="button close"
                                @click="students.splice(index, 1)"
                            >
                                <FormKitIcon icon="close" />
                            </button>
                        </li>
                    </ul>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: bold;
}
#addStudent {
    background-color: #0bc2cf;
    color: white;
    padding: 8px 16px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    transition: 0.3s;
    text-decoration: none;
    cursor: pointer;
}
.student {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}
.student:deep(.formkit-outer) {
    margin-bottom: 0;
    flex-grow: 1;
}

.controls {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

.controls .button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: #999;
    line-height: 1;
    transition: color 0.3s ease;
    appearance: none;
    font-size: 1em;
    color: var(--fk-color-primary);
    margin-left: 0.5rem;
}
.controls:deep(svg) {
    display: block;
    width: 1em;
    max-height: 1.25em;
    height: auto;
    fill: currentColor;
}
.controls .close {
    color: var(--fk-color-danger);
}
</style>
