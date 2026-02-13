import PatientsTable from "./PatientsTable";
import { Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export default function PatientHomePage() {
  const location = useLocation();
  const patients = useSelector(
    (state: RootState) => state.doctorAndPatientUser.patients,
  );
  const loading = useSelector(
    (state: RootState) => state.doctorAndPatientUser.loading,
  );
  return (
    <div className="m-10 shadow  rounded-md">
      {location.pathname === "/admin/patients" ? (
        <PatientsTable patients={patients} loading={loading} />
      ) : (
        <Outlet />
      )}
    </div>
  );
}
