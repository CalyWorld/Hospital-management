import { useAdminUser } from "../../../contexts/adminUserContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
export default function AdminHomePage() {
  const { useGetDoctorAndPatientData } = useAdminUser();
  const { adminUser } = useGetDoctorAndPatientData();
  return <>{adminUser ? <AdminPage /> : <AdminLoginPage />}</>;
}
