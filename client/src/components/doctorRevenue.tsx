import { Treatments } from "../types";
import { currentMonth } from "./currentMonth";
export const doctorRevenue = (doctorTreatments: Treatments[] | null) => {
  const allTreatmentsFees = doctorTreatments?.map(
    (treatment) => treatment.totalFee,
  );
  const totalRevenueAllTime = allTreatmentsFees?.reduce(
    (accumulator, currentValue) => accumulator + (currentValue || 0),
    0,
  );

  const treatmentsWithinCurrentMonth = doctorTreatments?.filter((treatment) => {
    const treatmentDate = new Date(treatment.date);
    if (isNaN(treatmentDate.getTime())) {
      return false;
    }
    return (
      treatmentDate
        .toLocaleDateString("en-us", { month: "short" })
        .toLowerCase() === currentMonth
    );
  });

  const totalRevenueCurrentMonth = treatmentsWithinCurrentMonth?.reduce(
    (accumulator, currentTreatment) =>
      accumulator + (currentTreatment.totalFee || 0),
    0,
  );

  return {
    totalRevenueAllTime: totalRevenueAllTime || 0,
    totalRevenueCurrentMonth: totalRevenueCurrentMonth || 0,
  };
};
