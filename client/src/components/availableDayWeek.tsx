import { Doctor } from "../contexts/doctorUserContext";
export const availableDaysOfWeek = (doctorDetails: Doctor) => {
  if (!doctorDetails) return;
  let currentDate = new Date(doctorDetails?.startDate);
  let endDate = new Date(doctorDetails?.endDate);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const availableDaysOfWeek = [];
  while (currentDate <= endDate) {
    const dayIndex = currentDate.getDay();
    availableDaysOfWeek.push(daysOfWeek[dayIndex]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return (
    <div className="flex gap-2">
      {availableDaysOfWeek.map((day) => (
        <div
          className="bg-[#d1d5db] flex items-center justify-center p-1"
          key={day}
        >
          <p className="font-semibold">{day}</p>
        </div>
      ))}
    </div>
  );
};
