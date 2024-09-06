import * as React from "react";
import { Link } from "react-router-dom";
import { FaUserDoctor, FaMoneyBill } from "react-icons/fa6";
import { FaHospitalUser, FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Outlet, useLocation } from "react-router";
import { useAdminUser } from "../../contexts/adminUserContext";
import dayjs, { Dayjs } from "dayjs";
import DateCalendarValue from "../../components/calendar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export default function AdminDashBoard() {
  const {
    useGetDoctorAndPatientData,
    useGetTotalRevenue,
    useGetPatientAppointmentsByDateTime,
  } = useAdminUser();
  const { doctors, patients } = useGetDoctorAndPatientData();
  const { totalRevenue } = useGetTotalRevenue();
  const location = useLocation();
  const currentDate = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currentDate));
  const getMonthAndDate = (date: Dayjs | null) => {
    return date ? date.toISOString() : "";
  };
  const date = getMonthAndDate(value);
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const patientAppointmentDataByDateTime =
    useGetPatientAppointmentsByDateTime(date);
  const patientAppointMentLoading = !patientAppointmentDataByDateTime;
  const rangeOfDoctorsAvailable = doctors?.filter(
    (doctor) =>
      new Date(doctor.startDate) <= endOfDay &&
      new Date(doctor.endDate) >= startOfDay,
  );

  return (
    <>
      {location.pathname === "/admin" ||
      location.pathname === "/admin/dashboard" ? (
        <div className="md:flex gap-10 m-10">
          <div className="left-side-container flex flex-col gap-10">
            <div className="welcome-info relative">
              <img
                className="h-full w-full"
                src="https://www.mathematica.org/-/media/internet/health-graphics-and-photos/health-graphics/2020/medical_health_interactive_web.jpg"
                alt="welcome"
              />
              <div className="absolute left-[30px] top-[70px] text-white flex flex-col h-[20%] justify-between">
                <h1>
                  Welcome <span className="font-semibold">Admin</span>
                </h1>
                <p>
                  To keep the body in good health is a duty ... otherwise
                  <br />
                  we shall not be able to keep our mind strong and clear
                </p>
              </div>
            </div>
            <div className="stats-info flex flex-col gap-5">
              <div className="flex flex-col md:flex-row justify-between p-5 shadow bg-white rounded-md">
                <div className="flex items-center p-2 gap-3">
                  <FaUserDoctor size={30} />
                  <div>
                    <p className="font-semibold">{doctors?.length}</p>
                    <p>Total Doctors</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <FaHospitalUser size={30} />
                  <div>
                    <p className="font-semibold">{patients?.length}</p>
                    <p>Total Patients</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <FaMoneyBill size={30} />
                  <div>
                    <p className="font-semibold">{`₱${totalRevenue}`}</p>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="today-appointment-info flex flex-col md:flex-row justify-between p-5 shadow bg-white rounded-md">
                <div className="flex items-center p-2 gap-3">
                  <FaCalendarAlt size={30} />
                  <div>
                    <p className="font-semibold">
                      {patientAppointmentDataByDateTime?.length}
                    </p>
                    <p>Appointments</p>
                    <p className="text-darkGray">Today</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <CgProfile size={30} />
                  <div>
                    <p className="font-semibold">
                      {rangeOfDoctorsAvailable?.length}
                    </p>
                    <p>Available Doctors</p>
                    <p className="text-darkGray">Today</p>
                  </div>
                </div>
              </div>
              <div className="available-doctors-for-the-day">
                <h2 className="font-bold">Todays Doctors</h2>
                <div className="flex w-full mt-3">
                  {doctors === null ? (
                    <div className="flex justify-center items-center w-full">
                      <Box>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : rangeOfDoctorsAvailable &&
                    rangeOfDoctorsAvailable.length > 0 ? (
                    rangeOfDoctorsAvailable?.map((doctor) => (
                      <Link
                        to={`/admin/doctors/doctor/${doctor._id}`}
                        key={doctor._id}
                      >
                        <div
                          key={doctor._id}
                          className="flex flex-col shadow bg-white rounded-md justify-center items-center p-3 h-64 w-64"
                        >
                          <div>image of patient</div>
                          <p>{`${doctor.firstName} ${doctor.lastName}`}</p>
                          {`${dayjs(doctor.startDate).format(
                            "hh:mm A",
                          )} to ${dayjs(doctor.endDate).format("hh:mm A")}`}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-darkGray">
                      NO AVAILABLE DOCTOR TODAY
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right-side-container divide-y divide-gray flex flex-col shadow bg-white rounded-md md:flex">
            <div className="calender-info p-3 flex flex-col items-center">
              <DateCalendarValue value={value} setValue={setValue} />
            </div>
            {patientAppointMentLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : patientAppointmentDataByDateTime &&
              patientAppointmentDataByDateTime.length > 0 ? (
              <div className="p-3 flex flex-col gap-4">
                <p className="items-center">
                  {`${patientAppointmentDataByDateTime.length} Appointments`}
                </p>
                <div className="shadow bg-white rounded-md p-4">
                  {patientAppointmentDataByDateTime.map((appointment) => (
                    <div key={appointment._id} className="flex p-3">
                      <div className="flex flex-col gap-2 w-full">
                        <p>{`${dayjs(appointment.startDate).format(
                          "hh:mm A",
                        )} to ${dayjs(appointment.endDate).format(
                          "hh:mm A",
                        )}`}</p>
                        <div className="flex gap-2">
                          <div className="image-container">
                            image of patient
                          </div>
                          <div className="appointment-info w-full">
                            <p className="font-bold">{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</p>
                            <span className="text-sm">
                              <p>
                                <span className="text-darkGray">
                                  {appointment.title}
                                </span>{" "}
                                with{" "}
                                <span className="font-semibold">
                                  {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                                </span>
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p>No Appointments Today</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
