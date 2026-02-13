import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setPatients } from "../redux/doctorAndPatientSlice";
import { resetActionForm } from "../redux/actionFormSlice";
import { buildApiUrl } from "../config/api";

interface SelectedId {
  selectedId: string;
}

export default function DeletePatientForm({ selectedId }: SelectedId) {
  const dispatch: AppDispatch = useDispatch();
  const patients = useSelector(
    (state: RootState) => state.doctorAndPatientUser.patients,
  );

  const patient = patients.find((row) => row._id === selectedId);

  async function handlePatientDelete() {
    if (!selectedId) {
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`/api/admin/patient/${selectedId}/delete`),
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return;
      }

      const nextPatients = patients.filter((row) => row._id !== selectedId);
      dispatch(setPatients(nextPatients));
      dispatch(resetActionForm());
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  }

  return (
    <div className="rounded-md p-4 w-full">
      <div className="mb-16">
        <h2 className="text-black text-lg font-bold mb-4">
          {`Delete ${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`}
        </h2>
        <p className="text-black mb-4">Are you sure you want to delete this user?</p>
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
        <button
          className="bg-darkBlue text-white py-2 px-4 rounded"
          onClick={() => {
            handlePatientDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
