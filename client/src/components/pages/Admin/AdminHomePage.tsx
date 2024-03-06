import { useAdminUser } from "../../../contexts/adminUserContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
export default function AdminHomePage() {
  const { useGetAdmin } = useAdminUser();
  const { adminUser } = useGetAdmin();

  return adminUser ? <AdminPage /> : <AdminLoginPage />;
}
