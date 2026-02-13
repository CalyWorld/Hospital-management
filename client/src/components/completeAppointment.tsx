import { Appointments } from "../types";

export const completeAppointment = (appointments: Appointments[]) => {
  const isCompleted = appointments?.filter(
    (appointment) => appointment.status.toLocaleLowerCase() === "completed",
  );
  return isCompleted;
};
