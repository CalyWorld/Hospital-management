import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import openEditPatientModal from "../modals/openEditPatientModal";
import openDeletePatientModal from "../modals/openPatientDeleteModal";
import { ActionPatientEnum } from "./actionEnum";
import { AppDispatch } from "../redux/store";
import { PatientUser } from "../types";

export function createPatientTableData(
  {
    _id,
    id,
    createdAt,
    firstName,
    lastName,
    age,
    country,
    gender,
  }: PatientUser,
  currentAction: typeof ActionPatientEnum,
  dispatch: AppDispatch,
) {
  const username = (
    <div className="flex justify-center items-center">
      <Link key={_id} to={`/admin/patients/patient/${_id}`} className="underline">
        {firstName} {lastName}
      </Link>
    </div>
  );

  const actions = (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => {
          openEditPatientModal(dispatch, currentAction.EditPatientForm, _id);
        }}
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          openDeletePatientModal(
            dispatch,
            currentAction.DeletePatientForm,
            _id,
          );
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );

  return { _id, id, createdAt, username, age, country, gender, actions };
}
