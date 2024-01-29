<script setup>
import dayjs from "dayjs";
import downloadPDF from "~/utils/forms/downloadPDF.js";

const user = inject("user");

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    defaultSortKey: {
        type: String,
        required: false,
        default: "updatedAt",
    },
    startingColumns: {
        type: Array,
        required: true,
    },
    listOfAllColumns: {
        type: Array,
        required: true,
    },
    fetchPath: {
        type: String,
        required: true,
    },
    updatePath: {
        type: String,
        required: true,
    },
});

const sort = ref({ column: props.defaultSortKey, direction: "desc" });

const selectedColumns = ref([]);
// Initial starting columns
for (const i of props.startingColumns) {
    selectedColumns.value.push(
        props.listOfAllColumns.find((object) => object.key === i),
    );
}
const selectedColumnsTable = ref(selectedColumns.value);

// Sort table columns according to the order of columns in list of all columns
// Selected columns keys are also used in filtering search results
const selectedColumnsKeys = ref([]);
for (const i of props.startingColumns) {
    selectedColumnsKeys.value.push(i);
}
watch(selectedColumns, () => {
    selectedColumnsKeys.value = [];
    const listOfAllColumnsKeys = ref([]);
    const selectedColumnsTableTemp = ref([]);
    for (const i of props.listOfAllColumns) {
        listOfAllColumnsKeys.value.push(i.key);
    }
    for (const i of selectedColumns.value) {
        selectedColumnsKeys.value.push(i.key);
    }
    selectedColumnsKeys.value = selectedColumnsKeys.value.sort(
        (a, b) =>
            listOfAllColumnsKeys.value.indexOf(a) -
            listOfAllColumnsKeys.value.indexOf(b),
    );
    for (const i of selectedColumnsKeys.value) {
        selectedColumnsTableTemp.value.push(
            props.listOfAllColumns.find((column) => {
                return column.key === i;
            }),
        );
    }
    selectedColumnsTable.value = selectedColumnsTableTemp.value;
});

const { pending, data: allItems } = await useLazyFetch(props.fetchPath, {});
const allItemsData = ref([]);
const allItemsRawData = ref([]);
watch(allItems, (updatedValues) => {
    allItemsData.value = updatedValues;
    for (let i = 0; i < allItemsData.value.length; i++) {
        if (
            allItemsData.value[i].reagentRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].equipmentRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].materialRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].laboratoryReservationsAdminApproval ===
                "REVISION_NEEDED"
        ) {
            allItemsData.value[i].class =
                "bg-[#b1c6f2] hover:bg-[#93a4c7!important]";
        }
    }
    allItemsRawData.value = allItemsData.value;
});

const totalItems = ref(allItemsData.value.length);

async function updateTable() {
    const allItems = await useFetch(props.fetchPath);
    allItemsData.value = allItems.data.value;
    for (let i = 0; i < allItemsData.value.length; i++) {
        if (
            allItemsData.value[i].reagentRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].equipmentRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].materialRequestsAdminApproval ===
                "REVISION_NEEDED" ||
            allItemsData.value[i].laboratoryReservationsAdminApproval ===
                "REVISION_NEEDED"
        ) {
            allItemsData.value[i].class =
                "bg-[#b1c6f2] hover:bg-[#93a4c7!important]";
        }
    }
    allItemsRawData.value = allItemsData.value;
    totalItems.value = allItemsData.value.length;
}

