import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPenToSquare,
  faPlus,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import WorkoutFormModal from "./addWorkoutModal"; // Import your workout form modal component
import { toast } from "react-toastify";
import EditWorkoutModal from "./addWorkoutModal";

const columns = [
  { id: "index", label: "Si/no", minWidth: 50 },
  { id: "name", label: "Workout Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "gif", label: "gif", minWidth: 100 },
  {
    id: "Category",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Level",
    label: "Level",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
  {
    id: "Count/Timer",
    label: "Count/Timer",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
  {
    id: "Edit",
    label: "Edit",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "Yes" : "No"),
  },
];

const WorkoutListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [workoutdetails, setWorkoutDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    adminAxios.get("/getAllWorkouts").then((res) => {
      setWorkoutDetails(res.data.workout);
    });
  }, []);

  const handleDeleteWorkout = (workoutId) => {
    adminAxios
      .delete(`/deleteWorkout/${workoutId}`)
      .then((res) => {
        toast.success(res.data.message);

        setWorkoutDetails((prevWorkoutDetails) =>
          prevWorkoutDetails.filter((workout) => workout._id !== workoutId)
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-slate-100 h-screen p-4">
        <div className="flex justify-between items-center mb-4 px-5 pt-5 ">
          <div className="flex items-center">
            <button className="text-slate-600">
              <FontAwesomeIcon icon={faSort} className="mr-1" />
              Sort
            </button>
            <button className="text-slate-600 ml-4">
              <FontAwesomeIcon icon={faFilter} className="mr-1" />
              Filter
            </button>
          </div>
          <button
            className="bg-amber-500 text-white py-2 px-4 rounded"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Workout
          </button>
        </div>

        <div className="flex justify-center">
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
                          textAlign: "center",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workoutdetails.map((workout, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={workout._id}
                    >
                      <TableCell style={{ textAlign: "center" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {workout.name}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {workout.description}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <img src={workout.gif} alt="" className="w-40 h-32" />
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "center" }}>
                        {workout.category[0]}
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "center" }}>
                        {workout.Level}
                      </TableCell>

                      <TableCell align="right" style={{ textAlign: "center" }}>
                        {workout.count ? workout.count : workout.timer}
                        {workout.count ? "(Count)" : "(Timer)"}
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500"
                          size="lg"
                          onClick={() => {
                            handleDeleteWorkout(workout._id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-green-500"
                          size="lg"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={workoutdetails.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <WorkoutFormModal
        setWorkOut={setWorkoutDetails}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default WorkoutListing;
