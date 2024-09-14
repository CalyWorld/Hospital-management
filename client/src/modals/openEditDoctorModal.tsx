import { ActionDoctorEnum } from "../components/actionEnum";
import { AppDispatch } from "../redux/store";
import { setOpenActionForm, setSelectedId } from "../redux/actionFormSlice";
export default function openEditDoctorModal(
  dispatch: AppDispatch,
  currentAction: ActionDoctorEnum,
  id?: string,
) {
  if (!currentAction || !id) return;
  dispatch(setOpenActionForm(currentAction));
  dispatch(setSelectedId(id));
}
