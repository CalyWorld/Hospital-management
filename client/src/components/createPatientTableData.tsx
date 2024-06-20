import { Link, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import openEditPatientForm from "./openEditPatientForm";
import openDeletePatientForm from "./openPatientDeleteForm";
import { FaLink } from "react-icons/fa6";
import { ActionPatientEnum } from "./actionEnum";
import { Patient } from "../contexts/patientUserContext";
export function createPatientTableData(
  { _id, id, createdAt, firstName, lastName, age, country, gender }: Patient,
  path: string,
  currentAction: typeof ActionPatientEnum,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
) {
  const location = useLocation();
  const username = (
    <div className="flex justify-center items-center gap-2">
      <p>
        {firstName} {lastName}
      </p>
      <Link
        key={_id}
        to={
          location.pathname.includes("/admin") ? `/admin/${path}/${_id}` : "#"
        }
      >
        <FaLink />
      </Link>
    </div>
  );

  const actions = (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => {
          openEditPatientForm(
            currentAction.EditPatientForm,
            setAction,
            setSelectedId,
            _id,
          );
        }}
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          openDeletePatientForm(
            currentAction.DeletePatientForm,
            setAction,
            setSelectedId,
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
