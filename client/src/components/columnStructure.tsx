import { Doctor } from "../contexts/doctorUserContext";

interface Column {
  id: keyof Doctor;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  formatDate?: (value: string) => string;
}

export const columns: Column[] = [
  {
    id: "id",
    label: "NO",
    minWidth: 40,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "DATE",
    minWidth: 40,
    align: "center",
    formatDate: (value: string) => {
      return new Date(value).toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  { id: "username", label: "NAME", minWidth: 40, align: "center" },
  {
    id: "age",
    label: "AGE",
    minWidth: 40,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "country", label: "COUNTRY", minWidth: 40, align: "center" },
  { id: "gender", label: "GENDER", minWidth: 40, align: "center" },
  { id: "actions", label: "ACTION", minWidth: 40, align: "center" },
];
