import DoctorsTable from "./DoctorsTable";
import { Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export default function DoctorHomePage() {
  const location = useLocation();
  const doctors = useSelector(
    (state: RootState) => state.doctorAndPatientUser.doctors,
  );
  const loading = useSelector(
    (state: RootState) => state.doctorAndPatientUser.loading,
  );
  return (
    <div className="m-10 shadow rounded-md">
      {location.pathname === "/admin/doctors" ? (
        <DoctorsTable doctors={doctors} loading={loading} />
      ) : (
        <Outlet />
      )}
    </div>
  );
}
