import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./components/Patient/PatientHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import { AdminUserProvider } from "./contexts/adminUserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import { DoctorProvider } from "./contexts/doctorUserContext";
import { PatientProvider } from "./contexts/patientUserContext";
import { DoctorDetails } from "./pages/Doctor/DoctorDetails";

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
          },
        ],
      },
      {
        path: "patients",
        element: <PatientHomePage />,
      },
    ],
  },
]);
function App() {
  return (
    <AdminUserProvider>
      <DoctorProvider>
        <PatientProvider>
          <RouterProvider router={router} />
        </PatientProvider>
      </DoctorProvider>
    </AdminUserProvider>
  );
}

export default App;
