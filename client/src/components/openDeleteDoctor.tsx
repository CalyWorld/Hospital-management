import { ActionDoctorEnum } from "./actionEnum";

export default function openDeleteDoctorForm(
  currentAction: ActionDoctorEnum,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!currentAction || !setAction || !setSelectedId || !id) return;
  setAction(currentAction);
  setSelectedId(id);
}
