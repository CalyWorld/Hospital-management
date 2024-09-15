import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
export default function AdminHomePage() {
  const adminUser = useSelector(
    (state: RootState) => state.adminUser.adminUser,
  );
  return adminUser ? <AdminPage /> : <AdminLoginPage />;
}
