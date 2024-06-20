import { ActionEnum } from "./createDoctorTableData";

export default function bookPatient(
  currentAction: typeof ActionEnum,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!setAction) return;
  setAction(currentAction.BookPatient);
  console.log("patient-id", id);
}
