import { AppDispatch } from "../redux/store";
import { ActionDoctorEnum } from "../components/actionEnum";
import { setOpenActionForm, setSelectedId } from "../redux/actionFormSlice";
export default function openDeleteDoctorModal(
  dispatch: AppDispatch,
  currentAction: ActionDoctorEnum,
  id?: string,
) {
  if (!currentAction || !id) return;
  dispatch(setOpenActionForm(currentAction));
  dispatch(setSelectedId(id));
}
