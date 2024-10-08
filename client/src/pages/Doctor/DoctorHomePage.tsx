import DoctorsTable from "./DoctorsTable";
import { Outlet, useLocation } from "react-router";
export default function DoctorHomePage() {
  const location = useLocation();
  return (
    <div className="m-10 shadow rounded-md">
      {location.pathname === "/admin/doctors" ? <DoctorsTable /> : <Outlet />}
    </div>
  );
}
