import { TableProps } from "../Doctor/DoctorsTable";
import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";

export default function AdminPage({ openActionForm }: TableProps) {
  const isFormOpen =
    openActionForm === "editDoctorForm" ||
    openActionForm === "deleteDoctorForm" ||
    openActionForm === "bookPatient";
  return (
    <div className="flex h-screen">
      {isFormOpen && (
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-darkBlue/30"></div>
      )}
      <div className="flex w-full h-full">
        <div>
          <AdminLayout />
        </div>
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
