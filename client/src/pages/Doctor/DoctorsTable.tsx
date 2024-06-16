import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { columns } from "../../components/columnStructure";
import { useState } from "react";
import { useAdminUser } from "../../contexts/adminUserContext";
import { searchName } from "../../components/searchTableName";
import { createData } from "../../components/createTableData";
import { Doctor } from "../../contexts/doctorUserContext";
import { Patient } from "../../contexts/patientUserContext";

export interface Row {
  _id: string | undefined;
  id: string;
  createdAt: string;
  username: JSX.Element | string;
  age: number;
  country: string;
  gender: string;
  action?: JSX.Element;
}

export interface TableProps {
  openActionForm?: string;
  selectedId?: string;
  setActionForm?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
  doctors?: Doctor[];
  patients?: Patient[];
  setDoctor?: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
  loading?: Boolean;
}
export default function DoctorsTable({
  setActionForm,
  setSelectedId,
  doctors,
  loading,
}: TableProps) {
  const path = "doctors/doctor";
  const tableRows =
    doctors?.map((doctor) =>
      createData(doctor, path, setActionForm, setSelectedId),
    ) ?? [];
  const [searchedItems, setSearchedItem] = useState<Row[]>(tableRows);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
      <h1 className="text-2xl mb-4">LATEST DOCTORS</h1>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex flex-col items-center">
          <Paper
            sx={{
              width: "100%",
              background: "inherit",
              overflow: "hidden",
            }}
          >
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
                        style={{
                          minWidth: column.minWidth,
                        }}
                        sx={{ background: "inherit" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsToRender
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
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
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : column.formatDate &&
                                    typeof value === "string"
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
              count={tableRows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </div>
  );
}
