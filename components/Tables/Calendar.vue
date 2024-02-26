<script setup>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import dayjs from "dayjs";

const showDate = ref();
const parsedDate = ref();
const monthName = ref();
function setShowDate(date) {
    showDate.value = date;
    parsedDate.value = dayjs(showDate.value);
    monthName.value = parsedDate.value.format("MMMM YYYY");
}

// Get all completed reservations
const reservations = await useFetch(
    "/api/db/calendar/getCompletedReservations",
);
const reservationsValue = ref();
reservationsValue.value = reservations.data.value;

// Adding calendar items
const items = ref([]);
for (const i in reservationsValue.value) {
    const reservation = ref(reservationsValue.value[i]);
    for (const j in reservation.value.dates.startDate) {
        items.value.push({
            id: i.toString() + j.toString(),
            startDate:
                reservation.value.dates.startDate[j] +
                " " +
                reservation.value.time.startTime[j],
            endDate:
                reservation.value.dates.endDate[j] +
                " " +
                reservation.value.time.endTime[j],
            title: " ",
            style:
                "background-color: " +
                reservation.value.laboratoryReserved.colorCode +
                "; border: 1px solid white;",
            reservation: reservation.value,
            colorCode: reservation.value.laboratoryReserved.colorCode,
        });
    }
}
console.log(items.value);

