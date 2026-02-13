import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DateCalendarValue from "../../components/calendar";
import { useAdminUser } from "../../contexts/adminUserContext";

type Filter = "all" | "scheduled" | "completed" | "canceled";

export default function AppointmentsHomePage() {
  const { useGetPatientAppointmentsByDateTime } = useAdminUser();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [filter, setFilter] = React.useState<Filter>("all");

  const selectedDate = (value ?? dayjs()).format("YYYY-MM-DD");
  const appointments = useGetPatientAppointmentsByDateTime(selectedDate);
  const loading = appointments === null;

  const filteredAppointments = React.useMemo(() => {
    if (!appointments) {
      return [];
    }
    if (filter === "all") {
      return appointments;
    }
    if (filter === "canceled") {
      return appointments.filter((appointment) =>
        ["canceled", "cancelled"].includes(appointment.status.toLowerCase()),
      );
    }
    return appointments.filter(
      (appointment) => appointment.status.toLowerCase() === filter,
    );
  }, [appointments, filter]);

  return (
    <div className="max-w-full lg:flex gap-6 m-10">
      <div className="bg-white shadow rounded-md p-3 h-fit">
        <DateCalendarValue value={value} setValue={setValue} />
      </div>

      <div className="flex-1 bg-white shadow rounded-md p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold">Appointments</h2>
            <p className="text-darkGray">
              {dayjs(selectedDate).format("MMMM D, YYYY")}
            </p>
          </div>

          <select
            className="border rounded-md p-2 bg-white"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredAppointments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredAppointments
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
              )
              .map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-md border border-gray-200 p-4 flex flex-col gap-1"
                >
                  <p className="font-semibold">{appointment.title}</p>
                  <p className="text-sm text-darkGray">
                    {`${dayjs(appointment.startDate).format("hh:mm A")} - ${dayjs(
                      appointment.endDate,
                    ).format("hh:mm A")}`}
                  </p>
                  <p className="text-sm">
                    {`${appointment.patient.firstName} ${appointment.patient.lastName}`}{" "}
                    with{" "}
                    <span className="font-semibold">
                      {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                    </span>
                  </p>
                  <p className="text-sm capitalize text-darkGray">
                    Status: {appointment.status}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center text-darkGray py-8">
            No appointments found for this date.
          </div>
        )}
      </div>
    </div>
  );
}
