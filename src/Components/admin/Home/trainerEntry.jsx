import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import adminAxios from "../../../Axios/adminAxios";
import { toast } from "react-toastify";

const columns = [
  { id: "index", label: "Si/no", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "profilePhoto", label: "Profile Photo", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "experience", label: "Experience", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "fullView", label: "Full View", minWidth: 100 },
];

const TrainerRequestList = () => {
  // State variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch trainer requests from the server
  useEffect(() => {
    adminAxios.get("/trainerRequest")
      .then((res) => {
        setRequests(res.data.allTrainerRequest.allRequest);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        toast.error("Failed to fetch trainer requests");
      });
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rowsPerPage change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when changing rowsPerPage
  };

  // Handle status change for a request
  const handleChangeStatus = (event, requestId) => {
    const newStatus = event.target.value;

    // Update the status for the specific request in the state
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === requestId ? { ...request, status: newStatus } : request
      )
    );

    // Send a request to update the status in the backend
    adminAxios
      .post(`/requestValidation/${requestId}`, { status: newStatus })
      .then((res) => {
        console.log(res.data);
        toast.success("Status successfully updated");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
      });
  };

  // Open the modal with the selected request
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
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
                {requests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {request.user ? request.user.name : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        <img
                          src={request.profilePhoto}
                          alt={request.user ? request.user.name : "N/A"}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {request.user ? request.user.email : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {request.user ? request.user.phone : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {request.gender ? request.gender : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {request.experience
                          ? `${request.experience.years} years, ${request.experience.months} months`
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <Select
                            onChange={(e) => handleChangeStatus(e, request._id)}
                            value={request.status}
                            label="Status"
                            style={{
                              color:
                                request.status === "pending"
                                  ? "orange"
                                  : request.status === "approve"
                                  ? "green"
                                  : request.status === "reject"
                                  ? "red"
                                  : "black",
                            }}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem
                              value="pending"
                              style={{ color: "orange" }}
                            >
                              Pending
                            </MenuItem>
                            <MenuItem
                              value="approve"
                              style={{ color: "green" }}
                            >
                              Approved
                            </MenuItem>
                            <MenuItem value="reject" style={{ color: "red" }}>
                              Rejected
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenModal(request)}
                        >
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
            count={requests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        {selectedRequest && (
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <DialogTitle className="text-2xl font-bold py-4 px-6">
              Full View
            </DialogTitle>
            <DialogContent className="p-4">
              <div className="max-h-[70vh] overflow-y-auto">
                {selectedRequest && (
                  <div className="">
                    <div className="w-full relative">
                      <img
                        src={selectedRequest.coverPhoto}
                        alt="Cover Photo"
                        className="w-full h-auto"
                      />
                      <img
                        src={selectedRequest.profilePhoto}
                        alt={
                          selectedRequest.user ? selectedRequest.user.name : "N/A"
                        }
                        className="rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white"
                      />
                    </div>
                    <div className="pl-4">
                      <h2 className="text-xl font-bold mb-2">
                        Name: {selectedRequest.user ? selectedRequest.user.name : "N/A"}
                      </h2>
                      <p>Email: {selectedRequest.user ? selectedRequest.user.email : "N/A"}</p>
                      <p>Phone: {selectedRequest.user ? selectedRequest.user.phone : "N/A"}</p>
                      <p>Gender: {selectedRequest.gender ? selectedRequest.gender : "N/A"}</p>
                      <p>Height: {selectedRequest.user ? selectedRequest.user.height : "N/A"} cm</p>
                      <p>Weight: {selectedRequest.user ? selectedRequest.user.weight : "N/A"} kg</p>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">About</h2>
                  <p>{selectedRequest ? selectedRequest.about : "N/A"}</p>
                  <h2 className="text-xl font-bold mt-4">Certifications</h2>
                  <ul className="list-disc ml-6">
                    {selectedRequest &&
                      selectedRequest.certifications.map((certification, index) => (
                        <li key={index}>
                          <a
                            href={certification}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Certification {index + 1}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <h2 className="text-xl font-bold mt-4">Experience</h2>
                  <p>
                    {selectedRequest
                      ? `${selectedRequest.experience.years} years, ${selectedRequest.experience.months} months, ${selectedRequest.experience.days} days`
                      : "N/A"}
                  </p>
                  <h2 className="text-xl font-bold mt-4">Payment Details</h2>
                  <p>One Month: ${selectedRequest.paymentDetails ? selectedRequest.paymentDetails.oneMonth : "N/A"}</p>
                  <p>Six Months: ${selectedRequest.paymentDetails ? selectedRequest.paymentDetails.sixMonths : "N/A"}</p>
                  <p>One Year: ${selectedRequest.paymentDetails ? selectedRequest.paymentDetails.oneYear : "N/A"}</p>
                </div>
                <br />
                <hr />
                <div className="mt-4">
                  <h2 className="text-xl font-bold">Status</h2>
                  <div className="flex items-center justify-between mt-2">
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          // Update the selectedRequest.status state when a new status is selected
                          setSelectedRequest((prevSelectedRequest) => ({
                            ...prevSelectedRequest,
                            status: newStatus,
                          }));
                          // Call your status change handler here, passing the newStatus and request ID
                          handleChangeStatus(e, selectedRequest._id, newStatus);
                        }}
                        value={selectedRequest ? selectedRequest.status : "N/A"}
                        style={{
                          color:
                            selectedRequest && selectedRequest.status === "pending"
                              ? "orange"
                              : selectedRequest && selectedRequest.status === "approve"
                              ? "green"
                              : selectedRequest && selectedRequest.status === "reject"
                              ? "red"
                              : "black",
                        }}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        <MenuItem value="pending" style={{ color: "orange" }}>
                          Pending
                        </MenuItem>
                        <MenuItem value="approve" style={{ color: "green" }}>
                          Approved
                        </MenuItem>
                        <MenuItem value="reject" style={{ color: "red" }}>
                          Rejected
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      className="bg-amber-500"
                      onClick={handleCloseModal}
                      sx={{ marginLeft: 2 }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default TrainerRequestList;
