import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { Patient } from "../../contexts/patientUserContext";
import { useState, useEffect } from "react";
import { TableProps } from "../Doctor/DoctorsTable";
import { createData } from "../../components/createTableData";
import { searchName } from "../../components/searchTableName";
import { useAdminUser } from "../../contexts/adminUserContext";
import { columns } from "../../components/columnStructure";
import { Row } from "../Doctor/DoctorsTable";

export default function PatientsTable({ setActionForm }: TableProps) {
  const { useGetDoctorAndPatientData } = useAdminUser();
  const { patients, loading } = useGetDoctorAndPatientData();
  const path = "patients/patient";
  const tableRows =
    patients?.map((patient: Patient) =>
      createData(patient, path, setActionForm),
    ) ?? [];
  const [searchedItems, setSearchedItem] = useState<Row[]>(tableRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    if (searchedItems.length === 0 && tableRows.length > 0) {
      setSearchedItem(tableRows);
    }
  }, [tableRows]);

  const productsToRender = searchedItems.length ? searchedItems : tableRows;

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
    <div className="p-3">
      <h2 className="text-2xl mb-4">LATEST PATIENTS</h2>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <form className="relative">
            <TextField
              id="search-bar"
              className="text"
              label="Enter Doctor Name"
              variant="outlined"
              placeholder="Search..."
              size="small"
              onChange={(e) => {
                searchName(e, tableRows, setSearchedItem);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon style={{ fill: "blue" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
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
                {productsToRender
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
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
            count={tableRows.length}
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
