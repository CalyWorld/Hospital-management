import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import openDeleteDoctorModal from "../modals/openDeleteDoctorModal";
import openEditDoctorModal from "../modals/openEditDoctorModal";
import bookPatient from "../modals/bookPatientModal";
import { ActionDoctorEnum } from "./actionEnum";
import { DoctorUser } from "../types";
import { AppDispatch } from "../redux/store";

export function createDoctorTableData(
  { _id, id, createdAt, firstName, lastName, age, country, gender }: DoctorUser,
  currentAction: typeof ActionDoctorEnum,
  dispatch: AppDispatch,
) {
  const username = (
    <div className="flex justify-center items-center">
      <Link key={_id} to={`/admin/doctors/doctor/${_id}`} className="underline">
        {firstName} {lastName}
      </Link>
    </div>
  );

  const actions = (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => {
          openEditDoctorModal(dispatch, currentAction.EditDoctorForm, _id);
        }}
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          openDeleteDoctorModal(dispatch, currentAction.DeleteDoctorForm, _id);
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          bookPatient(dispatch, currentAction.BookPatient, _id);
        }}
      >
        <EventAvailableIcon />
      </button>
    </div>
  );

  return { _id, id, createdAt, username, age, country, gender, actions };
}
