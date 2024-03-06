import AdminForm from "../../../forms/AdminForm";

export default function AdminLoginPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="image-container">
        <img
          src="https://img.freepik.com/free-vector/tiny-doctors-patients-near-hospital-flat-vector-illustration-therapist-face-mask-saying-goodbye-cured-people-near-medical-building-ambulance-emergency-clinic-concept_74855-25338.jpg"
          alt="admin-background"
        />
      </div>
      <AdminForm />
    </div>
  );
}
