import { TableProps } from "../Doctor/DoctorsTable";
import PatientsTable from "./PatientsTable";
import { Outlet, useLocation } from "react-router";
export default function PatientHomePage({ setActionForm }: TableProps) {
  const location = useLocation();
  return (
    <div className="m-10 shadow  rounded-md">
      {location.pathname === "/admin/patients" ? (
        <PatientsTable setActionForm={setActionForm} />
      ) : (
        <Outlet />
      )}
    </div>
  );
}
