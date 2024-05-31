export default function deleteDoctor(
  setAction: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  setAction("deleteDoctor");
  console.log("doctor-delete-id", id);
}
