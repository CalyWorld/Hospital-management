import DoctorsTable from "./DoctorsTable";
import { Outlet, useLocation } from "react-router";
export default function DoctorHomePage() {
  const location = useLocation();
  console.log(location.pathname);
  console.log("i am in doctorHomePage");
  return (
    <div>
      {location.pathname === "/admin/doctors" ? <DoctorsTable /> : <Outlet />}
    </div>
  );
}
