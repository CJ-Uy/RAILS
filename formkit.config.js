import { defaultConfig, createInput } from "@formkit/vue";
import {
    createAutoAnimatePlugin,
    createAutoHeightTextareaPlugin,
    createFloatingLabelsPlugin,
    createMultiStepPlugin,
    createLocalStoragePlugin,
} from "@formkit/addons";

import "@formkit/addons/css/multistep";
import "@formkit/addons/css/floatingLabels";

import Calendar from "./components/Forms/Templates/DatePicker/Calendar.vue";
import RangedCalendar from "./components/Forms/Templates/DatePicker/RangedCalendar.vue";
import Time from "./components/Forms/Templates/DatePicker/Time.vue";

const config = defaultConfig({
    plugins: [
        createAutoAnimatePlugin(),
        createAutoHeightTextareaPlugin(),
        createFloatingLabelsPlugin(),
        createMultiStepPlugin(),
        createLocalStoragePlugin({
            // plugin defaults:
            prefix: "formkit",
            key: undefined,
            control: undefined,
            maxAge: 3600000, // 1 hour
            debounce: 200,
            beforeSave: undefined,
            beforeLoad: undefined,
        }),
    ],
    theme: "genesis",
    inputs: {
        calendarDatePicker: createInput(Calendar),
        RangedCalendarDatePicker: createInput(RangedCalendar),
        timeDatePicker: createInput(Time),
    },
});

export default config;
