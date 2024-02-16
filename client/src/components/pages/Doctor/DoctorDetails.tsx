import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export function DoctorDetails() {
  const { doctorId } = useParams();
  const {
    useGetDoctorDetails,
    useGetDoctorAppointments,
    useGetDoctorTreatments,
  } = useAdminUser();
  if (!doctorId) {
    return;
  }
  const doctorDetails = useGetDoctorDetails(doctorId);
  const doctorAppointments = useGetDoctorAppointments(doctorId);
  const doctorTreatments = useGetDoctorTreatments(doctorId);

  const allTreatmentsFees = doctorTreatments?.map(
    (treatment) => treatment.totalFee,
  );
  const totalRevenueAllTime = allTreatmentsFees?.reduce(
    (accumulator, currentValue) => accumulator + (currentValue || 0),
    0,
  );

  const currentMonth = new Date()
    .toLocaleDateString("en-us", {
      month: "short",
    })
    .toLowerCase();

  const treatmentsWithinCurrentMonth = doctorTreatments?.filter((treatment) => {
    const treatmentDate = new Date(treatment.date);
    if (isNaN(treatmentDate.getTime())) {
      return false;
    }
    return (
      treatmentDate
        .toLocaleDateString("en-us", { month: "short" })
        .toLowerCase() === currentMonth
    );
  });

  const totalRevenueCurrentMonth = treatmentsWithinCurrentMonth?.reduce(
    (accumulator, currentTreatment) =>
      accumulator + (currentTreatment.totalFee || 0),
    0,
  );

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
        <div className="flex flex-col gap-5">
          <h1>
            {`${!loading && doctorDetails?.firstName} ${
              doctorDetails?.lastName
            }`}
          </h1>
          <div className="flex justify-center gap-10 p-5">
            <div className="w-full flex flex-col gap-10">
              <div className="flex gap-5">
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/active`}
                  className="shadow-2xl p-2 cursor-pointer bg-gray"
                >
                  {`Active Consultations (${isScheduled?.length})`}
                </Link>
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/completion`}
                  className="shadow-2xl p-2 cursor-pointer bg-gray"
                >
                  {`Completed Consultations (${isCompleted?.length})`}
                </Link>
                <Link
                  className="shadow-2xl p-2 cursor-pointer bg-gray"
                  to={`/admin/doctors/doctor/${doctorId}/patients`}
                >{`Patients (${doctorDetails?.patient?.length})`}</Link>
              </div>
              <Outlet />
            </div>
            <div className="w-96 flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-3">
                <div className="bg-gray flex justify-between">
                  <div>
                    <h2 className="text-darkBlue">Revenue last 30 days</h2>
                    <h1 className="text-darkBlue">{`₱${totalRevenueCurrentMonth}`}</h1>
                  </div>
                  <div>chart</div>
                </div>
                <div className="bg-gray">
                  <h2>All time revenue</h2>
                  <h1>{`₱${totalRevenueAllTime}`}</h1>
                </div>
              </div>
              <div className="bg-gray">doctor info</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
