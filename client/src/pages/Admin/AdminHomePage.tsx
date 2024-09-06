import { useAdminUser } from "../../contexts/adminUserContext";
import { TableProps } from "../../components/tableProps";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
export default function AdminHomePage({ openActionForm }: TableProps) {
  const { adminUser } = useAdminUser();
  return adminUser ? (
    <AdminPage openActionForm={openActionForm} />
  ) : (
    <AdminLoginPage />
  );
}
