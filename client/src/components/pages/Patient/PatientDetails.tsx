import { useParams, useLocation, Outlet } from "react-router";
import { usePatient } from "../../../contexts/patientUserContext";
export function PatientDetails() {
  const { patientId } = useParams();
  const location = useLocation();
  console.log("patient-path", location.pathname);
  console.log("patientId", patientId);
  return (
    <div className="p-3 flex flex-col gap-5">
      <h2>Patient name</h2>
      <div className="flex justify-between">
        <div className="w-full">
          <Outlet />
        </div>
        <div>revenue</div>
      </div>
    </div>
  );
}
