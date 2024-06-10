import { TableProps } from "../pages/Doctor/DoctorsTable";

export default function DeleteDoctor({ setActionForm }: TableProps) {
  if (!setActionForm) return;
  return (
    <div
      className="fixed shadow-lg bg-[white] rounded-md  p-4 w-96"
      style={{ top: "50%", left: "55%", transform: "translate(-50%, -50%)" }}
    >
      <h2 className="text-black text-lg font-bold mb-4">Delete User</h2>
      <p className="text-black mb-4">
        Are you sure you want to delete this user?
      </p>
      <div className="flex justify-end gap-2">
        <button className="bg-darkBlue text-white py-2 px-4 rounded">
          Delete
        </button>
        <button
          className="bg-darkBlue text-white py-2 px-4 rounded"
          onClick={() => {
            setActionForm("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
