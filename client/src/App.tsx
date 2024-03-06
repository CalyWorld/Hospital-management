import DoctorHomePage from "./components/pages/Doctor/DoctorHomePage";
import PatientHomePage from "./components/pages/Patient/PatientHomePage";
import AdminHomePage from "./components/pages/Admin/AdminHomePage";
import { AdminUserProvider } from "./contexts/adminUserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import AdminDashBoard from "./components/pages/Admin/AdminDashBoard";
import { DoctorDetails } from "./components/pages/Doctor/DoctorDetails";
import PatientsTable from "./components/pages/Patient/PatientsTable";
import { PatientDetails } from "./components/pages/Patient/PatientDetails";
import DoctorsTable from "./components/pages/Doctor/DoctorsTable";
import DoctorScheduledAppointmentTable from "./components/pages/Doctor/DoctorScheduledAppointmentTable";
import DoctorCompletedAppointmentTable from "./components/pages/Doctor/DoctorCompletedAppointmentTable";
import PatientScheduledAppointmentTable from "./components/pages/Patient/PatientScheduledAppointmentTable";
import PatientCompletedAppointmentTable from "./components/pages/Patient/PatientCompletedAppointmentTable";

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
