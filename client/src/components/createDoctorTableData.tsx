import { Doctor } from "../contexts/doctorUserContext";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import openEditDoctorForm from "./openEditDoctorForm";
import openDeleteDoctorForm from "./openDeleteDoctor";
import bookPatient from "./bookPatient";
import { FaLink } from "react-icons/fa6";
import { ActionDoctorEnum } from "./actionEnum";
export function createDoctorTableData(
  { _id, id, createdAt, firstName, lastName, age, country, gender }: Doctor,
  path: string,
  currentAction: typeof ActionDoctorEnum,
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
          openEditDoctorForm(
            currentAction.EditDoctorForm,
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
          openDeleteDoctorForm(
            currentAction.DeleteDoctorForm,
            setAction,
            setSelectedId,
            _id,
          );
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          bookPatient(currentAction, setAction, _id);
        }}
      >
        <EventAvailableIcon />
      </button>
    </div>
  );

  return { _id, id, createdAt, username, age, country, gender, actions };
}
