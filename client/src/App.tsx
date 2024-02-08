import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import { AdminUserProvider } from "./contexts/adminUserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import DoctorsTable from "./pages/Admin/DoctorsTable";
import PatientsTable from "./pages/Admin/PatientsTable";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "doctors",
        element: <DoctorsTable />,
      },
      {
        path: "patients",
        element: <PatientsTable />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/doctor",
    element: <DoctorHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <PatientHomePage />,
    errorElement: <ErrorPage />,
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
