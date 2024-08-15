import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
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
  DateNavigator,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useEffect, useState } from "react";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../utils/fetchData";

export const CalendarView = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      setData(await getEvents());
    })();
  }, []);

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

  const translations = {
    deleteButton: "usuń",
    cancelButton: "anuluj",
    confirmCancelMessage: "na pewno anulować?",
    confirmDeleteMessage: "na pewno usunąć?",
  };

  return (
    <div style={{ width: "900px", height: "800px" }}>
      <Paper>
        {data && (
          <Scheduler data={data} locale={"pl"}>
            <ViewState />
            <EditingState onCommitChanges={(changes) => addNewEvent(changes)} />
            <IntegratedEditing />
            <Toolbar />
            <ViewSwitcher/>
            <DateNavigator />
            <DayView startDayHour={9} endDayHour={16} name="Dzień"/>
            <WeekView startDayHour={9} endDayHour={16} name="Tydzień"/>
            <MonthView name="Miesiąc"/>
            <ConfirmationDialog messages={translations} />
            <Appointments />
            <TodayButton messages={{ today: "Dziś" }} />
            <AllDayPanel messages={{ allDay: "Cały dzień" }} />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm messages={{titleLabel: 'nazwa', detailsLabel:'Szczegóły', notesLabel: 'notatki', moreInformationLabel:'Wiecej informacji'}}/>
          </Scheduler>
        )}
      </Paper>
    </div>
  );
};
