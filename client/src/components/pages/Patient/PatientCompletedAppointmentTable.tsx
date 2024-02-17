import { useParams } from "react-router";
import { useState } from "react";
import { Appointment, useAdminUser } from "../../../contexts/adminUserContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Column {
  id: keyof Appointment;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  formatDate?: (value: string) => string;
}

const columns: Column[] = [
  { id: "title", label: "CONSULTATION", minWidth: 40, align: "center" },
  {
    id: "statusAndDate",
    label: "STATUS",
    minWidth: 40,
    align: "center",
  },
  { id: "doctorName", label: "DOCTOR", minWidth: 40, align: "center" },
];

function createData({ _id, title, status, date, doctor }: Appointment) {
  const doctorName = `${doctor.firstName} ${doctor.lastName}`;
  const formattedDate = new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const statusAndDate = `${status} ${formattedDate}`;
  return { _id, title, doctorName, statusAndDate };
}

export default function PatientCompletedAppointmentTable() {
  const { useGetPatientAppointments } = useAdminUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { patientId } = useParams();
  if (!patientId) {
    return;
  }
  const patientAppointmentData = useGetPatientAppointments(patientId);
  const loading = !patientAppointmentData;

  const rows = (
    patientAppointmentData?.map((appointment) => {
      if (appointment.status.toLocaleLowerCase() === "completed") {
        return createData(appointment);
      }
      return null;
    }) ?? []
  ).filter(Boolean);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : rows.length ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 110 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        className="cursor-pointer"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div className="flex justify-center">
          No Completed Appointment so far
        </div>
      )}
    </div>
  );
}
