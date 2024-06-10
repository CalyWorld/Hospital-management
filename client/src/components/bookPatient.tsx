export default function bookPatient(
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!setAction) return;
  setAction("bookPatient");
  console.log("patient-id", id);
}
