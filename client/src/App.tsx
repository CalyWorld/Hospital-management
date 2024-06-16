import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import { useState } from "react";
import { useAdminUser } from "./contexts/adminUserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorPage";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import { DoctorDetails } from "./pages/Doctor/DoctorDetails";
import PatientsTable from "./pages/Patient/PatientsTable";
import { PatientDetails } from "./pages/Patient/PatientDetails";
import DoctorsTable from "./pages/Doctor/DoctorsTable";
import EditDoctorDetail from "./forms/EditDoctorDetailsForm";
import DeleteDoctor from "./forms/DeleteDoctorForm";
import BookAppointment from "./forms/BookAppointment";
import DoctorScheduledAppointmentTable from "./pages/Doctor/DoctorScheduledAppointmentTable";
import DoctorCompletedAppointmentTable from "./pages/Doctor/DoctorCompletedAppointmentTable";
import PatientScheduledAppointmentTable from "./pages/Patient/PatientScheduledAppointmentTable";
import PatientCompletedAppointmentTable from "./pages/Patient/PatientCompletedAppointmentTable";

function routerFunc() {
  const [openActionForm, setActionForm] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const { useGetDoctorAndPatientData } = useAdminUser();
  const { doctors, setDoctor, loading, patients } =
    useGetDoctorAndPatientData();

  // Check if data is still loading or undefined
  if (!doctors || !patients)
    return {
      router: undefined,
      openActionForm,
      setActionForm,
      selectedId,
      setSelectedId,
      doctors: [],
      patients: [],
      setDoctor,
      loading,
    };

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminHomePage openActionForm={openActionForm} />,
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
                  element: (
                    <PatientsTable
                      setActionForm={setActionForm}
                      patients={patients}
                      loading={loading}
                    />
                  ),
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
                  element: (
                    <DoctorsTable
                      setActionForm={setActionForm}
                      setSelectedId={setSelectedId}
                      doctors={doctors}
                      loading={loading}
                    />
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "doctors",
          element: (
            <DoctorHomePage
              setActionForm={setActionForm}
              setSelectedId={setSelectedId}
              doctors={doctors}
              loading={loading}
            />
          ),
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
                  element: (
                    <PatientsTable
                      setActionForm={setActionForm}
                      patients={patients}
                      loading={loading}
                    />
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "patients",
          element: (
            <PatientHomePage
              setActionForm={setActionForm}
              patients={patients}
              loading={loading}
            />
          ),
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
                  element: (
                    <DoctorsTable
                      setActionForm={setActionForm}
                      setSelectedId={setSelectedId}
                      doctors={doctors}
                      loading={loading}
                    />
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return {
    router,
    openActionForm,
    setActionForm,
    selectedId,
    setSelectedId,
    doctors,
    patients,
    setDoctor,
    loading,
  };
}

function App() {
  const {
    router,
    openActionForm,
    setActionForm,
    selectedId,
    setSelectedId,
    doctors,
    patients,
    setDoctor,
    loading,
  } = routerFunc();

  if (!router) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "24px",
        }}
      >
        Getting Page...
      </div>
    ); // Render a loading state while data is being fetched
  }

  return (
    <div className="relative">
      <div
        onClick={() => {
          if (
            openActionForm === "deleteDoctorForm" ||
            openActionForm === "editDoctorForm" ||
            openActionForm === "bookPatient"
          ) {
            setActionForm("");
            setSelectedId("");
          }
        }}
      >
        <RouterProvider router={router} />
      </div>
      {openActionForm && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1000",
          }}
        >
          {openActionForm === "editDoctorForm" && selectedId && (
            <EditDoctorDetail
              setActionForm={setActionForm}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              doctors={doctors}
              setDoctor={setDoctor}
              loading={loading}
            />
          )}
          {openActionForm === "deleteDoctorForm" && selectedId && (
            <DeleteDoctor
              selectedId={selectedId}
              setActionForm={setActionForm}
              setSelectedId={setSelectedId}
              doctors={doctors}
              setDoctor={setDoctor}
            />
          )}
          {openActionForm === "bookPatient" && selectedId && (
            <BookAppointment setActionForm={setActionForm} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
