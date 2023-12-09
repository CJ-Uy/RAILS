import dayjs from "dayjs";

export default function formatDates(allDates) {
    // Initialize Laboratory Reservation Request
    const formatedDates = [];
    for (const dates of allDates) {
        for (const date of dates.requestDates) {
            const startDatTime = dayjs(date)
                .set("hour", dates.inclusiveTimeOfUse[0].hours)
                .set("minute", dates.inclusiveTimeOfUse[0].minutes);
            const endDateTime = dayjs(date)
                .set("hour", dates.inclusiveTimeOfUse[1].hours)
                .set("minute", dates.inclusiveTimeOfUse[1].minutes);
            formatedDates.push({
                startDateTime: startDatTime.format(),
                endDateTime: endDateTime.format(),
            });
        }
    }
    return formatedDates;
}
