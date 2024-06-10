export default function editDoctor(
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!setAction) return;
  setAction("editForm");
  console.log("doctor-edit-id", id);
}
