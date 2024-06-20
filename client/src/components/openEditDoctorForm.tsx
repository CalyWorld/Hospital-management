import { ActionDoctorEnum } from "./actionEnum";
export default function openEditDoctorForm(
  currentAction: ActionDoctorEnum,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!currentAction || !setAction || !setAction || !setSelectedId || !id)
    return;
  setAction(currentAction);
  setSelectedId(id);
}
