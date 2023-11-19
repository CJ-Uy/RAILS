<script setup>
import dayjs from "dayjs";
import test from "@/components/Tables/test.vue";

const user = inject("user");

const { pending, data: allEquipment } = await useLazyFetch(
    "/api/db/rawData/getAllEquipment",
);
</script>

<template>
    <div>
        <h1>EQUIPMENT</h1>
        <TablesInventory title="Hello" modal-content="UserAdminNavBar">
            <template #modal-content>
                <div>"THIS IS A MODAL"</div>
            </template>
        </TablesInventory>
    </div>
</template>
