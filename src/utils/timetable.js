// src/utils/timetable.js
export const generateTimetable = (startHour, endHour) => {
    const timetable = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timetable.push(`${hour}:00 AM`);
      timetable.push(`${hour}:30 AM`);
    }
    timetable.push(`${endHour}:00 PM`);
    return timetable;
  };
  