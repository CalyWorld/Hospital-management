import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { FaUserDoctor } from "react-icons/fa6";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaHospitalUser } from "react-icons/fa";
export default function AdminSideBar() {
  return (
    <div
      id="sidebar"
      className="w-36 bg-darkBlue text-white flex flex-col items-center justify-between p-5"
    >
      <div className="flex flex-col items-center gap-10">
        <a href="/admin">
          <HealthAndSafetyIcon />
        </a>
        <nav>
          <ul className="flex flex-col items-center gap-10">
            <li>
              <Link to={`/admin/dashboard`}>
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link to={`/admin/doctors`}>
                <FaUserDoctor />
              </Link>
            </li>
            <li>
              <Link to={`/admin/patients`}>
                <FaHospitalUser />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col gap-5">
        <SettingsIcon />
        <LogoutIcon />
      </div>
    </div>
  );
}
