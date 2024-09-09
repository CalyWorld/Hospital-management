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
        <div className="fixed inset-0 z-10 backdrop-blur-sm bg-darkBlue/30"></div>
      )}
      <div className="flex w-full">
        <div
          className="lg:hidden p-2 flex"
          onClick={() => setResponsiveModal(true)}
        >
          <TfiMenu size={40} />
        </div>
        <div className="hidden lg:block">
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
        <div className="fixed inset-0 z-20 flex">
          <div className="w-48 bg-darkBlue">
            <AdminLayout setResponsiveModal={setResponsiveModal} />
          </div>
          <div
            className="flex-grow"
            onClick={() => setResponsiveModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
