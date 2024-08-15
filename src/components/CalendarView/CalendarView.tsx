import Paper from "@mui/material/Paper";
import {
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  MonthView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getCurrentDate } from "../common/getCurrentDate";
import { useState } from "react";

const schedulerData = [
  {
    startDate: "2024-08-15T09:45",
    endDate: "2024-08-15T11:00",
    title: "Meeting",
  },
  {
    startDate: "2024-08-15T12:00",
    endDate: "2024-08-15T13:30",
    title: "Go to a gym",
  },
];

export const CalendarView = () => {
  const [format, setFormat] = useState<string>("Day");

  const chooseFormat = (format: string) => {
    switch (format) {
      case "Day":
        return <DayView startDayHour={9} endDayHour={14} />;
      case "Week":
        return <WeekView startDayHour={9} endDayHour={14} />;
      case "Month":
        return <MonthView />;
    }
  };

  return (
    <div style={{ width: "900px", height: "800px" }}>
      <div>
        <button onClick={() => setFormat("Day")}>Day</button>
        <button onClick={() => setFormat("Week")}>Week</button>
        <button onClick={() => setFormat("Month")}>Month</button>
      </div>
      <Paper>
        <Scheduler data={schedulerData} locale={"poland"}>
          <ViewState currentDate={getCurrentDate()} />
          {chooseFormat(format)}
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
};