// Allow hover effects
const allowHoverEvents = ref(true);
// When hovering an item
function itemHoverEnter(hoveredItem) {
    const item = ref(
        items.value.find((a) => {
            return a.id === hoveredItem.id;
        }),
    );
    item.value.title = item.value.reservation.laboratoryReserved.name;
    item.value.style = item.value.style + "z-index: 1;";
}
// When leaving hover
function itemHoverLeave(hoveredItem) {
    const item = ref(
        items.value.find((a) => {
            return a.id === hoveredItem.id;
        }),
    );
    item.value.title = " ";
    item.value.style = item.value.style + "z-index: 0;";
}
// When clicking on an item
const checkItemModalIsOpen = ref(false);
const reservation = ref();
function checkItem(item) {
    reservation.value = ref(item);
    console.log(reservation.value);
    checkItemModalIsOpen.value = true;
}
</script>
<template>
    <div class="h-[75vh]">
        <UContainer class="h-full">
            <CalendarView
                :show-date="showDate"
                :current-period-label="monthName"
                :items="items"
                :do-emit-item-mouse-events="allowHoverEvents"
                item-top="3.3em"
                item-content-height="20px"
                class="mx-auto h-full w-[90%]"
                @item-mouseenter="itemHoverEnter"
                @item-mouseleave="itemHoverLeave"
                @click-item="checkItem"
            >
                <template #header="{ headerProps }">
                    <CalendarViewHeader
                        :header-props="headerProps"
                        previous-period-label="◀"
                        next-period-label="▶"
                        @input="setShowDate"
                    />
                </template>
            </CalendarView>
        </UContainer>
        <!-- Display reservation ID, date created, start time/end time, unit, subject, grade section -->
        <UModal v-model="checkItemModalIsOpen">
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <div
                            class="flex h-[32px] w-[200px] items-center justify-between rounded-[40px] p-3 text-[0.8em] text-white"
                            :style="
                                'background-color: ' +
                                reservation.value.originalItem.colorCode +
                                '!important;'
                            "
                        >
                            <div class="font-thin">
                                {{
                                    dayjs(reservation.value.startDate).format(
                                        "MMMM",
                                    )
                                }}
                            </div>
                            <div class="font-black">
                                {{
                                    dayjs(reservation.value.startDate).format(
                                        "DD",
                                    )
                                }}
                            </div>
                            -
                            <div class="font-thin">
                                {{
                                    dayjs(reservation.value.endDate).format(
                                        "MMMM",
                                    )
                                }}
                            </div>
                            <div class="font-black">
                                {{
                                    dayjs(reservation.value.endDate).format(
                                        "DD",
                                    )
                                }}
                            </div>
                        </div>
                        <UButton
                            color="red"
                            variant="outline"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="checkItemModalIsOpen = false"
                        />
                    </div>
                </template>
                <div class="flex flex-col px-3 leading-7">
                    <div class="flex justify-between">
                        <div>Reservation ID:</div>
                        <div>
                            {{ reservation.value.originalItem.reservation.id }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Created:</div>
                        <div>
                            {{
                                dayjs(
                                    reservation.value.originalItem.reservation
                                        .createdAt,
                                ).format("MMMM DD, YYYY")
                            }}
                        </div>
                    </div>
                    <br />
                    <div class="flex justify-between">
                        <div>Laboratory:</div>
                        <div>{{ reservation.value.title }}</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Start Time - End Time:</div>
                        <div>
                            {{
                                dayjs(reservation.value.startDate).format(
                                    "HH : mm",
                                )
                            }}
                            -
                            {{
                                dayjs(reservation.value.endDate).format(
                                    "HH : mm",
                                )
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Unit:</div>
                        <div>
                            {{
                                reservation.value.originalItem.reservation
                                    .laboratoryRequest.unit.name
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Subject:</div>
                        <div>
                            {{
                                reservation.value.originalItem.reservation
                                    .laboratoryRequest.forSubject
                            }}
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div>Grade & Section:</div>
                        <div>
                            {{
                                reservation.value.originalItem.reservation
                                    .laboratoryRequest.gradeSection.grade
                            }}
                            -
                            {{
                                reservation.value.originalItem.reservation
                                    .laboratoryRequest.gradeSection.section
                            }}
                        </div>
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>
<style>
.cv-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
}
.cv-wrapper,
.cv-wrapper div {
    box-sizing: border-box;
    line-height: 1em;
    font-size: 1em;
}
.cv-header-days {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    flex-flow: row nowrap;
    border-width: 0 0 0 1px;
}
.cv-header-day {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-width: 1px 1px 0 0;
}
.cv-weeks {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    flex-flow: column nowrap;
    border-width: 0 0 1px 1px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.cv-weeknumber {
    width: 2rem;
    position: relative;
    text-align: center;
    border-width: 1px 1px 0 0;
    border-style: solid;
    line-height: 1;
}
.cv-week {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    flex-flow: row nowrap;
    min-height: 3em;
    border-width: 0;
    position: relative;
    width: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
}
.cv-weekdays {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    flex-flow: row nowrap;
    direction: ltr;
    position: relative;
    overflow-y: auto;
    scrollbar-width: none;
}
.cv-day {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    position: relative;
    position: sticky;
    top: 0;
    border-width: 1px 1px 0 0;
    direction: initial;
}
.cv-day-number {
    height: auto;
    align-self: flex-start;
}
.cv-day-number:hover:after {
    position: absolute;
    top: 1rem;
    background-color: var(--cal-holiday-bg, #f7f7f7);
    border: var(--cal-holiday-border, 1px solid #f0f0f0);
    box-shadow: 0.1rem 0.1rem 0.2rem
        var(--cal-holiday-shadow, rgba(0, 0, 0, 0.25));
    padding: 0.2rem;
    margin: 0.5rem;
    line-height: 1.2;
}
.cv-day[draggable],
.cv-item[draggable] {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}
.cv-item {
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f7f7f7;
    border-width: 1px;
    direction: initial;
}
.cv-wrapper.wrap-item-title-on-hover .cv-item:hover {
    white-space: normal;
    z-index: 1;
}
.cv-header-days,
.cv-header-day,
.cv-weeks,
.cv-week,
.cv-day,
.cv-item {
    border-style: solid;
    border-color: #ddd;
}
.cv-item .endTime:before {
    content: "-";
}
.cv-header-day,
.cv-day-number,
.cv-item {
    padding: 0.2em;
}
.cv-day-number:before {
    margin-right: 0.5em;
}
.cv-item.offset0 {
    left: 0;
}
.cv-item.offset1 {
    left: calc((100% / 7));
}
.cv-item.offset2 {
    left: calc((200% / 7));
}
.cv-item.offset3 {
    left: calc((300% / 7));
}
.cv-item.offset4 {
    left: calc((400% / 7));
}
.cv-item.offset5 {
    left: calc((500% / 7));
}
.cv-item.offset6 {
    left: calc((600% / 7));
}
.cv-item.span1 {
    width: calc((90% / 7) - 0.05em);
}
.cv-item.span2 {
    width: calc((190% / 7) - 0.05em);
}
.cv-item.span3 {
    width: calc((290% / 7) - 0.05em);
}
.cv-item.span4 {
    width: calc((390% / 7) - 0.05em);
}
.cv-item.span5 {
    width: calc((490% / 7) - 0.05em);
}
.cv-item.span6 {
    width: calc((590% / 7) - 0.05em);
}
.cv-item.span7 {
    width: calc((690% / 7) - 0.05em);
}
.cv-weeks::-webkit-scrollbar,
.cv-weekdays::-webkit-scrollbar {
    width: 0;
    background: transparent;
}
.cv-header {
    display: flex;
    flex: 0 1 auto;
    flex-flow: row nowrap;
    align-items: center;
    min-height: 2.5em;
    border-width: 1px 1px 0 1px;
}
.cv-header .periodLabel {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row nowrap;
    min-height: 1.5em;
    line-height: 1;
    font-size: 1.5em;
}
.cv-header,
.cv-header button {
    border-style: solid;
    border-color: #ddd;
}
.cv-header-nav,
.cv-header .periodLabel {
    margin: 0.1em 0.6em;
}
.cv-header-nav button,
.cv-header .periodLabel {
    padding: 0.4em 0.6em;
}
.cv-header button {
    box-sizing: border-box;
    line-height: 1em;
    font-size: 1em;
    border-width: 1px;
}

/* Custom CSS Below */

* {
    box-sizing: border-box;
}
.cv-header .periodLabel {
    display: none;
}
.cv-header {
    border: none !important;
    margin-bottom: 15px;
}
.cv-header-nav {
    margin-left: auto;
    margin-right: auto;
}
.previousYear,
.nextYear {
    display: none;
}
.cv-header-nav {
    display: block;
    width: "100%" !important;
}
.currentPeriod {
    display: inline-block;
    width: 180px;
    height: 50px;
    background-color: rgb(239 68 68);
    color: white;
    font-weight: 900;
    font-size: 18px !important;
    border-radius: 15px;
    cursor: default !important;
}
.nextPeriod {
    border: none !important;
    color: rgb(37, 37, 37);
    font-size: 23px !important;
}
.previousPeriod {
    border: none !important;
    color: rgb(37, 37, 37);
    font-size: 23px !important;
}

.cv-header-days {
    border: none !important;
    margin-bottom: 10px;
}
.cv-header-day {
    border: none !important;
    margin-bottom: 5px;
    font-size: 14px !important;
    color: rgb(20, 36, 94);
    font-weight: 900;
}
.cv-day {
    padding: 5px !important;
    color: rgb(20, 36, 94);
    font-weight: 500;
}
.dow0,
.dow6 {
    color: rgb(239 68 68);
}
.outsideOfMonth {
    color: lightgray;
}
.cv-item {
    border-radius: 0 20px 20px 0;
    border: none;
    height: 20px;
    cursor: pointer;
    font-size: 0.6em !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 2px solid white;
    border-bottom: 5px !important;
}
</style>
