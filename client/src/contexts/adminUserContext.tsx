import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { Doctor } from "./doctorUserContext";
import { Patient } from "./patientUserContext";
interface AdminUser {
  username: string;
  password: string;
  __v: number;
  _id: string;
}

interface AdminUserContextProps {
  adminUser: AdminUser | null;
  doctors: Doctor[] | null;
  loading: boolean;
  setDoctor?: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
  patients: Patient[] | null;
  setPatient?: React.Dispatch<React.SetStateAction<Patient[] | null>>;
  setAdminUser: React.Dispatch<React.SetStateAction<AdminUser | null>>;
  updateAdminUserDetails: (updatedDetails: AdminUser) => void;
}

interface AdminUserProviderProps {
  children: ReactNode;
}

const AdminUserContext = createContext<AdminUserContextProps | undefined>(
  undefined,
);

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("useAdminUser must be used within AdminUserProvider");
  }
  return context;
};

export const AdminUserProvider: React.FC<AdminUserProviderProps> = ({
  children,
}: AdminUserProviderProps) => {
  const adminUserFromCookies = Cookies.get("adminUser");
  const initialUser = adminUserFromCookies
    ? JSON.parse(adminUserFromCookies)
    : null;

  const [adminUser, setAdminUser] = useState<AdminUser | null>(initialUser);
  const [doctors, setDoctor] = useState<Doctor[] | null>(null);
  const [patients, setPatient] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let idCounter1 = 0;
    let idCounter2 = 0;
    async function fetchData() {
      try {
        if (adminUser) {
          Cookies.set("adminUser", JSON.stringify(adminUser), { expires: 29 });
          const [doctorResponse, patientResponse] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_DOCTOR_API_DETAILS}`, {
              method: "GET",
            }),
            fetch(`${import.meta.env.VITE_API_PATIENT_API_DETAILS}`, {
              method: "GET",
            }),
          ]);
          if (doctorResponse.ok && patientResponse.ok) {
            const [doctorData, patientData] = await Promise.all([
              doctorResponse.json(),
              patientResponse.json(),
            ]);
            const doctorsDataWithId = doctorData.map((doctor: Doctor) => ({
              ...doctor,
              id: ++idCounter1,
            }));
            const patientsDataWithId = patientData.map((patient: Patient) => ({
              ...patient,
              id: ++idCounter2,
            }));
            setLoading(false);
            setDoctor(doctorsDataWithId);
            setPatient(patientsDataWithId);
          }
        } else {
          Cookies.remove("adminUser");
        }
      } catch (err) {
        console.log("error getting data", err);
      }
    }
    fetchData();
  }, [adminUser]);

  const updateAdminUserDetails = (updatedDetails: AdminUser) => {
    setAdminUser((prevAdminUser) => ({
      ...prevAdminUser,
      ...updatedDetails,
    }));
  };

  const contextValue = {
    adminUser,
    doctors,
    patients,
    loading,
    setAdminUser,
    updateAdminUserDetails,
  };

  return (
    <AdminUserContext.Provider value={contextValue}>
      {children}
    </AdminUserContext.Provider>
  );
};
