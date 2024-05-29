import PatientsTable from "./PatientsTable";
import { Outlet, useLocation } from "react-router";
export default function PatientHomePage() {
  const location = useLocation();
  return (
    <div className="h-screen m-10 shadow bg-white rounded-md">
      {location.pathname === "/admin/patients" ? <PatientsTable /> : <Outlet />}
    </div>
  );
}
