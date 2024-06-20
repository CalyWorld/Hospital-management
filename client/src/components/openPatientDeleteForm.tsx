import { ActionPatientEnum } from "./actionEnum";

export default function openDeletePatientForm(
  currentAction: ActionPatientEnum,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!currentAction || !setAction || !setSelectedId || !id) return;
  setAction(currentAction);
  setSelectedId(id);
}
