import { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import { columns } from "../../components/columnStructure";
import { searchName } from "../../components/searchTableName";
import { createDoctorTableData } from "../../components/createDoctorTableData";
import { ActionDoctorEnum } from "../../components/actionEnum";
import { InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export interface Row {
  _id?: string;
  id: number;
  createdAt: Date;
  username: React.ReactElement;
  age: number;
  country: string;
  gender: string;
  action?: JSX.Element;
}

export default function DoctorsTable() {
  const path = "doctors/doctor";
  const dispatch = useDispatch();
  const currentAction: typeof ActionDoctorEnum = ActionDoctorEnum;

  const doctors = useSelector(
    (state: RootState) => state.doctorAndPatientUser.doctors,
  );
  const loading = useSelector(
    (state: RootState) => state.doctorAndPatientUser.loading,
  );

  const [searchedItems, setSearchedItem] = useState<Row[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // const isAdminPath = location.pathname.includes("/admin");

  const tableRows =
    doctors?.map((doctor) =>
      createDoctorTableData(doctor, currentAction, dispatch),
    ) ?? [];

  // console.log(doctors);

  useEffect(() => {
    if (searchedItems.length === 0 && tableRows.length > 0) {
      setSearchedItem(tableRows);
    }
  }, [tableRows, searchedItems]);

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
        <div>
          <Paper
            sx={{
              width: "100%",
              background: "inherit",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 2px",
                display: "flex",
                width: "100%",
                maxWidth: "200px",
                marginTop: "5px",
                marginBottom: "5px",
                marginLeft: "5px",
                borderRadius: "4px",
                boxShadow: "0px 0px 4px rgba(0,0,0,0.2)", // Optional: subtle shadow
              }}
            >
              <InputBase
                placeholder="Enter Doctor Name"
                onChange={(e) => {
                  searchName(e, tableRows, setSearchedItem);
                }}
                inputProps={{ "aria-label": "enter doctor name" }}
                sx={{ flex: 1 }}
              />
              <IconButton type="button" aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
              </IconButton>
            </Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
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
