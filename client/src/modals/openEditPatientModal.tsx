import { setOpenActionForm, setSelectedId } from "../redux/actionFormSlice";
import { AppDispatch } from "../redux/store";
import { ActionPatientEnum } from "../components/actionEnum";
export default function openEditPatientModal(
  dispatch: AppDispatch,
  currentAction: ActionPatientEnum,
  id?: string,
) {
  if (!currentAction || !id) return;
  dispatch(setOpenActionForm(currentAction));
  dispatch(setSelectedId(id));
}
