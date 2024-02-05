import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex gap-5">
      <AdminSideBar />
      <div className=" w-screen flex flex-col gap-10 p-5">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
