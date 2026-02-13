import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { completeAppointment } from "../../components/completeAppointment";
import { scheduledAppointMent } from "../../components/scheduledAppointment";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientThunk } from "../../redux/doctorAndPatientDetailsSlice";
import { fetchPatientAppointmentsThunk } from "../../redux/appointmentsSlice";
import { fetchHealthRecordsThunk } from "../../redux/healthRecordsSlice";
export function PatientDetails() {
  const dispatch: AppDispatch = useDispatch();
  const patient = useSelector(
    (state: RootState) => state.doctorAndPatientDetail.patient,
  );
  const patientAppointments = useSelector(
    (state: RootState) =>
      state.doctorAndPatientAppointments.patientsAppointment,
  );
  const healthRecords = useSelector(
    (state: RootState) => state.healthRecords.healthRecords,
  );
  const loading = useSelector(
    (state: RootState) => state.doctorAndPatientDetail.loading,
  );
  const { patientId } = useParams();
  const [activeTabLink, setActiveTabLink] = useState<string>("");

  if (!patientId) {
    return;
  }

  useEffect(() => {
    dispatch(fetchPatientThunk(patientId));
    dispatch(fetchPatientAppointmentsThunk(patientId));
    dispatch(fetchHealthRecordsThunk(patientId));
  }, [dispatch]);

  const isCompleted = completeAppointment(patientAppointments);
  const isScheduled = scheduledAppointMent(patientAppointments);

  if (!patient) return;

  console.log(healthRecords);
  return (
    <div className="flex flex-col gap-5 p-3">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl">{`${patient.firstName} ${patient.lastName}`}</h1>
          <div className="flex justify-center gap-10 p-5">
            <div className="w-full flex flex-col gap-10">
              <div className="flex gap-1">
                <Link
                  to={`/admin/patients/patient/${patientId}/active`}
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
                  to={`/admin/patients/patient/${patientId}/completion`}
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
                  to={`/admin/patients/patient/${patientId}/doctors`}
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
                >{`Doctors (${patient.doctor?.length})`}</Link>
              </div>
              <Outlet />
            </div>
            <div className="w-96 flex flex-col gap-10">
              <div className="flex flex-col gap-5 bg-gray p-3">
                <div className="flex justify-between">
                  <div>
                    <h2>Fees last 30 days</h2>
                    {/* <h1>{`₱${
                      totalRevenueCurrentMonth + totalMedicationRevenueAllTime
                    }`}</h1> */}
                  </div>
                  <div>chart</div>
                </div>
                <div className="">
                  <h2>All Time Fees</h2>
                  {/* <h1>{`₱${
                    totalTreatmentRevenue + totalMedicationRevenueAllTime
                  }`}</h1> */}
                </div>
              </div>
              <div className=" flex flex-col bg-[#e5e7eb] gap-10 p-3 shadow rounded-md">
                {" "}
                <div>
                  <p className="text-[#6b7280]">Phone number</p>
                  <p>{`+63 ${patient.phoneBook}`}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Address</p>
                  <p>{patient.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
