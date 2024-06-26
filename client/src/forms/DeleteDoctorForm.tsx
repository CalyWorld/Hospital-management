import { TableProps } from "../components/tableProps";

export default function DeleteDoctor({
  setActionForm,
  selectedId,
  setSelectedId,
  doctors,
  setDoctor,
}: TableProps) {
  if (!setActionForm || !setSelectedId) return;

  const doctorId = selectedId;
  const doctor = doctors?.filter((doctor) => doctor._id === doctorId);

  if (!doctor) return;
  async function handleDoctorDelete() {
    const selectedDoctor = doctors?.filter((doctor) => doctor._id !== doctorId);
    if (!setActionForm || !setSelectedId || !setDoctor || !selectedDoctor)
      return;
    try {
      await fetch(`http://localhost:3000/api/admin/doctor/${doctorId}/delete`, {
        method: "DELETE",
      });
      setDoctor(selectedDoctor);
      setActionForm("");
      setSelectedId("");
    } catch (error) {
      console.error("Error deleting doctor:", error);
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
            setActionForm("");
            setSelectedId("");
          }}
        >
          Cancel
        </button>
        <button
          className="bg-darkBlue text-white py-2 px-4 rounded"
          onClick={() => {
            handleDoctorDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
