import { Doctor } from "../contexts/doctorUserContext";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import editDoctor from "./editDoctor";
import deleteDoctor from "./deleteDoctor";
import bookPatient from "./bookPatient";
import { Patient } from "../contexts/patientUserContext";

export function createData(
  {
    _id,
    id,
    createdAt,
    firstName,
    lastName,
    age,
    country,
    gender,
  }: Doctor | Patient,
  path: string,
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
) {
  const username: JSX.Element | string = (
    <Link
      key={_id}
      to={location.pathname.includes("/admin") ? `/admin/${path}/${_id}` : "#"}
    >
      {firstName} {lastName}
    </Link>
  );
  const actions = (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => {
          editDoctor(setAction, setSelectedId, _id);
        }}
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          deleteDoctor(setAction, setSelectedId, _id);
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          bookPatient(setAction, _id);
        }}
      >
        <EventAvailableIcon />
      </button>
    </div>
  );
  return { _id, id, createdAt, username, age, country, gender, actions };
}
