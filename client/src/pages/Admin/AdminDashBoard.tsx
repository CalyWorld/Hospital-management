import DoctorsTable from "./DoctorsTable";
import TuneIcon from "@mui/icons-material/Tune";
import { FaUserDoctor } from "react-icons/fa6";
import { useDoctor } from "../../contexts/doctorUserContext";
import { FaHospitalUser } from "react-icons/fa";
export default function AdminDashBoard() {
  const { doctors } = useDoctor();
  return (
    <div className="flex flex-col ">
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
            <div>2k</div>
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
        <div className="flex justify-end p-5">
          <TuneIcon />
        </div>
        {<DoctorsTable />}
      </div>
    </div>
  );
}
