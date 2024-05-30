import { Doctor } from "../contexts/doctorUserContext";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import editDoctor from "./editDoctor";
import deleteDoctor from "./deleteDoctor";
import bookPatient from "./bookPatient";
export function createData({
  _id,
  id,
  createdAt,
  firstName,
  lastName,
  age,
  country,
  gender,
}: Doctor) {
  const username = (
    <Link
      to={`${
        location.pathname.includes("/admin") && `/admin/doctors/doctor/${_id}`
      }`}
    >
      {firstName} {lastName}
    </Link>
  );
  const actions = (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => {
          editDoctor("id");
        }}
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          deleteDoctor("id");
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          bookPatient("id");
        }}
      >
        <EventAvailableIcon />
      </button>
    </div>
  );
  return { _id, id, createdAt, username, age, country, gender, actions };
}
