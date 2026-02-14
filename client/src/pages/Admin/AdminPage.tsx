import AdminHeader from "./AdminHeader";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router";
import { TfiMenu } from "react-icons/tfi";
import { useState, useEffect } from "react";
import {
  fetchDoctorsThunk,
  fetchPatientsThunk,
} from "../../redux/doctorAndPatientSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setAdminUser, setToken } from "../../redux/adminUserSlice";

export interface AdminOutletContext {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function AdminPage() {
  const dispatch: AppDispatch = useDispatch();
  const [openResponsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const actionForm = useSelector(
    (state: RootState) => state.actionForm.openActionForm,
  );
  const doctorAndPatientError = useSelector(
    (state: RootState) => state.doctorAndPatientUser.error,
  );
  useEffect(() => {
    dispatch(fetchDoctorsThunk());
    dispatch(fetchPatientsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (doctorAndPatientError === "Unauthorized") {
      dispatch(setAdminUser(null));
      dispatch(setToken(null));
    }
  }, [dispatch, doctorAndPatientError]);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-white text-black"
      } ${theme === "dark" ? "admin-theme-dark" : "admin-theme-light"}`}
    >
      {actionForm && (
        <div className="fixed inset-0 z-10 backdrop-blur-sm bg-darkBlue/30"></div>
      )}
      <div className="flex w-full min-h-full">
        {/* Sidebar */}
        <div className="lg:hidden p-2 flex">
          <TfiMenu size={40} onClick={() => setResponsiveModal(true)} />
        </div>
        <div className="hidden lg:block flex-shrink-0">
          <AdminLayout setResponsiveModal={setResponsiveModal} theme={theme} />
        </div>

        {/* Content section */}
        <div id="detail" className="flex-grow flex flex-col overflow-hidden">
          <AdminHeader theme={theme} />
          <div
            className={`flex-grow p-4 overflow-auto max-w-full ${
              theme === "dark" ? "bg-slate-900" : "bg-white"
            }`}
          >
            <Outlet context={{ theme, setTheme } satisfies AdminOutletContext} />
          </div>
        </div>
      </div>

      {/* Responsive Modal for Sidebar */}
      {openResponsiveModal && (
        <div className="fixed inset-0 z-20 flex">
          <div
            className={`w-48 ${theme === "dark" ? "bg-slate-900" : "bg-darkBlue"}`}
          >
            <AdminLayout setResponsiveModal={setResponsiveModal} theme={theme} />
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
