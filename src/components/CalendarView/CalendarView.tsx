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
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getCurrentDate } from "../common/getCurrentDate";
import { useEffect, useState } from "react";
import { getEvents } from "../../utils/fetchData";


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
        {data && (
          <Scheduler data={data} locale={"poland"}>
            <ViewState currentDate={getCurrentDate()} />
            <EditingState
              onCommitChanges={(changes) => console.log(changes.added)}
            />
            <IntegratedEditing />
            {chooseFormat(format)}
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        )}
      </Paper>
    </div>
  );
};