const page = ref(1);
const pageCount = 8;
const searchQuery = ref("");
const filteredRows = computed(() => {
    // Return all rows if search query is empty
    if (!searchQuery.value) {
        // console.log(allItemsData.value);
        totalItems.value = allItemsData.value.length;
        if (sort.value.direction === "desc") {
            allItemsData.value = allItemsRawData.value.sort((a, b) => {
                if (typeof a[sort.value.column] === "number") {
                    return b[sort.value.column] - a[sort.value.column];
                }
                try {
                    return b[sort.value.column].localeCompare(
                        a[sort.value.column],
                    );
                } catch (e) {
                    return 0;
                }
            });
        } else {
            allItemsData.value = allItemsRawData.value.sort((a, b) => {
                if (typeof a[sort.value.column] === "number") {
                    return a[sort.value.column] - b[sort.value.column];
                }
                try {
                    return a[sort.value.column].localeCompare(
                        b[sort.value.column],
                    );
                } catch (e) {
                    return 0;
                }
            });
        }
        return allItemsData.value.slice(
            (page.value - 1) * pageCount,
            page.value * pageCount,
        );
    }
    const filtered = allItemsData.value.filter((item) => {
        // Only search record data of keys selected in selectedColumns
        return Object.values(item).some((value) => {
            const skip = Object.keys(item).find((key) => item[key] === value);
            if (selectedColumnsKeys.value.includes(skip)) {
                return String(value)
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
            }
            return false;
        });
    });

    // TODO: Slice the values into pages
    totalItems.value = filtered.length;
    if (sort.value.direction === "desc") {
        return filtered
            .sort((a, b) => {
                try {
                    return a[sort.value.column].localeCompare(
                        b[sort.value.column],
                    );
                } catch (e) {
                    return 0;
                }
            })
            .slice((page.value - 1) * pageCount, page.value * pageCount);
    }
    return filtered
        .sort((a, b) => {
            try {
                return b[sort.value.column].localeCompare(a[sort.value.column]);
            } catch (e) {
                return 0;
            }
        })
        .slice((page.value - 1) * pageCount, page.value * pageCount);
});

// ---------- MODAL ---------- //
const modalIsOpen = ref(false);
const selectedData = ref();
function openModal(row) {
    modalIsOpen.value = true;
    selectedData.value = row;
    console.log(selectedData.value);
}

// ----- Multiple Selection Mode ----- //
const allowMultipleSelection = ref(false);
const selectedRows = ref([]);
function addToSelectedRows(row) {
    selectedRows.value.push(row);
}

// ----- Table Control Panel ---- //
async function approveAll() {
    await useFetch(props.updatePath, {
        method: "POST",
        body: {
            action: "APPROVE",
            items: selectedRows.value.map((element) => element.id),
            user: user.adminsId,
        },
    });
    updateTable();
}

async function rejectAll() {
    await useFetch(props.updatePath, {
        method: "POST",
        body: {
            action: "REJECT",
            items: selectedRows.value.map((element) => element.id),
            user: user.adminsId,
        },
    });
    updateTable();
}

const materialRequestsAnnotation = ref("");
const materialRequestsAnnotationStyle = ref("blue");
const reagentRequestsAnnotation = ref("");
const reagentRequestsAnnotationStyle = ref("blue");
const equipmentRequestsAnnotation = ref("");
const equipmentRequestsAnnotationStyle = ref("blue");
const laboratoryReservationsAnnotation = ref("");
function signRequest(requestType, status) {
    if (status === "REVISION_NEEDED" || status === "REJECTED") {
        if (
            requestType === "materialRequestsAdminApproval" &&
            materialRequestsAnnotation.value === ""
        ) {
            materialRequestsAnnotationStyle.value = "red";
        } else if (
            requestType === "reagentRequestsAdminApproval" &&
            reagentRequestsAnnotation.value === ""
        ) {
            reagentRequestsAnnotationStyle.value = "red";
        } else if (
            requestType === "equipmentRequestsAdminApproval" &&
            equipmentRequestsAnnotation.value === ""
        ) {
            equipmentRequestsAnnotationStyle.value = "red";
        }
    }
}

async function downloadAll() {
    try {
        const pdfBuffersRawData = await useFetch(
            "/api/forms/create-pdf-buffers",
            {
                method: "POST",
                body: {
                    id: selectedData.value.id,
                },
            },
        );
        const pdfBuffers = pdfBuffersRawData.data.value;

        try {
            downloadPDF(pdfBuffers[0], pdfBuffers[1]);
        } catch (error) {
            console.error("There was an error downloading the pdf: ", error);
        }
    } catch (error) {
        console.error("There was an error creating the pdf: ", error);
    }
}

updateTable();
</script>

