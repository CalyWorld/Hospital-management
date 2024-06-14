import { Opacity } from "@mui/icons-material";
import { TableProps } from "../Doctor/DoctorsTable";
import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";

export default function AdminPage({ openActionForm }: TableProps) {
  return (
    <div className="flex h-screen z-10">
      <div className="flex w-full h-full">
        <div
          className={`${
            openActionForm === "editForm" ||
            openActionForm === "deleteDoctor" ||
            openActionForm === "bookPatient"
              ? "backdrop-blur-[2px] bg-[#020617]/90"
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
              ? "backdrop-blur-[2px] bg-[#090b116e]/90"
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
