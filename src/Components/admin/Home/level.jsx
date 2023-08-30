import React, { useState, useEffect } from "react";
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
  faArrowRight,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import AddLevelModal from "./addLevel";
import { toast } from "react-toastify";
import EditCategoryModal from "./editCategory";
import EditLevelModal from "./editLevel";

const columns = [
  { id: "index", label: "Si/no", minWidth: 50 },
  { id: "name", label: "Level Name", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  {
    id: "edit",
    label: "Edit",
    minWidth: 50,
    align: "right",
    format: (value, level) => (
      <FontAwesomeIcon
        icon={faEdit}
        className="text-blue-500 hover:text-blue-600 cursor-pointer"
      />
    ),
  },
  {
    id: "delete",
    label: "Delete",
    minWidth: 50,
    align: "right",
    format: (value, level) => (
      <FontAwesomeIcon
        icon={faTrash}
        className="text-red-500 hover:text-red-600 cursor-pointer"
      />
    ),
  },
];

const SkeletonRow = () => (
  <TableRow>
    {columns.map((column) => (
      <TableCell key={column.id}>
        <div className="animate-pulse bg-gray-200 h-8 w-16"></div>
      </TableCell>
    ))}
  </TableRow>
);

const LevelListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allLevels, setAllLevels] = useState([]);
  const [isAddLevelModalOpen, setIsAddLevelModalOpen] = useState(false);
  const [isEditLevelModalOpen, setIsEditLevelModalOpen] = useState(false);
  const [SelectedLevelId, setSelectedLevelId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const response = await adminAxios.get("/getAllLevel");
      setAllLevels(response.data.allLevel);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching levels:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (levelId) => {
    adminAxios
      .delete(`deleteLevel/${levelId}`)
      .then((res) => {
        toast.success(res.data.message);

        setAllLevels((prevLevels) =>
          prevLevels.filter((level) => level._id !== levelId)
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

  const handleAddLevelClick = () => {
    setIsAddLevelModalOpen(true);
  };

  const closeAddLevelModal = () => {
    setIsAddLevelModalOpen(false);
  };
  const handleEditLevelClick = (levelId) => {
    setSelectedLevelId(levelId);
    setIsEditLevelModalOpen(true);
  };

  const closeEditLevelModal = () => {
    setIsEditLevelModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h2>Level Listing</h2>
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md focus:outline-none "
          onClick={handleAddLevelClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Add Level
        </button>
      </div>
      <div className="p-4">
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
                {isLoading ? (
                  // Display skeleton rows while loading
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : (
                  allLevels.map((level, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={level._id}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{level.name}</TableCell>
                      <TableCell align="center">
                        <img
                          src={level.image}
                          alt={level.name}
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        className="max-w-xs max-h-32 overflow-auto"
                      >
                        {level.description}
                      </TableCell>
                      <TableCell align="center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => {
                            handleEditLevelClick(level._id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteClick(level._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allLevels.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <AddLevelModal
        isOpen={isAddLevelModalOpen}
        closeModal={closeAddLevelModal}
        setLevels={setAllLevels}
      />
      <EditLevelModal
        isOpen={isEditLevelModalOpen}
        closeModal={closeEditLevelModal}
        setLevels={setAllLevels}
        levelId={SelectedLevelId}
      />
    </div>
  );
};

export default LevelListing;
