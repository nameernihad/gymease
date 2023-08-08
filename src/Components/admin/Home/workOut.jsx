import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import adminAxios from "../../../Axios/adminAxios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const columns = [
  { id: "index", label: "Si/no", minWidth: 50 },
  { id: "name", label: "Trainer Name", minWidth: 170 },
  { id: "description", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
  {
    id: "view",
    label: "View",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
];

const TrainerListing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [trainerdetails, settrainerdetails] = useState([]);

  const handleBlockToggle = (userId) => {
    adminAxios.put(`/blocktrainer/${userId}`).then((res) => {
      console.log(res.data);
      toast.success(res.data.message);

      settrainerdetails((prevtrainerDetails) =>
        prevtrainerDetails.map((user) =>
          user._id === userId ? { ...user, isBlock: !user.isBlock } : user
        )
      );
    });
  };

  useEffect(() => {
    adminAxios.get("/getAllWorkouts").then((res) => {
      settrainerdetails(res.data.Trainerdetails);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                        backgroundColor: "#666666",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {trainerdetails.map((trainer, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={trainer._id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{trainer.name}</TableCell>
                      <TableCell>{trainer.email}</TableCell>
                      <TableCell align="right">{trainer.phone}</TableCell>
                      <TableCell align="right">
                        <button
                          type="button"
                          className={`${
                            trainer.isBlock ? "text-green-700" : "text-red-700"
                          } hover:text-white border  ${
                            trainer.isBlock
                              ? "hover:bg-green-800 "
                              : "hover:bg-red-800 "
                          } focus:outline-none ${
                            trainer.isBlock
                              ? "focus:ring-green-300"
                              : "focus:ring-red-300"
                          } font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                            trainer.isBlock
                              ? "dark:border-green-500"
                              : "dark:border-red-500"
                          } ${
                            trainer.isBlock
                              ? "dark:text-green-500"
                              : "dark:text-red-500"
                          } dark:hover:text-white ${
                            trainer.isBlock
                              ? "dark:hover:bg-green-600"
                              : "dark:hover:bg-red-600"
                          } ${
                            trainer.isBlock
                              ? "dark:focus:ring-green-800"
                              : "dark:focus:ring-red-800"
                          }`}
                          onClick={() => handleBlockToggle(trainer._id)}
                        >
                          {trainer.isBlock ? "Unblock" : "Block"}
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={trainerdetails.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default TrainerListing;
