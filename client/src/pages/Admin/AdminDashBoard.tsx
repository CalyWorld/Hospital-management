import * as React from "react";
import { Link } from "react-router-dom";
import { FaUserDoctor, FaMoneyBill } from "react-icons/fa6";
import { FaHospitalUser, FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Outlet, useLocation } from "react-router";
import dayjs, { Dayjs } from "dayjs";
import DateCalendarValue from "../../components/calendar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAdminUser } from "../../contexts/adminUserContext";
export default function AdminDashBoard() {
  const { useGetPatientAppointmentsByDateTime } = useAdminUser();
  const { doctors, patients } = useSelector(
    (state: RootState) => state.doctorAndPatientUser,
  );
  const location = useLocation();
  const currentDate = new Date();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currentDate));
  const selectedDate = (value ?? dayjs(currentDate)).format("YYYY-MM-DD");
  const patientAppointmentDataByDateTime =
    useGetPatientAppointmentsByDateTime(selectedDate);
  const patientAppointMentLoading = patientAppointmentDataByDateTime === null;

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to start of day in UTC

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999); // Set to end of day in UTC

  // console.log(startOfDay, endOfDay);

  const rangeOfDoctorsAvailable = doctors?.filter(
    (doctor) =>
      new Date(doctor.startDate) <= endOfDay &&
      new Date(doctor.endDate) >= startOfDay,
  );

  // console.log(rangeOfDoctorsAvailable);

  return (
    <>
      {location.pathname === "/admin" ||
      location.pathname === "/admin/dashboard" ? (
        <div className="max-w-full lg:flex gap-10 ml-10 mr-14 mt-10 mb-0">
          <div className="left-side-container flex flex-col gap-10">
            <div className="welcome-info relative">
              <img
                className="h-full w-full"
                src="https://www.mathematica.org/-/media/internet/health-graphics-and-photos/health-graphics/2020/medical_health_interactive_web.jpg"
                alt="welcome"
              />
              <div className="absolute left-[30px] top-[70px] text-white flex flex-col h-[20%]">
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
            <div className="stats-info flex flex-col gap-2 justify-between">
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
                    {/* <p className="font-semibold">{`₱${totalRevenue}`}</p> */}
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="today-appointment-info flex flex-col md:flex-row justify-between p-5 shadow bg-white rounded-md">
                <div className="flex items-center p-2 gap-3">
                  <FaCalendarAlt size={30} />
                  <div>
                    <p className="font-semibold">
                      {patientAppointmentDataByDateTime?.length ?? 0}
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
              <div className="available-doctors-for-the-day w-full relative">
                <h2 className="font-bold">Today's Doctors</h2>
                {doctors === null ? (
                  <div className="flex justify-center items-center w-full h-64">
                    <Box>
                      <CircularProgress />
                    </Box>
                  </div>
                ) : rangeOfDoctorsAvailable &&
                  rangeOfDoctorsAvailable.length > 0 ? (
                  <div className="relative w-full mt-3">
                    <div className="overflow-x-auto pb-4 snap-x snap-mandatory max-w-[calc(4*16rem)] relative">
                      <div className="flex space-x-4 w-max">
                        {rangeOfDoctorsAvailable.map((doctor) => (
                          <div
                            key={doctor._id}
                            className="snap-center shrink-0 w-64 h-64 bg-white shadow rounded-md p-3 flex flex-col justify-center items-center"
                          >
                            <Link to={`/admin/doctors/doctor/${doctor._id}`}>
                              <div className="flex flex-col justify-center items-center">
                                <div>image of doctor</div>
                                <p>{`${doctor.firstName} ${doctor.lastName}`}</p>
                                <p>
                                  {`${dayjs(doctor.startDate).format(
                                    "hh:mm A",
                                  )} to ${dayjs(doctor.endDate).format(
                                    "hh:mm A",
                                  )}`}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-darkGray w-full h-64">
                    NO AVAILABLE DOCTOR TODAY
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-side-container divide-y divide-gray flex flex-col shadow bg-white rounded-md mt-4 lg:mt-0">
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
