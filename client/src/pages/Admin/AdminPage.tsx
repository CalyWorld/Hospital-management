import { TableProps } from "../../components/tableProps";
import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";
import { TfiMenu } from "react-icons/tfi";
import { useState } from "react";

export default function AdminPage({ openActionForm }: TableProps) {
  const [openResponsiveModal, setResponsiveModal] = useState<boolean>(false);
  const isFormOpen =
    openActionForm === "editDoctorForm" ||
    openActionForm === "editPatientForm" ||
    openActionForm === "deletePatientForm" ||
    openActionForm === "deleteDoctorForm" ||
    openActionForm === "bookPatient";

  console.log(openResponsiveModal);
  return (
    <div className="flex h-screen">
      {isFormOpen && (
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-darkBlue/30"></div>
      )}
      <div className="flex w-full">
        <div
          className="flex items-center xs:block sm:block md:block lg:hidden p-2"
          onClick={() => setResponsiveModal(true)}
        >
          <TfiMenu size={40} />
        </div>
        <div className="xs:hidden sm:hidden md:hidden lg:block">
          <AdminLayout setResponsiveModal={setResponsiveModal} />
        </div>
        <div id="detail" className="w-full flex flex-col">
          <AdminHeader />
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
      {openResponsiveModal && (
        <div className="absolute z-20 lg:hidden">
          <div className="relative h-full">
            <AdminLayout setResponsiveModal={setResponsiveModal} />
          </div>
        </div>
      )}
    </div>
  );
}
