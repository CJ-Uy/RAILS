import { ref } from "vue";
import downloadPDF from "~/utils/forms/downloadPDF.js";

export function useDownloader() {
    const loading = ref(false);
    const loadingMessage = ref("Generating PDFs...");

    async function download(requestId) {
        loading.value = true;
        try {
            const pdfBuffers = await $fetch("/api/forms/create-pdf-buffers", {
                method: "POST",
                body: { id: requestId },
            });

            try {
                downloadPDF(pdfBuffers[0], pdfBuffers[1]);
            } catch (error) {
                console.error(
                    "There was an error downloading the pdf: ",
                    error,
                );
                // You might want to show an error message to the user here
            }
        } catch (error) {
            console.error("There was an error creating the pdf: ", error);
            // You might want to show an error message to the user here
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        loadingMessage,
        download,
    };
}
