import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);
const timeZone = dayjs.tz.guess();
function DateComponent({ datetime }: { datetime: string }) {
  return (
    <> {dayjs.utc(datetime).tz(timeZone).format("DD MMM YYYY HH:mm A")} </>
  );
}

export default DateComponent;
