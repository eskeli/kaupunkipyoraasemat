import React from "react";
import { DateTimePicker } from "material-ui-pickers";

function DateTimeInterval({ timeFrom, timeTo, handleDateChange }) {
  return (
    <>
      <div className="picker">
        <DateTimePicker
          value={timeFrom}
          onChange={handleDateChange}
          label="Alkaen"
          showTodayButton
        />
      </div>
      <div className="picker">
        <DateTimePicker
          value={timeTo}
          onChange={handleDateChange}
          label="Loppuen"
          showTodayButton
        />
      </div>
    </>
  );
}

export default DateTimeInterval;
