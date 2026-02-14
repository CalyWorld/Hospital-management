import { lazy, Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditDoctorDetail from "./forms/EditDoctorDetailsForm";
import DeleteDoctor from "./forms/DeleteDoctorForm";
import BookAppointment from "./forms/BookAppointment";
import EditPatientDetailsForm from "./forms/EditPatientDetailsForm";
import DeletePatientForm from "./forms/DeletePatientForm";
import { AppDispatch } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { resetActionForm } from "./redux/actionFormSlice";

const AdminHomePage = lazy(() => import("./pages/Admin/AdminHomePage"));
const AdminDashBoard = lazy(() => import("./pages/Admin/AdminDashBoard"));
const DoctorHomePage = lazy(() => import("./pages/Doctor/DoctorHomePage"));
const PatientHomePage = lazy(() => import("./pages/Patient/PatientHomePage"));
const AppointmentsHomePage = lazy(
  () => import("./pages/Appointments/AppointmentsHomepage"),
);
const AdminSettings = lazy(() => import("./pages/Admin/AdminSettings"));
const ErrorPage = lazy(() => import("./errorPage"));
const DoctorDetails = lazy(() =>
  import("./pages/Doctor/DoctorDetails").then((module) => ({
    default: module.DoctorDetails,
  })),
);
const PatientDetails = lazy(() =>
  import("./pages/Patient/PatientDetails").then((module) => ({
    default: module.PatientDetails,
  })),
);
const DoctorScheduledAppointmentTable = lazy(
  () => import("./pages/Doctor/DoctorScheduledAppointmentTable"),
);
const DoctorCompletedAppointmentTable = lazy(
  () => import("./pages/Doctor/DoctorCompletedAppointmentTable"),
);
const PatientsTable = lazy(() => import("./pages/Patient/PatientsTable"));
const PatientScheduledAppointmentTable = lazy(
  () => import("./pages/Patient/PatientScheduledAppointmentTable"),
);
const PatientCompletedAppointmentTable = lazy(
  () => import("./pages/Patient/PatientCompletedAppointmentTable"),
);

function withSuspense(element: JSX.Element) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10 text-darkGray">
          Loading...
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { openActionForm, selectedId } = useSelector(
    (state: RootState) => state.actionForm,
  );
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/admin",
          element: withSuspense(<AdminHomePage />),
          errorElement: withSuspense(<ErrorPage />),
          children: [
            {
              index: true,
              element: withSuspense(<AdminDashBoard />),
            },
            {
              path: "dashboard",
              element: withSuspense(<AdminDashBoard />),
              children: [
                {
                  path: "doctor/:doctorId/*",
                  element: withSuspense(<DoctorDetails />),
                },
                {
                  path: "patient/:patientId/*",
                  element: withSuspense(<PatientDetails />),
                },
              ],
            },
            {
              path: "appointments",
              element: withSuspense(<AppointmentsHomePage />),
            },
            {
              path: "settings",
              element: withSuspense(<AdminSettings />),
            },
            {
              path: "doctors",
              element: withSuspense(<DoctorHomePage />),
              children: [
                {
                  path: "doctor/:doctorId/*",
                  element: withSuspense(<DoctorDetails />),
                  children: [
                    {
                      index: true,
                      path: "active",
                      element: withSuspense(<DoctorScheduledAppointmentTable />),
                    },
                    {
                      path: "completion",
                      element: withSuspense(<DoctorCompletedAppointmentTable />),
                    },
                    {
                      path: "patients",
                      element: withSuspense(<PatientsTable />),
                    },
                  ],
                },
              ],
            },
            {
              path: "patients",
              element: withSuspense(<PatientHomePage />),
              children: [
                {
                  path: "patient/:patientId/*",
                  element: withSuspense(<PatientDetails />),
                  children: [
                    {
                      path: "active",
                      element: withSuspense(<PatientScheduledAppointmentTable />),
                    },
                    {
                      path: "completion",
                      element: withSuspense(<PatientCompletedAppointmentTable />),
                    },
                    {
                      path: "doctors",
                      element: withSuspense(
                        <PatientsTable mode="doctorsForPatient" />,
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]),
    [],
  );

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
