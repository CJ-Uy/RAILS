// https://formkit.com/plugins
import {
    createMultiStepPlugin,
    createAutoAnimatePlugin,
    createFloatingLabelsPlugin,
    createAutoHeightTextareaPlugin,
} from "@formkit/addons";
import "@formkit/addons/css/multistep";
import "@formkit/addons/css/floatingLabels";

export default {
    plugins: [
        createAutoAnimatePlugin(),
        createAutoHeightTextareaPlugin(),
        createFloatingLabelsPlugin(),
        createMultiStepPlugin(),
    ],
};

// Maybe add local storage saving too: https://formkit.com/plugins/local-storage