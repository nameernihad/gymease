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
import AddCategoryModal from "./addCategory";
import { toast } from "react-toastify";
import EditCategoryModal from "./editCategory";

const columns = [
  { id: "index", label: "Si/no", minWidth: 50 },
  { id: "name", label: "Category Name", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  {
    id: "edit",
    label: "Edit",
    minWidth: 50,
    align: "right",
    format: (value, category) => (
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
    format: (value, category) => (
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

const CategoryListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allCategorys, setAllCategorys] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategorys();
  }, []);

  const fetchCategorys = async () => {
    try {
      const response = await adminAxios.get("/getAllCategory");
      console.log(response.data);
      setAllCategorys(response.data.allcategory);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categorys:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (categoryId) => {
    adminAxios
      .delete(`/categoryDelete/${categoryId}`)
      .then((res) => {
        toast.success(res.data.message);

        setAllCategorys((prevCategorys) =>
          prevCategorys.filter((category) => category._id !== categoryId)
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

  const handleAddCategoryClick = () => {
    setIsAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };
  const handleEditCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsEditCategoryModalOpen(true);
  };

  const closeEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h2>Category Listing</h2>
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md focus:outline-none "
          onClick={handleAddCategoryClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Add Category
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
                  allCategorys.map((category, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={category._id}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{category.name}</TableCell>
                      <TableCell align="center">
                        <img
                          src={category.image}
                          alt={category.name}
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
                        {category.description}
                      </TableCell>
                      <TableCell align="center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => {
                            handleEditCategoryClick(category._id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteClick(category._id)}
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
            count={allCategorys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        closeModal={closeAddCategoryModal}
        setCategorys={setAllCategorys}
      />
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        closeModal={closeEditCategoryModal}
        setCategorys={setAllCategorys}
        categoryId={selectedCategoryId}
      />
    </div>
  );
};

export default CategoryListing;
