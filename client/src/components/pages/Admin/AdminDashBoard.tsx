import DoctorsTable from "../Doctor/DoctorsTable";
import TuneIcon from "@mui/icons-material/Tune";
import { FaUserDoctor, FaMoneyBill } from "react-icons/fa6";
import { FaHospitalUser, FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import PatientsTable from "../Patient/PatientsTable";
import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useAdminUser } from "../../../contexts/adminUserContext";
import DateCalendarValue from "../../calendar";
export default function AdminDashBoard() {
  const { useGetDoctorAndPatientData, useGetTotalRevenue } = useAdminUser();
  const { doctors, patients } = useGetDoctorAndPatientData();
  const { totalRevenue } = useGetTotalRevenue();

  const [switchTable, setTable] = useState<boolean>(false);
  const location = useLocation();

  return (
    <>
      {location.pathname === "/admin" || "/admin/dashboard" ? (
        <div className="flex justify-between h-full gap-10 ">
          <div className="left-side-container w-full flex flex-col gap-10">
            <div className="welcome-info">
              <p>Welcome</p>
              <p>Admin</p>
            </div>
            <div className="stats-info flex flex-col gap-5">
              <div className="flex justify-between p-5 shadow bg-white rounded-md">
                <div className="flex items-center p-2 gap-3">
                  <FaUserDoctor size={30} />
                  <div>
                    <div>{doctors?.length}</div>
                    <p>Total Doctors</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <FaHospitalUser size={30} />
                  <div>
                    <div>{patients?.length}</div>
                    <p>Total Patients</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <FaMoneyBill size={30} />
                  <div>
                    <div>{`₱${totalRevenue}`}</div>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="today-appointment-info flex justify-between p-5 shadow bg-white rounded-md">
                <div className="flex items-center p-2 gap-3">
                  <FaCalendarAlt size={30} />
                  <div>
                    <p>105</p>
                    <p>Appointments</p>
                    <p>Today</p>
                  </div>
                </div>
                <div className="flex items-center p-2 gap-3">
                  <CgProfile size={30} />
                  <div>
                    <p>37</p>
                    <p>Available Doctors</p>
                    <p>Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side-container shadow bg-white rounded-md">
            <div className="calender-info p-3">
              <DateCalendarValue />
            </div>
            <div>
              <p>Number of appointments today</p>
              <div>
                <div>
                  <p>schedule time</p>
                  <div className="flex">
                    <div className="image-container">image of patient</div>
                    <div className="appointment-info">
                      <p>Name of patient</p>
                      <p>consultation with Doctor one</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
