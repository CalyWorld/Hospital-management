import { DoctorsTableProps } from "../Doctor/DoctorsTable";
import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";

export default function AdminPage({ openActionForm }: DoctorsTableProps) {
  return (
    <div className="flex h-screen z-10">
      <div className="flex w-full h-full">
        <div
          className={`${
            openActionForm === "editForm" ||
            openActionForm === "deleteDoctor" ||
            openActionForm === "bookPatient"
              ? "bg-darkBlue blur-[4px]"
              : "bg-darkBlue"
          }`}
        >
          <AdminLayout />
        </div>
        <div
          id="detail"
          className={`w-full flex flex-col ${
            openActionForm === "editForm" ||
            openActionForm === "deleteDoctor" ||
            openActionForm === "bookPatient"
              ? "blur-[4px]"
              : "bg-white"
          }`}
        >
          <AdminHeader />
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
