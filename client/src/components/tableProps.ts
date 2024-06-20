import { Doctor } from "../contexts/doctorUserContext";
import { Patient } from "../contexts/patientUserContext";
export interface TableProps {
  openActionForm?: string;
  selectedId?: string;
  setActionForm?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
  doctors?: Doctor[];
  patients?: Patient[];
  setDoctor?: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
  loading?: boolean;
}
