import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";

export default function DateTimeRangePicker(props){
  const { handleChange } = props;
  const [start, setStart] = useState(moment().subtract(1, 'hours'));
  const [end, setEnd] = useState(moment());

  const currentDateTime = () => {
    return { start, end };
  }

  const handleStartChange = date => {
    setStart(date);
    handleChange(currentDateTime());
  };

  const handleEndChange = date => {
    setEnd(date);
    handleChange(currentDateTime());
  }

  return (
    <div className="pickers">
        <DateTimePicker
          value={start}
          onChange={handleStartChange}
          label="Alkaen"
          showTodayButton
        />
        <DateTimePicker
          value={end}
          onChange={handleEndChange}
          label="Loppuen"
          showTodayButton
        />
    </div>
  )
}

