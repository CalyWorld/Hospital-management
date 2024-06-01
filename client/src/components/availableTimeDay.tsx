import { Doctor } from "../contexts/doctorUserContext";
export const availableTimeOfDay = (doctorDetails: Doctor | null) => {
  if (!doctorDetails) return;
  const doctorStartTime = new Date(doctorDetails.startTime);
  const doctorEndTime = new Date(doctorDetails.endTime);

  const formattedStartTime = doctorStartTime.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const formattedEndTime = doctorEndTime.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return <div>{`${formattedStartTime} - ${formattedEndTime}`}</div>;
};
