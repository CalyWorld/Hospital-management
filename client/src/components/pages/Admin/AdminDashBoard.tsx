import DoctorsTable from "../Doctor/DoctorsTable";
import TuneIcon from "@mui/icons-material/Tune";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import PatientsTable from "../Patient/PatientsTable";
import { useState } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { useAdminUser } from "../../../contexts/adminUserContext";
export default function AdminDashBoard() {
  const { doctors, patients } = useAdminUser();
  // const { doctors, patients } = useGetDoctorAndPatientData();
  const [switchTable, setTable] = useState<boolean>(false);
  const location = useLocation();

  return (
    <>
      {location.pathname === "/admin" ? (
        <div className="flex flex-col p-2">
          <h2>DASHBOARD</h2>
          <div className="flex justify-evenly items-center p-5">
            <div className="flex items-center gap-4">
              <FaUserDoctor size={24} />
              <div className="flex flex-col items-center p-1 gap-1">
                <div>Total Doctors</div>
                <div>{doctors?.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaHospitalUser size={24} />
              <div className="flex flex-col items-center p-1 gap-1">
                <div>Total Patients</div>
                <div>{patients?.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>icon</div>
              <div className="flex flex-col items-center">
                <div>Total Revenue</div>
                <div>10k</div>
              </div>
            </div>
          </div>
          <div>
            <div className="switch-container flex justify-end items-center">
              <button
                className="p-2 cursor-pointer"
                onClick={() => {
                  setTable(!switchTable);
                }}
              >
                <TuneIcon />
              </button>
            </div>
            {switchTable ? <PatientsTable /> : <DoctorsTable />}
          </div>
        </div>
      ) : location.pathname === "/admin/dashboard" ? (
        <div className="flex flex-col p-2">
          <h2>DASHBOARD</h2>
          <div className="flex justify-evenly items-center p-5">
            <div className="flex items-center gap-4">
              <FaUserDoctor size={24} />
              <div className="flex flex-col items-center p-1 gap-1">
                <div>Total Doctors</div>
                <div>{doctors?.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaHospitalUser size={24} />
              <div className="flex flex-col items-center p-1 gap-1">
                <div>Total Patients</div>
                <div>{patients?.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>icon</div>
              <div className="flex flex-col items-center">
                <div>Total Revenue</div>
                <div>10k</div>
              </div>
            </div>
          </div>
          <div>
            <div className="switch-container flex justify-end items-center">
              <button
                className="p-2 cursor-pointer"
                onClick={() => {
                  setTable(!switchTable);
                }}
              >
                <TuneIcon />
              </button>
            </div>
            {switchTable ? <PatientsTable /> : <DoctorsTable />}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
