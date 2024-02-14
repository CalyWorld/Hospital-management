import { useLocation } from "react-router";
import PatientsTable from "./PatientsTable";
import { Outlet } from "react-router";
export default function PatientHomePage() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/admin/patients" ? <PatientsTable /> : <Outlet />}
    </div>
  );
}
