import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
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

export interface Appointment {
  title: string;
  date: Date;
  status: string;
  doctor: Doctor;
  patient: Patient;
  patientName?: string;
  doctorName?: string;
  statusAndDate?: string;
  __v: number;
  id: number;
  _id: string;
}
export interface Medications {
  _id: string;
  name: string;
  fee: number;
  quantity: number;
  __v: number;
}

export interface Treatment {
  _id: string;
  name: string;
  date: Date;
  totalFee: number;
  doctor: [Doctor];
  medication?: [Medications];
  __v: number;
}

export interface Records {
  _id: string;
  patient: Patient;
  treatments: [Treatment];
}

interface DoctorAndPatientData {
  adminUser: AdminUser | null;
  setAdminUser: React.Dispatch<React.SetStateAction<AdminUser | null>>;
  doctors: Doctor[] | null;
  patients: Patient[] | null;
  loading: boolean;
}

interface TreatMentData {
  treatMentsData: Treatment[] | null;
  loading: boolean;
  totalRevenue: number;
}

interface AdminUserContextProps {
  useGetDoctorAndPatientData: () => DoctorAndPatientData;
  useGetDoctorDetails: (id: string) => Doctor | null;
  useGetPatientDetails: (id: string) => Patient | null;
  useUpdateAdminUserDetails: (updatedDetails: AdminUser) => void;
  useGetDoctorAppointments: (id: string) => Appointment[] | null;
  useGetPatientAppointments: (id: string) => Appointment[] | null;
  useGetDoctorTreatments: (id: string) => Treatment[] | null;
  useGetTotalRevenue: () => TreatMentData;
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
  const useGetDoctorAndPatientData = (): DoctorAndPatientData => {
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
            Cookies.set("adminUser", JSON.stringify(adminUser), {
              expires: 29,
            });
            const [doctorResponse, patientResponse] = await Promise.all([
              fetch("http://localhost:3000/api/admin/doctor", {
                method: "GET",
              }),
              fetch("http://localhost:3000/api/admin/patient", {
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
              const patientsDataWithId = patientData.map(
                (patient: Patient) => ({
                  ...patient,
                  id: ++idCounter2,
                }),
              );
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
    return { adminUser, setAdminUser, doctors, patients, loading };
  };

  const useUpdateAdminUserDetails = (updatedDetails: AdminUser) => {
    const { setAdminUser } = useGetDoctorAndPatientData();
    setAdminUser((prevAdminUser) => ({
      ...prevAdminUser,
      ...updatedDetails,
    }));
  };

  const useGetDoctorDetails = (doctorId: string) => {
    const [doctorDetailsData, setDoctorDetailsData] = useState<Doctor | null>(
      null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchDoctorDetails = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/doctor/${doctorId}`;
          const doctorDetailsResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const doctorDetailsData = await doctorDetailsResponse.json();
          setLoading(false);
          setDoctorDetailsData(doctorDetailsData);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      };

      fetchDoctorDetails();
    }, [doctorId]);
    return loading ? null : doctorDetailsData;
  };

  const useGetPatientDetails = (patientId: string) => {
    const [patientDetailsData, setPatientDetailsData] =
      useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchPatientDetails = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/patient/${patientId}`;
          const patientDetailsResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const patientDetailsData = await patientDetailsResponse.json();
          setLoading(false);
          setPatientDetailsData(patientDetailsData);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      };

      fetchPatientDetails();
    }, [patientId]);
    return loading ? null : patientDetailsData;
  };

  const useGetDoctorAppointments = (doctorId: string) => {
    const [doctorAppointmentData, setDoctorAppointmentData] = useState<
      Appointment[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/doctor/appointments/${doctorId}`;
          const appointmentsResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const appointmentsData = await appointmentsResponse.json();
          setLoading(false);
          setDoctorAppointmentData(appointmentsData);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
    }, [doctorId]);
    return loading ? null : doctorAppointmentData;
  };

  const useGetDoctorTreatments = (doctorId: string) => {
    const [doctorTreatmentData, setDoctorTreatmentData] = useState<
      Treatment[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchTreatments = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/doctor/treatments/${doctorId}`;
          const treatmentsResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const treatmentsData = await treatmentsResponse.json();
          setLoading(false);
          setDoctorTreatmentData(treatmentsData);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchTreatments();
    }, [doctorId]);
    return loading ? null : doctorTreatmentData;
  };

  const useGetPatientAppointments = (patientId: string) => {
    const [patientAppointmentData, setPatientAppointmentData] = useState<
      Appointment[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/patient/appointments/${patientId}`;
          const appointmentsResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const appointmentsData = await appointmentsResponse.json();
          setLoading(false);
          setPatientAppointmentData(appointmentsData);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
    }, [patientId]);
    return loading ? null : patientAppointmentData;
  };

  const useGetTotalRevenue = () => {
    const [treatMentsData, setTreatMentData] = useState<Treatment[] | null>(
      null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const medications = treatMentsData?.flatMap(
      (treatment) => treatment.medication,
    );
    const treatMentFees = treatMentsData?.map(
      (treatment) => treatment.totalFee,
    );
    const medicationFees = medications?.map((medication) => medication?.fee);
    const totalMedicationFees =
      medicationFees?.reduce(
        (accumulator, currentValue) => (accumulator || 0) + (currentValue || 0),
        0,
      ) ?? 0;
    const totalTreatMentFees =
      treatMentFees?.reduce(
        (accumulator, currentValue) => (accumulator || 0) + (currentValue || 0),
        0,
      ) ?? 0;
    const totalRevenue = totalMedicationFees + totalTreatMentFees;

    useEffect(() => {
      const fetchTreatMents = async () => {
        try {
          const apiUrl = `http://localhost:3000/api/admin/totalFees`;
          const treatMentResponse = await fetch(apiUrl, {
            method: "GET",
          });
          const treatMentData = await treatMentResponse.json();
          setLoading(false);
          setTreatMentData(treatMentData);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchTreatMents();
    }, []);
    return { treatMentsData, loading, totalRevenue };
  };

  const contextValue = useMemo(
    () => ({
      useGetDoctorAndPatientData,
      useUpdateAdminUserDetails,
      useGetDoctorDetails,
      useGetPatientDetails,
      useGetDoctorAppointments,
      useGetPatientAppointments,
      useGetDoctorTreatments,
      useGetTotalRevenue,
    }),
    [
      useGetDoctorAndPatientData,
      useUpdateAdminUserDetails,
      useGetDoctorDetails,
      useGetPatientDetails,
      useGetDoctorAppointments,
      useGetPatientAppointments,
      useGetDoctorTreatments,
      useGetTotalRevenue,
    ],
  );

  return (
    <AdminUserContext.Provider value={contextValue}>
      {children}
    </AdminUserContext.Provider>
  );
};
