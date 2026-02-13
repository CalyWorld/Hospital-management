import { Appointments } from "../types";

export const scheduledAppointMent = (appointments: Appointments[]) => {
  const isScheduled = appointments?.filter(
    (appointment) =>
      appointment.status.toLocaleLowerCase() === "scheduled" || "canceled",
  );
  return isScheduled;
};
