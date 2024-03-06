import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex bg-white">
      <AdminSideBar />
      <div id="detail" className="w-full">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
