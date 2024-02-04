import { useAdminUser } from "../../contexts/adminUserContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminUserDashboard from "./DashBoard/AdminUserDashboard";
export default function AdminHomePage() {
  const { adminUser } = useAdminUser();
  console.log(adminUser);
  return adminUser ? <AdminUserDashboard /> : <AdminLoginPage />;
}
