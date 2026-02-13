interface BookAppointmentProps {
  selectedId: string;
}

export default function BookAppointment({ selectedId }: BookAppointmentProps) {
  return (
    <div className="shadow-lg bg-[white] rounded-md  p-4 w-96">
      {`book appointment for ${selectedId}`}
    </div>
  );
}
