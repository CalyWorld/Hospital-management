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
import { Doctor } from "../../../contexts/doctorUserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminUser } from "../../../contexts/adminUserContext";

interface Column {
  id: keyof Doctor;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  formatDate?: (value: string) => string;
}

const columns: Column[] = [
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
];

function createData({
  _id,
  id,
  createdAt,
  firstName,
  lastName,
  age,
  country,
  gender,
}: Doctor) {
  const username = `${firstName} ${lastName}`;
  return { _id, id, createdAt, username, age, country, gender };
}

export default function DoctorsTable() {
  const { useGetDoctorAndPatientData } = useAdminUser();
  const { doctors, loading } = useGetDoctorAndPatientData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = doctors?.map((doctor: Doctor) => createData(doctor)) ?? [];
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
    <div className="p-5">
      <h2>LATEST DOCTORS</h2>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
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
                    console.log(
                      location.pathname.includes("/admin"),
                      location.pathname,
                    );
                    return (
                      <TableRow
                        component={Link}
                        to={`${
                          location.pathname.includes("/admin") &&
                          `/admin/doctors/doctor/${row._id}`
                        }`}
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
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : column.formatDate && typeof value === "string"
                                ? column.formatDate(value)
                                : value}
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
      )}
    </div>
  );
}