<template>
    <div>
        <UCard>
            <template #header>
                <h2 class="text-center font-bold">{{ title }}</h2>
            </template>

            <div class="flex flex-col">
                <div class="mb-5 mt-1 flex flex-col items-center">
                    <div class="mb-2 flex flex-row align-top">
                        <h3>Table Control Panel</h3>
                        <UTooltip>
                            <UButton
                                icon="i-material-symbols-info-outline-rounded"
                                size="2xs"
                                variant="link"
                                square
                            />
                            <template #text>
                                <div>
                                    Enable Selection mode to allow multiple
                                    selections.
                                </div>
                            </template>
                        </UTooltip>
                    </div>
                    <div class="my-1 flex w-full flex-row items-start">
                        <div class="flex h-[32px] flex-row items-center">
                            <h4 class="mr-2">Selection</h4>
                            <UToggle
                                v-model="allowMultipleSelection"
                                size="lg"
                            />
                            <div
                                v-if="allowMultipleSelection"
                                class="ml-3 mr-5 flex flex-row space-x-1"
                            >
                                <UButton
                                    label="Download ALL"
                                    :disabled="!allowMultipleSelection"
                                    @click="downloadAll"
                                />
                                <UButton
                                    label="Approve ALL"
                                    :disabled="!allowMultipleSelection"
                                    color="emerald"
                                    @click="approveAll"
                                />
                                <UButton
                                    label="Reject ALL"
                                    :disabled="!allowMultipleSelection"
                                    color="red"
                                    variant="outline"
                                    @click="rejectAll"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row justify-between">
                <div class="flex flex-row">
                    <!-- Refresh Button -->
                    <UButton
                        icon="i-material-symbols-refresh"
                        class="mr-2"
                        @click="updateTable"
                    />
                    <!-- Search and Filter -->
                    <div class="w-[150px]">
                        <UInput
                            v-model="searchQuery"
                            placeholder="Search..."
                            size="sm"
                            icon="i-heroicons-magnifying-glass-20-solid"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                        >
                            <template #trailing>
                                <UButton
                                    v-show="searchQuery !== ''"
                                    color="gray"
                                    variant="link"
                                    icon="i-heroicons-x-mark-20-solid"
                                    :padded="false"
                                    @click="searchQuery = ''"
                                />
                            </template>
                        </UInput>
                    </div>
                    <!-- Select Columns -->
                    <div class="ml-2 w-[200px]">
                        <USelectMenu
                            v-model="selectedColumns"
                            :options="listOfAllColumns"
                            searchable
                            searchable-placeholder="Search Columns"
                            multiple
                            placeholder="Columns"
                        />
                    </div>
                </div>
            </div>

            <!-- DATA TABLE -->

            <div v-if="!allowMultipleSelection">
                <UTable
                    v-model:sort="sort"
                    :columns="selectedColumnsTable"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="openModal"
                />
            </div>
            <div v-else>
                <UTable
                    v-model:sort="sort"
                    v-model="selectedRows"
                    :columns="selectedColumnsTable"
                    :rows="filteredRows"
                    :loading="pending"
                    :ui="{ tr: { active: 'hover:bg-gray-200' } }"
                    @select="addToSelectedRows"
                />
            </div>

            <!-- END OF DATA TABLES -->

            <!-- START OF FOOTERS -->

            <template #footer>
                <div class="my-2 flex justify-end">
                    <UPagination
                        v-model="page"
                        :page-count="pageCount"
                        :total="totalItems"
                    />
                </div>
            </template>
        </UCard>

        <UModal
            v-model="modalIsOpen"
            :ui="{ transition: { leave: 'duration-0', enter: 'duration-0' } }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                            {{
                                selectedData[listOfAllColumns[0].key] +
                                ", " +
                                selectedData[listOfAllColumns[1].key] +
                                " (" +
                                selectedData[listOfAllColumns[20].key] +
                                " - " +
                                selectedData[listOfAllColumns[21].key] +
                                ")"
                            }}
                        </h3>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="modalIsOpen = false"
                        />
                    </div>
                </template>

                <div class="ml-5 font-thin">
                    {{ selectedData["requestor-lastName"] }},
                    {{ selectedData["requestor-firstName"] }}<br />
                    {{ selectedData["gradeSection-grade"] }} -
                    {{ selectedData["gradeSection-section"] }}<br />
                    <span class="font-bold">Subject:</span>
                    {{ selectedData.forSubject }}<br />
                    <span class="font-bold">Topic:</span>
                    {{ selectedData.concurrentTopic }}<br />
                    <span class="font-bold">Unit:</span>
                    {{ selectedData["unit-name"] }}<br /><br />
                    <span class="font-bold">Supervising Teacher:</span>
                    {{ selectedData["teacherInCharge-userProfile-lastName"] }},
                    {{ selectedData["teacherInCharge-userProfile-firstName"] }}
                </div>

                <UButton
                    class="mt-3"
                    label="Download Request"
                    @click="downloadAll"
                />

                <!-- Materials Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Materials
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="material in selectedData.materialsRequested"
                                :key="material.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="basis-[180px]">
                                    {{ material.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ material.description }}
                                </div>
                                <div class="basis-[60px]">
                                    x{{ material.quantity }}
                                </div>
                            </div>
                        </div>

                        <template #footer>
                            <div class="mb-4">
                                <UTextarea
                                    v-model="materialRequestsAnnotation"
                                    :color="materialRequestsAnnotationStyle"
                                    placeholder="Annotation for rejections and revisions..."
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <UButton
                                    color="red"
                                    label="REJECT"
                                    variant="solid"
                                    icon="i-material-symbols-delete-outline"
                                    @click="
                                        signRequest(
                                            'materialRequestsAdminApproval',
                                            'REJECTED',
                                        )
                                    "
                                />
                                <UTooltip
                                    text="Set Request for Student Revision"
                                >
                                    <UButton
                                        color="blue"
                                        label="REVISE"
                                        variant="solid"
                                        icon="i-material-symbols-edit"
                                        @click="
                                            signRequest(
                                                'materialRequestsAdminApproval',
                                                'REVISION_NEEDED',
                                            )
                                        "
                                    />
                                </UTooltip>
                                <UButton
                                    color="green"
                                    label="APPROVE"
                                    variant="solid"
                                    icon="i-material-symbols-approval"
                                    @click="
                                        signRequest(
                                            'materialRequestsAdminApproval',
                                            'APPROVED',
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </UCard>
                </div>

                <!-- Equipment Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Equipment
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="equipment in selectedData.equipmentRequested"
                                :key="equipment.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="basis-[180px]">
                                    {{ equipment.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ equipment.description }}
                                </div>
                                <div class="basis-[60px]">
                                    x{{ equipment.quantity }}
                                </div>
                            </div>
                        </div>

                        <template #footer>
                            <div class="mb-4">
                                <UTextarea
                                    v-model="equipmentRequestsAnnotation"
                                    :color="equipmentRequestsAnnotationStyle"
                                    placeholder="Annotation for rejections and revisions..."
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <UButton
                                    color="red"
                                    label="REJECT"
                                    variant="solid"
                                    icon="i-material-symbols-delete-outline"
                                    @click="
                                        signRequest(
                                            'equipmentRequestsAdminApproval',
                                            'REJECTED',
                                        )
                                    "
                                />
                                <UTooltip
                                    text="Set Request for Student Revision"
                                >
                                    <UButton
                                        color="blue"
                                        label="REVISE"
                                        variant="solid"
                                        icon="i-material-symbols-edit"
                                        @click="
                                            signRequest(
                                                'equipmentRequestsAdminApproval',
                                                'REVISION_NEEDED',
                                            )
                                        "
                                    />
                                </UTooltip>
                                <UButton
                                    color="green"
                                    label="APPROVE"
                                    variant="solid"
                                    icon="i-material-symbols-approval"
                                    @click="
                                        signRequest(
                                            'equipmentRequestsAdminApproval',
                                            'APPROVED',
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Reagents Requested -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Reagents
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="reagent in selectedData.reagentsRequested"
                                :key="reagent.id"
                                class="flex justify-between border-b-2 p-3 text-sm"
                            >
                                <div class="basis-[180px]">
                                    {{ reagent.name }}
                                </div>
                                <div class="basis-[120px] text-gray-400">
                                    {{ reagent.description }}
                                </div>
                                <div class="basis-[60px]">
                                    {{ reagent.quantity }} {{ reagent.unit }}
                                </div>
                            </div>
                        </div>

                        <template #footer>
                            <div class="mb-4">
                                <UTextarea
                                    v-model="reagentRequestsAnnotation"
                                    :color="reagentRequestsAnnotationStyle"
                                    placeholder="Annotation for rejections and revisions..."
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <UButton
                                    color="red"
                                    label="REJECT"
                                    variant="solid"
                                    icon="i-material-symbols-delete-outline"
                                    @click="
                                        signRequest(
                                            'reagentRequestsAdminApproval',
                                            'REJECTED',
                                        )
                                    "
                                />
                                <UTooltip
                                    text="Set Request for Student Revision"
                                >
                                    <UButton
                                        color="blue"
                                        label="REVISE"
                                        variant="solid"
                                        icon="i-material-symbols-edit"
                                        @click="
                                            signRequest(
                                                'reagentRequestsAdminApproval',
                                                'REVISION_NEEDED',
                                            )
                                        "
                                    />
                                </UTooltip>
                                <UButton
                                    color="green"
                                    label="APPROVE"
                                    variant="solid"
                                    icon="i-material-symbols-approval"
                                    @click="
                                        signRequest(
                                            'reagentRequestsAdminApproval',
                                            'APPROVED',
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
                <!-- Laboratory Reserved -->
                <div class="mt-5">
                    <UCard>
                        <template #header>
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Laboratory
                            </h3>
                        </template>

                        <div class="mt-[-20px]">
                            <div
                                v-for="laboratory in selectedData.laboratoryReservations"
                                :key="laboratory.id"
                                class="text-sm"
                            >
                                <div class="border-b-2 p-3">
                                    {{ laboratory.laboratoryReserved.name }}
                                </div>
                                <div class="border-b-2 p-3 pl-8">
                                    <div
                                        v-for="(startDate, index) in laboratory
                                            .dates.startDate"
                                        :key="index"
                                        class="flex items-center justify-between"
                                    >
                                        <div>
                                            {{
                                                dayjs(startDate).format(
                                                    "MMM DD, YYYY",
                                                )
                                            }}
                                            -
                                            {{
                                                dayjs(
                                                    laboratory.dates.endDate[
                                                        index
                                                    ],
                                                ).format("MMM DD, YYYY")
                                            }}
                                        </div>
                                        <div>
                                            {{
                                                laboratory.time.startTime[index]
                                            }}
                                            -
                                            {{ laboratory.time.endTime[index] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <template #footer>
                            <div class="mb-4">
                                <UTextarea
                                    v-model="laboratoryReservationsAnnotation"
                                    :color="equipmentRequestsAnnotationStyle"
                                    placeholder="Annotation for rejections and revisions..."
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <UButton
                                    color="red"
                                    label="REJECT"
                                    variant="solid"
                                    icon="i-material-symbols-delete-outline"
                                    @click="
                                        signRequest(
                                            'equipmentRequestsAdminApproval',
                                            'REJECTED',
                                        )
                                    "
                                />
                                <UTooltip
                                    text="Set Request for Student Revision"
                                >
                                    <UButton
                                        color="blue"
                                        label="REVISE"
                                        variant="solid"
                                        icon="i-material-symbols-edit"
                                        @click="
                                            signRequest(
                                                'equipmentRequestsAdminApproval',
                                                'REVISION_NEEDED',
                                            )
                                        "
                                    />
                                </UTooltip>
                                <UButton
                                    color="green"
                                    label="APPROVE"
                                    variant="solid"
                                    icon="i-material-symbols-approval"
                                    @click="
                                        signRequest(
                                            'equipmentRequestsAdminApproval',
                                            'APPROVED',
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </UCard>
                </div>
            </UCard>
        </UModal>
    </div>
</template>
