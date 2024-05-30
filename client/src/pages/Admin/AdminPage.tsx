import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";
export default function AdminPage() {
  return (
    <div className="flex bg-white h-screen">
      <div className="flex w-full h-full">
        <AdminLayout />
        <div id="detail" className="w-full flex flex-col">
          <AdminHeader />
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
