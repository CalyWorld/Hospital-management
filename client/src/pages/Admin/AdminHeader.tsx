import NotificationsIcon from "@mui/icons-material/Notifications";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation } from "react-router";
import { useAdminUser } from "../../contexts/adminUserContext";

interface AdminHeaderProps {
  theme: "light" | "dark";
}

export default function AdminHeader({ theme }: AdminHeaderProps) {
  const location = useLocation();
  const { useGetPatientAppointmentsByDateTime } = useAdminUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const today = dayjs().format("YYYY-MM-DD");
  const appointmentData = useGetPatientAppointmentsByDateTime(today);
  const notifications = (appointmentData ?? []).map((appointment) => {
    const status = appointment.status.toLowerCase();
    if (status === "completed" || status === "accepted") {
      return {
        id: `${appointment._id}-accepted`,
        text: `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName} accepted/completed ${appointment.patient.firstName} ${appointment.patient.lastName}'s appointment`,
      };
    }
    return {
      id: `${appointment._id}-booked`,
      text: `${appointment.patient.firstName} ${appointment.patient.lastName} booked with Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
    };
  });

  const getPathContent = () => {
    if (location.pathname.includes("/admin/doctors")) {
      return "DOCTORS";
    } else if (location.pathname.includes("/admin/patients")) {
      return "PATIENTS";
    } else if (location.pathname.includes("/admin/appointments")) {
      return "APPOINTMENTS";
    } else if (location.pathname.includes("/admin/settings")) {
      return "SETTINGS";
    } else {
      return "DASHBOARD";
    }
  };
  return (
    <header className="ml-10 mr-14 mt-0 mb-0">
      <nav
        className={`flex justify-between items-center shadow rounded-md p-3 ${
          theme === "dark" ? "bg-slate-800 text-slate-100" : "bg-white text-black"
        }`}
      >
        {getPathContent()}
        <div className="relative">
          <button
            className="relative"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <NotificationsIcon fontSize="large" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div
              className={`absolute right-0 top-10 w-80 max-h-64 overflow-y-auto shadow-lg border rounded-md z-50 p-3 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700 text-slate-100"
                  : "bg-white border-gray-200 text-black"
              }`}
            >
              <h3 className="font-semibold mb-2">Recent Activities</h3>
              {notifications.length > 0 ? (
                <div className="flex flex-col gap-2 text-sm">
                  {notifications.map((item) => (
                    <div key={item.id} className="p-2 rounded bg-black/5">
                      {item.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-darkGray">No activity yet.</p>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
