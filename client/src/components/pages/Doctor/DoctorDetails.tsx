import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export function DoctorDetails() {
  const { doctorId } = useParams();
  const { useGetDoctorDetails } = useAdminUser();

  if (!doctorId) {
    return;
  }
  const doctorDetails = useGetDoctorDetails(doctorId);
  const loading = !doctorDetails;
  return (
    <div className="p-3 flex flex-col gap-5">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <h2>
            {`${!loading && doctorDetails?.firstName} ${
              doctorDetails?.lastName
            }`}
          </h2>
          <div className="flex justify-between">
            <div className="w-full">
              <div className="flex gap-5">
                <Link to={""}>Active Consultations</Link>
                <Link to={""}>Completed Consultations</Link>
                <Link
                  to={`${location.pathname}/patients`}
                >{`Patients (${doctorDetails?.patient?.length})`}</Link>
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
