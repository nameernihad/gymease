import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import adminAxios from "../../../Axios/adminAxios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "profilePhoto", label: "Profile Photo", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "experience", label: "Experience", minWidth: 170 },
  { id: "fullView", label: "Full View", minWidth: 100 },
];

const TrainerRequestList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    adminAxios.get("/trainerRequest").then((res) => {
      console.log(res.data.allTrainerRequest.allRequest);
      setRequests(res.data.allTrainerRequest.allRequest || []); // Ensure requests is an array or set it to an empty array if undefined
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
      <div className="bg-slate-100 h-screen p-4">
        <div className="flex justify-center">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
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
                  {requests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{request.user.name}</TableCell>
                      <TableCell align="center">
                        <img
                          src={request.profilePhoto}
                          alt={request.user.name}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </TableCell>
                      <TableCell align="center">{request.user.email}</TableCell>
                      <TableCell align="center">{request.user.phone}</TableCell>
                      <TableCell align="center">{request.gender}</TableCell>
                      <TableCell align="center">{`${request.experience.years} years, ${request.experience.months} months`}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary">
                          Full View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={Array.isArray(requests) ? requests.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default TrainerRequestList;
