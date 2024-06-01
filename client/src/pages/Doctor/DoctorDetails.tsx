import { useParams, Outlet } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { completeAppointment } from "../../components/completeAppointment";
import { scheduledAppointMent } from "../../components/scheduledAppointment";
import { availableTimeOfDay } from "../../components/availableTimeDay";
import { availableDaysOfWeek } from "../../components/availableDayWeek";
import { doctorRevenue } from "../../components/doctorRevenue";
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
  const { totalRevenueAllTime, totalRevenueCurrentMonth } =
    doctorRevenue(doctorTreatments);
  const isCompleted = completeAppointment(doctorAppointments);
  const isScheduled = scheduledAppointMent(doctorAppointments);
  const loading = !doctorDetails;

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
                  key={doctorId}
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
                  <div>{availableDaysOfWeek(doctorDetails)}</div>
                </div>
                <div>
                  <p className="text-[#6b7280]">Available hours</p>
                  <div>{availableTimeOfDay(doctorDetails)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
