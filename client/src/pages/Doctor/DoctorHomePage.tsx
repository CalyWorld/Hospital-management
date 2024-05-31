import { useState } from "react";
import DoctorsTable from "./DoctorsTable";
import EditDoctorDetail from "../../forms/EditDoctorDetailsForm";
import DeleteDoctor from "../../forms/DeleteDoctorForm";
import BookAppointment from "../../forms/BookAppointment";
import { Outlet, useLocation } from "react-router";
export default function DoctorHomePage() {
  const [openActionForm, setActionForm] = useState<string>("");
  const location = useLocation();
  return (
    <div className="m-10 shadow bg-white rounded-md relative">
      {location.pathname === "/admin/doctors" ? (
        <div className="relative">
          {" "}
          {openActionForm === "editForm" && <EditDoctorDetail />}
          {openActionForm === "deleteDoctor" && <DeleteDoctor />}
          {openActionForm === "bookPatient" && <BookAppointment />}
          <DoctorsTable setActionForm={setActionForm} />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
