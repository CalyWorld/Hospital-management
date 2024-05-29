import { useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";
import {
  Medications,
  Records,
  useAdminUser,
} from "../../contexts/adminUserContext";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export function PatientDetails() {
  const [activeTabLink, setActiveTabLink] = useState<string>("");
  const [patientRecords, setPatientRecord] = useState<Records[] | null>(null);
  const [medications, setMedications] = useState<Medications[] | null>(null);
  const { useGetPatientDetails, useGetPatientAppointments } = useAdminUser();
  const { patientId } = useParams();
  if (!patientId) {
    return;
  }
  const patientDetails = useGetPatientDetails(patientId);
  const patientAppointments = useGetPatientAppointments(patientId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:3000/api/admin/patient/records/${patientId}`;
        const recordsResponse = await fetch(apiUrl, {
          method: "GET",
        });
        const patientRecordsData = await recordsResponse.json();
        setPatientRecord(patientRecordsData);

        const medicationIds = patientRecordsData
          ?.flatMap((records: Records) =>
            records.treatments.map((treatment) => treatment.medication),
          )
          .flat();

        await Promise.all(
          medicationIds?.map(async (medicationId: string) => {
            try {
              const apiUrl = `http://localhost:3000/api/admin/patient/medications/${medicationId}`;
              const response = await fetch(apiUrl, {
                method: "GET",
              });
              const medicationData = await response.json();
              setMedications([medicationData]);
            } catch (err) {
              console.error(
                `Error Fetching medication with ID ${medicationId}`,
                err,
              );
            }
          }) || [],
        );
      } catch (err) {
        console.error("err getting records", err);
      }
    };
    fetchData();
  }, [patientId]);

  const isCompleted = patientAppointments?.filter(
    (appointment) => appointment.status.toLocaleLowerCase() === "completed",
  );
  const isScheduled = patientAppointments?.filter(
    (appointment) =>
      appointment.status.toLocaleLowerCase() === "scheduled" || "canceled",
  );

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

  //Get Current Month
  const currentMonth = new Date()
    .toLocaleDateString("en-us", {
      month: "short",
    })
    .toLowerCase();

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

  const loading = !patientDetails;

  return (
    <div className="flex flex-col gap-5 p-3">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl">{`${patientDetails?.firstName} ${patientDetails?.lastName}`}</h1>
          <div className="flex justify-center gap-10 p-5">
            <div className="w-full flex flex-col gap-10">
              <div className="flex gap-1">
                <Link
                  to={`/admin/patients/patient/${patientId}/active`}
                  style={{
                    boxShadow:
                      activeTabLink === "active"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "active" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    borderTop:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    borderBottom:
                      activeTabLink !== "active" ? "2px solid #e5e7eb" : "none",
                    borderRight:
                      activeTabLink === "active" ? "2px solid #e5e7eb" : "none",
                    color: activeTabLink === "active" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("active");
                  }}
                >
                  {`Active Consultations (${isScheduled?.length})`}
                </Link>
                <Link
                  to={`/admin/patients/patient/${patientId}/completion`}
                  style={{
                    boxShadow:
                      activeTabLink === "completed"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "completed" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    borderTop:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    borderBottom:
                      activeTabLink === "completed"
                        ? "none"
                        : "1px solid #e5e7eb",
                    borderRight:
                      activeTabLink === "completed"
                        ? "2px solid #e5e7eb"
                        : "none",
                    color:
                      activeTabLink === "completed" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("completed");
                  }}
                >
                  {`Completed Consultations (${isCompleted?.length})`}
                </Link>
                <Link
                  to={`/admin/patients/patient/${patientId}/doctors`}
                  style={{
                    boxShadow:
                      activeTabLink === "doctor"
                        ? "inset 2 2 2px rgba(0, 0, 0, 0.1)"
                        : "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      activeTabLink === "doctor" ? "white" : "#e5e7eb",
                    borderLeft:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    borderTop:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    borderBottom:
                      activeTabLink === "doctor" ? "none" : "1px solid #e5e7eb",
                    borderRight:
                      activeTabLink === "doctor" ? "2px solid #e5e7eb" : "none",
                    color: activeTabLink === "doctor" ? "#172554" : "inherit",
                  }}
                  onClick={() => {
                    setActiveTabLink("doctor");
                  }}
                >{`Doctors (${patientDetails?.doctor?.length})`}</Link>
              </div>
              <Outlet />
            </div>
            <div className="w-96 flex flex-col gap-10">
              <div className="flex flex-col gap-5 bg-gray p-3">
                <div className="flex justify-between">
                  <div>
                    <h2>Fees last 30 days</h2>
                    <h1>{`₱${
                      totalRevenueCurrentMonth + totalMedicationRevenueAllTime
                    }`}</h1>
                  </div>
                  <div>chart</div>
                </div>
                <div className="">
                  <h2>All Time Fees</h2>
                  <h1>{`₱${
                    totalTreatmentRevenue + totalMedicationRevenueAllTime
                  }`}</h1>
                </div>
              </div>
              <div className=" flex flex-col bg-[#e5e7eb] gap-10 p-3 shadow rounded-md">
                {" "}
                <div>
                  <p className="text-[#6b7280]">Phone number</p>
                  <p>{`+63 ${patientDetails.phoneBook}`}</p>
                </div>
                <div>
                  <p className="text-[#6b7280]">Address</p>
                  <p>{patientDetails.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
