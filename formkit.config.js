import { genesisIcons } from "@formkit/icons";
import { defineFormKitConfig, createInput } from "@formkit/vue";
import {
    createAutoAnimatePlugin,
    createAutoHeightTextareaPlugin,
    createFloatingLabelsPlugin,
    createMultiStepPlugin,
} from "@formkit/addons";
// import { rootClasses } from "./formkit.theme";

import "@formkit/addons/css/multistep";
import "@formkit/addons/css/floatingLabels";

import Calendar from "./components/Forms/Templates/DatePicker/Calendar.vue";
import RangedCalendar from "./components/Forms/Templates/DatePicker/RangedCalendar.vue";
import Time from "./components/Forms/Templates/DatePicker/Time.vue";

export default defineFormKitConfig(() => ({
    plugins: [
        createAutoAnimatePlugin(),
        createAutoHeightTextareaPlugin(),
        createFloatingLabelsPlugin(),
        createMultiStepPlugin(),
    ],
    icons: { ...genesisIcons },
    // config: { rootClasses },

    // This code adds the VueDatPicker as a Formkit type
    inputs: {
        calendarDatePicker: createInput(Calendar),
        RangedCalendarDatePicker: createInput(RangedCalendar),
        timeDatePicker: createInput(Time),
    },
}));
