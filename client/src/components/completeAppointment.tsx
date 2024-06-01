import { Appointment } from "../contexts/adminUserContext";

export const completeAppointment = (appointments: Appointment[] | null) => {
  const isCompleted = appointments?.filter(
    (appointment) => appointment.status.toLocaleLowerCase() === "completed",
  );
  return isCompleted;
};
