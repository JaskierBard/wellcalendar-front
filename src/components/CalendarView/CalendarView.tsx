import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  MonthView,
  Toolbar,
  WeekView,
  Appointments,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { getCurrentDate } from "../common/getCurrentDate";
import { useEffect, useState } from "react";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../utils/fetchData";

export const CalendarView = () => {
  const [data, setData] = useState<any>();
  const [format, setFormat] = useState<string>("Day");

  useEffect(() => {
    (async () => {
      setData(await getEvents());
    })();
  }, []);

  const chooseFormat = (format: string) => {
    switch (format) {
      case "Day":
        return <DayView startDayHour={9} endDayHour={16} />;
      case "Week":
        return <WeekView startDayHour={9} endDayHour={16} />;
      case "Month":
        return <MonthView />;
    }
  };

  const addNewEvent = async (changes: any) => {
    if (changes.added) {
      await addEvent(changes.added);
      setData(await getEvents());
    } else if (changes.changed) {
      await updateEvent(changes.changed);
      setData(await getEvents());
    } else if (changes.deleted) {
      await deleteEvent(changes.deleted);
      setData(await getEvents());
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
        {data && (
          <Scheduler data={data} locale={"poland"}>
            <ViewState currentDate={getCurrentDate()}/>
            <EditingState onCommitChanges={(changes) => addNewEvent(changes)} />
            <IntegratedEditing />
            <Toolbar />
            <DateNavigator />
            {chooseFormat(format)}
            <ConfirmationDialog />
            <Appointments />
            <TodayButton/>
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        )}
      </Paper>
    </div>
  );
};
