import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Patient } from "./patientUserContext";

export interface Image {
  data: Buffer;
  contentType: string;
}

export interface Doctor {
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
  patient: [Patient];
}

interface DoctorContextProps {
  doctors: Doctor[] | null;
  loading: boolean;
  setDoctor: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
}

interface DoctorProviderProps {
  children: ReactNode;
}

const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("DoctorContext must be used within DoctorProvider");
  }
  return context;
};

export const DoctorProvider: React.FC<DoctorProviderProps> = ({
  children,
}: DoctorProviderProps) => {
  const [doctors, setDoctor] = useState<Doctor[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   let idCounter = 0;
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_DOCTOR_API_DETAILS}`,
  //         {
  //           method: "GET",
  //         },
  //       );
  //       if (response.ok) {
  //         const doctorData = await response.json();
  //         const doctorsDataWithId = doctorData.map((doctor: Doctor) => ({
  //           ...doctor,
  //           id: ++idCounter,
  //         }));
  //         setLoading(false);
  //         setDoctor(doctorsDataWithId);
  //       } else {
  //         const errorData = await response.json();
  //         console.log(errorData.message);
  //       }
  //     } catch (err) {
  //       console.error("Error occurred during doctor data fetch", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const contextValue = useMemo(
    () => ({ doctors, loading, setDoctor }),
    [doctors, loading, setDoctor],
  );

  return (
    <DoctorContext.Provider value={contextValue}>
      {children}
    </DoctorContext.Provider>
  );
};
