export default function bookPatient(
  setAction: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  setAction("bookPatient");
  console.log("patient-id", id);
}
