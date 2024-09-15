import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";
import { TfiMenu } from "react-icons/tfi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function AdminPage() {
  const [openResponsiveModal, setResponsiveModal] = useState<boolean>(false);
  const actionForm = useSelector(
    (state: RootState) => state.actionForm.openActionForm,
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {actionForm && (
        <div className="fixed inset-0 z-10 backdrop-blur-sm bg-darkBlue/30"></div>
      )}
      <div className="flex w-full min-h-full">
        {/* Sidebar */}
        <div className="lg:hidden p-2 flex">
          <TfiMenu size={40} onClick={() => setResponsiveModal(true)} />
        </div>
        <div className="hidden lg:block flex-shrink-0">
          <AdminLayout setResponsiveModal={setResponsiveModal} />
        </div>

        {/* Content section */}
        <div id="detail" className="flex-grow flex flex-col overflow-hidden">
          <AdminHeader />
          <div className="flex-grow p-4 overflow-auto max-w-full">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Responsive Modal for Sidebar */}
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
