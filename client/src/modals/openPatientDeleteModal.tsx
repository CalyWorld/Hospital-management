import { ActionPatientEnum } from "../components/actionEnum";
import { setOpenActionForm, setSelectedId } from "../redux/actionFormSlice";
import { AppDispatch } from "../redux/store";

export default function openDeletePatientModal(
  dispatch: AppDispatch,
  currentAction: ActionPatientEnum,
  id?: string,
) {
  if (!currentAction || !id) return;
  dispatch(setOpenActionForm(currentAction));
  dispatch(setSelectedId(id));
}
