import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export function DoctorDetails() {
  const { doctorId } = useParams();
  const { useGetDoctorDetails, useGetDoctorAppointments } = useAdminUser();
  if (!doctorId) {
    return;
  }
  const doctorDetails = useGetDoctorDetails(doctorId);
  const doctorAppointments = useGetDoctorAppointments(doctorId);
  const isCompleted = doctorAppointments?.filter(
    (appointment) => appointment.status.toLocaleLowerCase() === "completed",
  );
  const isScheduled = doctorAppointments?.filter(
    (appointment) =>
      appointment.status.toLocaleLowerCase() === "scheduled" || "canceled",
  );

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
            <div className="w-full flex flex-col gap-10">
              <div className="flex gap-5">
                <Link to={`/admin/doctors/doctor/${doctorId}/active`}>
                  {`Active Consultations (${isScheduled?.length})`}
                </Link>
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/completion`}
                >{`Completed Consultations (${isCompleted?.length})`}</Link>
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/patients`}
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
