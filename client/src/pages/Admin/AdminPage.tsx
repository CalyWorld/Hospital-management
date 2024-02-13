import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex">
      <AdminSideBar />
      <div id="detail" className="w-full flex flex-col gap-7">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
