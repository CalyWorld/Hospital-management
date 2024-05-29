import { useAdminUser } from "../../../contexts/adminUserContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
export default function AdminHomePage() {
  const { adminUser } = useAdminUser();
  return adminUser ? <AdminPage /> : <AdminLoginPage />;
}
