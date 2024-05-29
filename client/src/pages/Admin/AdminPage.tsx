import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex bg-white">
      <AdminLayout />
      <div id="detail" className="w-full">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
