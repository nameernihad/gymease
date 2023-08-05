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

const columns = [
  { id: "name", label: "Trainer Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "isTrainer",
    label: "Is Trainer",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
  {
    id: "isBlock",
    label: "Is Block",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
];

const TrainerListing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await adminAxios.get("/getAllTrainer");
      if (
        typeof response.data === "object" &&
        Array.isArray(response.data.Trainerdetails)
      ) {
        // Extract the Trainerdetails array from the response
        const trainersArray = response.data.Trainerdetails;
        setData(trainersArray);
      } else {
        console.error(
          "Invalid response format: Expected a JSON object with Trainerdetails array"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                    backgroundColor: "#f5f5f5", // Set the background color here
                    fontWeight: "bold", // Optionally set other styles for the table head
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((trainer) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={trainer._id} // Use the _id as the unique key
                >
                  <TableCell>{trainer.name}</TableCell>
                  <TableCell>{trainer.email}</TableCell>
                  <TableCell align="right">{trainer.phone}</TableCell>
                  <TableCell align="right">
                    {trainer.isTrainer.toString()}
                  </TableCell>
                  <TableCell align="right">
                    {trainer.isBlock.toString()}
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TrainerListing;
