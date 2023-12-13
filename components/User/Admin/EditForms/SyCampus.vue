<script setup>
const schoolYears = await useFetch("/api/db/rawData/getAllSY");

const currentSchoolYear = ref();

for (const schoolYear of schoolYears.data.value) {
    if (schoolYear.currentSchoolYear) {
        currentSchoolYear.value = schoolYear;
    }
}

const startingColumns = [
    {
        key: "yearStart",
        label: "SY Start",
        sortable: true,
    },
    {
        key: "yearEnd",
        label: "SY End",
        sortable: true,
    },
    {
        key: "currentSchoolYear",
        label: "Current",
        sortable: true,
    },
    {
        key: "laboratoryRequestControlNumberCounter",
        label: "Laboratory Resv",
        sortable: true,
    },
    {
        key: "materialEquipmentRequestControlNumberCounter",
        label: "Mat & Equip Requests",
        sortable: true,
    },
    {
        key: "reagentRequestControlNumberCounter",
        label: "Reagent Requests",
        sortable: true,
    },
];

const listOfAllColumns = [
    {
        key: "yearStart",
        label: "SY Start",
        sortable: true,
    },
    {
        key: "yearEnd",
        label: "SY End",
        sortable: true,
    },
    {
        key: "currentSchoolYear",
        label: "Current",
        sortable: true,
    },
    {
        key: "laboratoryRequestControlNumberCounter",
        label: "Laboratory Resv",
        sortable: true,
    },
    {
        key: "materialEquipmentRequestControlNumberCounter",
        label: "Mat & Equip Requests",
        sortable: true,
    },
    {
        key: "reagentRequestControlNumberCounter",
        label: "Reagent Requests",
        sortable: true,
    },
    {
        key: "campus",
        label: "Campus",
        sortable: true,
    },
];

const selectedData = ref();
function selectedRow(data) {
    selectedData.value = data;
}

const editModeIsOpen = ref(false);
function toggleEditModal() {
    editModeIsOpen.value = !editModeIsOpen.value;
}
</script>

<template>
    <div>
        <UContainer class="text-center">
            <div
                class="my-10 flex flex-row items-center justify-center space-x-10"
            >
                <UCard class="w-[30%]">
                    <template #header>
                        <h1 class="font-bold">CURRENT SCHOOL YEAR</h1>
                    </template>
                    <div class="text-lg font-bold text-red-500">
                        S.Y. {{ currentSchoolYear.yearStart }} -
                        {{ currentSchoolYear.yearEnd }}
                    </div>
                </UCard>
                <UCard class="w-[30%]">
                    <template #header>
                        <h1 class="font-bold">CURRENT CAMPUS</h1>
                    </template>
                    <div class="text-lg font-bold text-red-500">
                        {{ currentSchoolYear.campus }}
                    </div>
                </UCard>
            </div>
            <div>
                <!-- TABLE OF SCHOOL YEARS -->
                <TablesInventory
                    title="LIST OF SCHOOL YEARS"
                    default-sort-key="yearStart"
                    :startingColumns="startingColumns"
                    :listOfAllColumns="listOfAllColumns"
                    :editModeIsOpen="editModeIsOpen"
                    fetch-path="/api/db/rawData/getAllSY"
                    @selectedRow="selectedRow"
                    allowed-editing="true"
                >
                    <template #detailsModal>
                        <UCard>
                            <template #header> </template>
                            <div>{{ selectedData }}</div>
                            <template #footer>
                                <UButton
                                    label="EDIT"
                                    @click="toggleEditModal()"
                                />
                            </template>
                        </UCard>
                    </template>
                    <template #editModeModal>
                        <UCard>
                            <div>EDITING MODE</div>
                        </UCard>
                    </template>
                </TablesInventory>
            </div>
        </UContainer>
    </div>
</template>
