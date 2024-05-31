export default function editDoctor(
  setAction: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  setAction("editForm");
  console.log("doctor-edit-id", id);
}
