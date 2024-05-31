import { DoctorsTableProps } from "../Doctor/DoctorsTable";
import EditDoctorDetail from "../../forms/EditDoctorDetailsForm";
import DeleteDoctor from "../../forms/DeleteDoctorForm";
import BookAppointment from "../../forms/BookAppointment";
import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";

export default function AdminPage({ openActionForm }: DoctorsTableProps) {
  return (
    <div className="flex h-screen">
      <div className="flex w-full h-full">
        {openActionForm === "editForm" && <EditDoctorDetail />}
        {openActionForm === "deleteDoctor" && <DeleteDoctor />}
        {openActionForm === "bookPatient" && <BookAppointment />}
        <div
          className={`${
            openActionForm === "deleteDoctor"
              ? "bg-darkBlue blur-[4px]"
              : "bg-darkBlue"
          }`}
        >
          <AdminLayout />
        </div>
        <div
          id="detail"
          className={`w-full flex flex-col ${
            openActionForm === "deleteDoctor" ? "blur-[4px]" : "bg-white"
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
