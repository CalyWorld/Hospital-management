import { ActionDoctorEnum } from "../components/actionEnum";
import { setOpenActionForm, setSelectedId } from "../redux/actionFormSlice";
import { AppDispatch } from "../redux/store";
export default function bookPatient(
  dispatch: AppDispatch,
  currentAction: ActionDoctorEnum,
  id?: string,
) {
  if (!currentAction || !id) return;
  dispatch(setOpenActionForm(currentAction));
  dispatch(setSelectedId(id));
}
