import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export function PatientDetails() {
  const { patientId } = useParams();
  const { useGetPatientDetails } = useAdminUser();
  if (!patientId) {
    return;
  }
  const patientDetails = useGetPatientDetails(patientId);
  const loading = !patientDetails;

  return (
    <div className="p-3 flex flex-col gap-5">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <h2>{`${patientDetails?.firstName} ${patientDetails?.lastName}`}</h2>
          <div className="flex justify-between">
            <div className="w-full">
              <div className="flex gap-5">
                <Link to={""}>Active Consultations</Link>
                <Link to={""}>Completed Consultations</Link>
                <Link
                  to={`${location.pathname}/doctors`}
                >{`Doctors (${patientDetails?.doctor?.length})`}</Link>
              </div>
              <Outlet />
            </div>
            <div>revenue</div>
          </div>
        </div>
      )}
    </div>
  );
}
