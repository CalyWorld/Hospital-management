import { Appointments } from "../types";

export const scheduledAppointMent = (appointments: Appointments[]) => {
  const isScheduled = appointments?.filter(
    (appointment) =>
      ["scheduled", "canceled"].includes(appointment.status.toLowerCase()),
  );
  return isScheduled;
};
