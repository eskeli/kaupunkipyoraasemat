import React from 'react';
import TextField from '@material-ui/core/TextField';

export function TimeNow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var localDatetime = year + "-" +
                    (month < 10 ? "0" + month.toString() : month) + "-" +
                    (day < 10 ? "0" + day.toString() : day) + "T" +
                    (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                    (minute < 10 ? "0" + minute.toString() : minute);
  return localDatetime;
}


export function DateAndTimePicker({ id, label, onChangeHandler, defaultDate}) {
  return (
    <form className={"datetime-local"} noValidate>
      <TextField
        id={id}
        label={label}
        type="datetime-local"
        defaultValue={defaultDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChangeHandler}
      />
    </form>
  );
}