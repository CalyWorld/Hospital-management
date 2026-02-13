import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import EditDoctorDetail from "./forms/EditDoctorDetailsForm";
import DeleteDoctor from "./forms/DeleteDoctorForm";
import BookAppointment from "./forms/BookAppointment";
import EditPatientDetailsForm from "./forms/EditPatientDetailsForm";
import DeletePatientForm from "./forms/DeletePatientForm";
import { AppDispatch } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { resetActionForm } from "./redux/actionFormSlice";
import { PatientDetails } from "./pages/Patient/PatientDetails";
import { DoctorDetails } from "./pages/Doctor/DoctorDetails";
import DoctorScheduledAppointmentTable from "./pages/Doctor/DoctorScheduledAppointmentTable";
import DoctorCompletedAppointmentTable from "./pages/Doctor/DoctorCompletedAppointmentTable";
import PatientsTable from "./pages/Patient/PatientsTable";
import AppointmentsHomePage from "./pages/Appointments/AppointmentsHomepage";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { openActionForm, selectedId } = useSelector(
    (state: RootState) => state.actionForm,
  );
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
              path: "doctor/:doctorId/*",
              element: <DoctorDetails />,
            },
            {
              path: "patient/:patientId/*",
              element: <PatientDetails />,
            },
          ],
        },
        {
          path: "appointments",
          element: <AppointmentsHomePage />,
        },
        {
          path: "doctors",
          element: <DoctorHomePage />,
          children: [
            {
              path: "doctor/:doctorId/*",
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
                { path: "patients", element: <PatientsTable /> },
              ],
            },
          ],
        },
        {
          path: "patients",
          element: <PatientHomePage />,
          children: [
            {
              path: "patient/:patientId/*",
              element: <PatientDetails />,
            },
          ],
        },
      ],
    },
  ]);

  const handleClose = () => {
    dispatch(resetActionForm());
  };

  return (
    <div className="w-full flex flex-col flex-grow min-h-full">
      <RouterProvider router={router} />
      {openActionForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => {
            handleClose();
          }}
        >
          <div
            className="bg-white shadow-lg rounded-md w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {openActionForm === "editDoctorForm" && selectedId && (
              <EditDoctorDetail selectedId={selectedId} />
            )}
            {openActionForm === "deleteDoctorForm" && selectedId && (
              <DeleteDoctor selectedId={selectedId} />
            )}
            {openActionForm === "bookPatient" && selectedId && (
              <BookAppointment selectedId={selectedId} />
            )}
            {openActionForm === "editPatientForm" && selectedId && (
              <EditPatientDetailsForm selectedId={selectedId} />
            )}
            {openActionForm === "deletePatientForm" && selectedId && (
              <DeletePatientForm selectedId={selectedId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
