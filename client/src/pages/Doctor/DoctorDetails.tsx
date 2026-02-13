import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { completeAppointment } from "../../components/completeAppointment";
import { scheduledAppointMent } from "../../components/scheduledAppointment";
import { availableTimeOfDay } from "../../components/availableTimeDay";
import { availableDaysOfWeek } from "../../components/availableDayWeek";
import { doctorRevenue } from "../../components/doctorRevenue";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchDoctorThunk } from "../../redux/doctorAndPatientDetailsSlice";
import { fetchDoctorAppointmentsThunk } from "../../redux/appointmentsSlice";
import { fetchDoctorTreatmentsThunk } from "../../redux/treamentSlice";
import DoctorScheduledAppointmentTable from "./DoctorScheduledAppointmentTable";
import DoctorCompletedAppointmentTable from "./DoctorCompletedAppointmentTable";
import PatientsTable from "../Patient/PatientsTable";
export function DoctorDetails() {
  const dispatch: AppDispatch = useDispatch();
  const doctor = useSelector(
    (state: RootState) => state.doctorAndPatientDetail.doctor,
  );
  const doctorAppointments = useSelector(
    (state: RootState) => state.doctorAndPatientAppointments.doctorsAppointment,
  );
  const doctorTreatments = useSelector(
    (state: RootState) => state.doctorAndPatientTreatments.doctorTreatments,
  );
  const loading = useSelector(
    (state: RootState) => state.doctorAndPatientDetail.loading,
  );
  const { doctorId } = useParams();
  const [activeTabLink, setActiveTabLink] = useState<string>("active");

  if (!doctorId || !doctorAppointments) return;

  useEffect(() => {
    dispatch(fetchDoctorThunk(doctorId));
    dispatch(fetchDoctorAppointmentsThunk(doctorId));
    dispatch(fetchDoctorTreatmentsThunk(doctorId));
  }, [dispatch]);

  const { totalRevenueAllTime, totalRevenueCurrentMonth } =
    doctorRevenue(doctorTreatments);

  const isCompleted = completeAppointment(doctorAppointments);
  const isScheduled = scheduledAppointMent(doctorAppointments);

  if (!doctor) return;

  return (
    <div className="flex flex-col gap-5 p-3">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl">{`${doctor?.firstName} ${doctor?.lastName}`}</h1>
          <div className="flex justify-center gap-10 p-5">
            <div className="w-full flex flex-col gap-10">
              <div className="tab-links flex gap-0.5">
                <button
                  className={`p-2 cursor-pointer border ${
                    activeTabLink === "active"
                      ? "bg-white text-[#172554] shadow-inner border-[#e5e7eb]"
                      : "bg-[#e5e7eb] text-inherit border-b-2 border-[#e5e7eb]"
                  }`}
                  onClick={() => setActiveTabLink("active")}
                >
                  {`Active Consultations ${isScheduled.length}`}
                </button>

                <button
                  className={`p-2 cursor-pointer border ${
                    activeTabLink === "completed"
                      ? "bg-white text-[#172554] shadow-inner border-[#e5e7eb]"
                      : "bg-[#e5e7eb] text-inherit border-b-2 border-[#e5e7eb]"
                  }`}
                  onClick={() => setActiveTabLink("completed")}
                >
                  {`Completed Consultations ${isCompleted.length}`}
                </button>

                <button
                  className={`p-2 cursor-pointer border ${
                    activeTabLink === "patients"
                      ? "bg-white text-[#172554] shadow-inner border-[#e5e7eb]"
                      : "bg-[#e5e7eb] text-inherit border-b-2 border-[#e5e7eb]"
                  }`}
                  onClick={() => setActiveTabLink("patients")}
                >
                  {`Patients ${doctor.patients?.length}`}
                </button>
              </div>

              <div className="tab-content">
                {activeTabLink === "active" && (
                  <DoctorScheduledAppointmentTable />
                )}
                {activeTabLink === "completion" && (
                  <DoctorCompletedAppointmentTable />
                )}
                {activeTabLink === "patients" && (
                  <PatientsTable patients={doctor.patients} loading={loading} />
                )}
              </div>
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
                  <p>{`${doctor?.phoneBook}`}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Address</p>
                  <p>{doctor?.address}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Availaiblity</p>
                  <div>{availableDaysOfWeek(doctor)}</div>
                </div>
                <div>
                  <p className="text-[#6b7280]">Available hours</p>
                  <div>{availableTimeOfDay(doctor)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
