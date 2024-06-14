import DoctorsTable, { TableProps } from "./DoctorsTable";
import { Outlet, useLocation } from "react-router";
export default function DoctorHomePage({
  setActionForm,
  setSelectedId,
}: TableProps) {
  const location = useLocation();
  return (
    <div className="m-10 shadow rounded-md">
      {location.pathname === "/admin/doctors" ? (
        <DoctorsTable
          setActionForm={setActionForm}
          setSelectedId={setSelectedId}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
}
