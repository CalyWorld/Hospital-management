import { Appointment } from "../contexts/adminUserContext";

export const scheduledAppointMent = (appointments: Appointment[] | null) => {
  const isScheduled = appointments?.filter(
    (appointment) =>
      appointment.status.toLocaleLowerCase() === "scheduled" || "canceled",
  );
  return isScheduled;
};
