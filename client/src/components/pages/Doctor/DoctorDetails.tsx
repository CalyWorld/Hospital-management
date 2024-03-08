import { useParams, Outlet } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Doctor } from "../../../contexts/doctorUserContext";
export function DoctorDetails() {
  const { doctorId } = useParams();
  const [activeTabLink, setActiveTabLink] = useState<string>("");
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

  const availableTimeOfDay = () => {
    if (!doctorDetails) return;
    const doctorStartTime = new Date(doctorDetails.startTime);
    const doctorEndTime = new Date(doctorDetails.endTime);

    const formattedStartTime = doctorStartTime.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    const formattedEndTime = doctorEndTime.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return <div>{`${formattedStartTime} - ${formattedEndTime}`}</div>;
  };

  const availableDaysOfWeek = () => {
    if (!doctorDetails) return;
    let currentDate = new Date(doctorDetails?.startDate);
    let endDate = new Date(doctorDetails?.endDate);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const availableDaysOfWeek = [];
    while (currentDate <= endDate) {
      const dayIndex = currentDate.getDay();
      availableDaysOfWeek.push(daysOfWeek[dayIndex]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return (
      <div className="flex gap-2">
        {availableDaysOfWeek.map((day) => (
          <div className="bg-[#d1d5db] flex items-center justify-center p-1">
            <p className="font-semibold">{day}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl">{`${doctorDetails?.firstName} ${doctorDetails?.lastName}`}</h1>
          <div className="flex justify-center gap-10 p-5">
            <div className="w-full flex flex-col gap-10">
              <div className="flex gap-1">
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/active`}
                  style={{
                    boxShadow:
                      activeTabLink === "active"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "active" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    borderTop:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    borderBottom:
                      activeTabLink !== "active" ? "2px solid #e5e7eb" : "none",
                    borderRight:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    color: activeTabLink === "active" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("active");
                  }}
                >
                  {`Active Consultations (${isScheduled?.length})`}
                </Link>
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/completion`}
                  style={{
                    boxShadow:
                      activeTabLink === "completed"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "completed" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    borderTop:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    borderBottom:
                      activeTabLink === "completed"
                        ? "none"
                        : "1px solid #e5e7eb",
                    borderRight:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    color:
                      activeTabLink === "completed" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("completed");
                  }}
                >
                  {`Completed Consultations (${isCompleted?.length})`}
                </Link>
                <Link
                  to={`/admin/doctors/doctor/${doctorId}/patients`}
                  style={{
                    boxShadow:
                      activeTabLink === "doctor"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "doctor" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    borderTop:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    borderBottom:
                      activeTabLink === "doctor" ? "none" : "1px solid #e5e7eb",
                    borderRight:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    color: activeTabLink === "doctor" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("doctor");
                  }}
                >{`Patients (${doctorDetails?.patient?.length})`}</Link>
              </div>
              <Outlet />
            </div>
            <div className="w-96 flex flex-col gap-10">
              <div className="flex flex-col gap-5 bg-[#e5e7eb] p-3 shadow rounded-md">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-darkBlue">Revenue last 30 days</h2>
                    <h1 className="text-darkBlue">{`₱${totalRevenueCurrentMonth}`}</h1>
                  </div>
                  <div>chart</div>
                </div>
                <div className="">
                  <h2>All time revenue</h2>
                  <h1>{`₱${totalRevenueAllTime}`}</h1>
                </div>
              </div>
              <div className=" flex flex-col bg-[#e5e7eb] gap-10 p-3 shadow rounded-md">
                <div>
                  <p className="text-[#6b7280]">Phone number</p>
                  <p>{`+63 ${doctorDetails.phoneBook}`}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Address</p>
                  <p>{doctorDetails.address}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Availaiblity</p>
                  <div>{availableDaysOfWeek()}</div>
                </div>
                <div>
                  <p className="text-[#6b7280]">Available hours</p>
                  <div>{availableTimeOfDay()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
