<script setup>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "../node_modules/vue-simple-calendar/dist/style.css";

const showDate = ref();
function setShowDate(date) {
    showDate.value = date;
}
</script>
<template>
    <div class="h-[75vh]">
        <UContainer class="h-full">
            <CalendarView :show-date="showDate" class="mx-auto h-full w-[90%]">
                <template #header="{ headerProps }">
                    <CalendarViewHeader
                        :header-props="headerProps"
                        @input="setShowDate"
                    />
                </template>
            </CalendarView>
        </UContainer>
    </div>
</template>
