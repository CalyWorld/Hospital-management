import { useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { resetActionForm } from "../redux/actionFormSlice";
import { buildApiUrl } from "../config/api";
import { fetchDoctorAppointmentsThunk } from "../redux/appointmentsSlice";

interface BookAppointmentProps {
  selectedId: string;
}

export default function BookAppointment({ selectedId }: BookAppointmentProps) {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("Consultation");
  const [patientId, setPatientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const doctors = useSelector(
    (state: RootState) => state.doctorAndPatientUser.doctors,
  );
  const patients = useSelector(
    (state: RootState) => state.doctorAndPatientUser.patients,
  );

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor._id === selectedId),
    [doctors, selectedId],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!patientId || !startDate || !endDate || !title.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      const token = Cookies.get("token");
      const response = await fetch(buildApiUrl("/api/admin/appointment"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          doctorId: selectedId,
          patientId,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        }),
      });

      if (!response.ok) {
        const responseData = await response.json().catch(() => ({}));
        setError(responseData.message || "Failed to create appointment.");
        return;
      }

      dispatch(fetchDoctorAppointmentsThunk(selectedId));
      dispatch(resetActionForm());
    } catch {
      setError("Unexpected error while creating appointment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="rounded-md p-4 w-full" onSubmit={onSubmit}>
      <h2 className="text-black text-lg font-bold mb-4">
        {`Book appointment${selectedDoctor ? ` for Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}` : ""}`}
      </h2>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-black">
          Title
          <input
            className="border border-gray-300 rounded px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Consultation"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-black">
          Patient
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          >
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient._id ?? patient.id} value={patient._id ?? ""}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-black">
          Start
          <input
            className="border border-gray-300 rounded px-2 py-1"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-black">
          End
          <input
            className="border border-gray-300 rounded px-2 py-1"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex justify-end gap-2 mt-5">
        <button
          type="button"
          className="text-black py-2 px-4 rounded"
          onClick={() => dispatch(resetActionForm())}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-darkBlue text-white py-2 px-4 rounded disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Booking..." : "Book"}
        </button>
      </div>
    </form>
  );
}
