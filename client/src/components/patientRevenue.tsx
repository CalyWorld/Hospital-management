import { Records } from "../contexts/adminUserContext";
import { Medications } from "../contexts/adminUserContext";
import { currentMonth } from "./currentMonth";
interface PatientRevenueParams {
  patientRecords: Records[] | null;
  medications: Medications[] | null;
}
export const patientRevenue = ({
  patientRecords,
  medications,
}: PatientRevenueParams) => {
  // Get total fees from patient medications
  const patientMedicationFees =
    medications?.map((medication) => medication.fee) ?? [];

  // Get all treatment fees for each patient record
  const allTreatmentFees =
    patientRecords?.map((record) =>
      record.treatments.map((treatment) => treatment.totalFee),
    ) ?? [];

  // Calculate total revenue from all treatment fees across all records
  const totalTreatmentRevenue =
    allTreatmentFees
      ?.flat()
      ?.reduce(
        (accumulator, currentValue) => accumulator + (currentValue || 0),
        0,
      ) ?? 0;

  // Calculate total revenue from patient medication fees across all records
  const totalMedicationRevenueAllTime =
    patientMedicationFees
      ?.flat()
      ?.reduce(
        (accumulator, currentValue) => accumulator + (currentValue || 0),
        0,
      ) ?? 0;

  //Get all Treatments from records
  const patientTreatments = patientRecords?.flatMap((record) =>
    record.treatments.map((treatment) => treatment),
  );

  //Get all Treatments within the Current Month
  const treatmentsWithinCurrentMonth = patientTreatments?.filter(
    (treatment) => {
      const treatmentDate = new Date(treatment.date);
      return (
        treatmentDate
          .toLocaleDateString("en-us", { month: "short" })
          .toLowerCase() === currentMonth
      );
    },
  );

  //Calculate Total Fees Within the Month
  const totalRevenueCurrentMonth =
    treatmentsWithinCurrentMonth?.reduce(
      (accumulator, currentTreatment) =>
        accumulator + (currentTreatment.totalFee || 0),
      0,
    ) ?? 0;

  return {
    totalTreatmentRevenue,
    totalRevenueCurrentMonth,
    totalMedicationRevenueAllTime,
  };
};
