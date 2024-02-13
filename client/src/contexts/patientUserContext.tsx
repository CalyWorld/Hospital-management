import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Image } from "./doctorUserContext";

export interface Patient {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  image?: Image;
  gender: string;
  country: string;
  age: number;
  createdAt: string;
  __v?: number;
  _id?: string;
  id: string;
}

interface PatientContextProps {
  patients: Patient[] | null;
  loading: boolean;
  setPatient: React.Dispatch<React.SetStateAction<Patient[] | null>>;
}

interface PatientProviderProps {
  children: ReactNode;
}

const PatientContext = createContext<PatientContextProps | undefined>(
  undefined,
);

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("PatientContext must be used within PatientProvider");
  }
  return context;
};

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}: PatientProviderProps) => {
  const [patients, setPatient] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let idCounter = 0;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_PATIENT_API_DETAILS}`,
          {
            method: "GET",
          },
        );
        if (response.ok) {
          const patientData = await response.json();
          const patientsDataWithId = patientData.map((patient: Patient) => ({
            ...patient,
            id: ++idCounter,
          }));
          setLoading(false);
          setPatient(patientsDataWithId);
        } else {
          const errorData = await response.json();
          console.log(errorData.message);
        }
      } catch (err) {
        console.error("Error occurred during patient data fetch", err);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({ patients, loading, setPatient }),
    [patients, loading, setPatient],
  );

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};
