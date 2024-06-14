import { TableProps } from "../pages/Doctor/DoctorsTable";

export default function BookAppointment({ setActionForm }: TableProps) {
  if (!setActionForm) return;
  return (
    <div className="shadow-lg bg-[white] rounded-md  p-4 w-96">
      book appointment
    </div>
  );
}
