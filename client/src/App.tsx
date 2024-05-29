import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import { AdminUserProvider } from "./contexts/adminUserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import { DoctorDetails } from "./pages/Doctor/DoctorDetails";
import PatientsTable from "./pages/Patient/PatientsTable";
import { PatientDetails } from "./pages/Patient/PatientDetails";
import DoctorsTable from "./pages/Doctor/DoctorsTable";
import DoctorScheduledAppointmentTable from "./pages/Doctor/DoctorScheduledAppointmentTable";
import DoctorCompletedAppointmentTable from "./pages/Doctor/DoctorCompletedAppointmentTable";
import PatientScheduledAppointmentTable from "./pages/Patient/PatientScheduledAppointmentTable";
import PatientCompletedAppointmentTable from "./pages/Patient/PatientCompletedAppointmentTable";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminHomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "dashboard",
        element: <AdminDashBoard />,
        children: [
          {
            path: "doctor/:doctorId",
            element: <DoctorDetails />,
            children: [
              {
                index: true,
                path: "active",
                element: <DoctorScheduledAppointmentTable />,
              },
              {
                path: "completion",
                element: <DoctorCompletedAppointmentTable />,
              },
              {
                path: "patients",
                element: <PatientsTable />,
              },
            ],
          },
          {
            path: "patient/:patientId",
            element: <PatientDetails />,
            children: [
              {
                index: true,
                path: "active",
                element: <PatientScheduledAppointmentTable />,
              },
              {
                path: "completion",
                element: <PatientCompletedAppointmentTable />,
              },
              {
                path: "patients",
                element: <DoctorsTable />,
              },
            ],
          },
        ],
      },
      {
        path: "doctors",
        element: <DoctorHomePage />,
        children: [
          {
            path: "doctor/:doctorId",
            element: <DoctorDetails />,
            children: [
              {
                index: true,
                path: "active",
                element: <DoctorScheduledAppointmentTable />,
              },
              {
                path: "completion",
                element: <DoctorCompletedAppointmentTable />,
              },
              {
                path: "patients",
                element: <PatientsTable />,
              },
            ],
          },
        ],
      },
      {
        path: "patients",
        element: <PatientHomePage />,
        children: [
          {
            path: "patient/:patientId",
            element: <PatientDetails />,
            children: [
              {
                index: true,
                path: "active",
                element: <PatientScheduledAppointmentTable />,
              },
              {
                path: "completion",
                element: <PatientCompletedAppointmentTable />,
              },
              {
                path: "doctors",
                element: <DoctorsTable />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <AdminUserProvider>
      <RouterProvider router={router} />
    </AdminUserProvider>
  );
}

export default App;
