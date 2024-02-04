import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex">
      <AdminSideBar />
      <div>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
