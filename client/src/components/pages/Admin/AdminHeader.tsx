import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router";
export default function AdminHeader() {
  const location = useLocation();
  const getPathContent = () => {
    if (location.pathname.includes("/admin/doctors")) {
      return "DOCTORS";
    } else if (location.pathname.includes("/admin/patients")) {
      return "PATIENTS";
    } else {
      return "DASHBOARD";
    }
  };
  return (
    <header className="ml-10 mr-10 mt-0 mb-0">
      <nav className="flex justify-between items-center shadow bg-white rounded-md p-3">
        {getPathContent()}
        <PersonIcon fontSize="large" />
      </nav>
    </header>
  );
}
