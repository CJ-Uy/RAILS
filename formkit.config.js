import { defaultConfig, createInput } from "@formkit/vue";
import {
    createAutoAnimatePlugin,
    createAutoHeightTextareaPlugin,
    createFloatingLabelsPlugin,
    createMultiStepPlugin,
} from "@formkit/addons";

import "@formkit/addons/css/multistep";
import "@formkit/addons/css/floatingLabels";

import Calendar from "./components/Forms/Templates/DatePicker/Calendar.vue";
import Time from "./components/Forms/Templates/DatePicker/Time.vue";

const config = defaultConfig({
    plugins: [
        createAutoAnimatePlugin(),
        createAutoHeightTextareaPlugin(),
        createFloatingLabelsPlugin(),
        createMultiStepPlugin(),
    ],
    theme: "genesis",
    inputs: {
        calendarDatePicker: createInput(Calendar),
        timeDatePicker: createInput(Time),
    },
});

export default config;

// Maybe add local storage saving too: https://formkit.com/plugins/local-storage
