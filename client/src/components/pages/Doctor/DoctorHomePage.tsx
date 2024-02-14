import DoctorsTable from "./DoctorsTable";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
export default function DoctorHomePage() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      {location.pathname === "/admin/doctors" ? <DoctorsTable /> : <Outlet />}
    </div>
  );
}
