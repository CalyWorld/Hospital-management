import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setDoctors } from "../redux/doctorAndPatientSlice";
import { resetActionForm } from "../redux/actionFormSlice";
import { SelectedId } from "./EditDoctorDetailsForm";
import { buildApiUrl } from "../config/api";
import Cookies from "js-cookie";
import { useState } from "react";

export default function DeleteDoctor({ selectedId }: SelectedId) {
  const dispatch: AppDispatch = useDispatch();
  const doctors = useSelector(
    (state: RootState) => state.doctorAndPatientUser.doctors,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const doctorId = selectedId;
  const doctor = doctors.filter((row) => row._id === doctorId);

  if (doctor.length === 0) return;

  async function handleDoctorDelete() {
    const selectedDoctor = doctors.filter((row) => row._id !== doctorId);
    if (!selectedId) return;
    try {
      setSubmitting(true);
      setError(null);
      const token = Cookies.get("token");
      const response = await fetch(buildApiUrl(`/api/admin/doctor/${doctorId}/delete`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Failed to delete doctor.");
        return;
      }
      dispatch(setDoctors(selectedDoctor));
      dispatch(resetActionForm());
    } catch (error) {
      console.error("Error deleting doctor:", error);
      setError("Unexpected error while deleting doctor.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-md p-4 w-full">
      <div className="mb-16">
        {" "}
        <h2 className="text-black text-lg font-bold mb-4">{`Delete ${doctor[0]?.firstName} ${doctor[0]?.lastName}`}</h2>
        <p className="text-black mb-4">
          Are you sure you want to delete this user?
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="text-black py-2 px-4 rounded"
          onClick={() => {
            dispatch(resetActionForm());
          }}
        >
          Cancel
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
          className="bg-darkBlue text-white py-2 px-4 rounded disabled:opacity-60"
          disabled={submitting}
          onClick={() => {
            handleDoctorDelete();
          }}
        >
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
