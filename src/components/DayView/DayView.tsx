import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getCurrentDate } from "../common/getCurrentDate";

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

export const DayViewCalendar = () => {
  return (
    <div style={{ width: "600px", backgroundColor: "red" }}>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState currentDate={getCurrentDate()} />
          <EditingState onCommitChanges={() => console.log("ok")} />
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={14} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
};
