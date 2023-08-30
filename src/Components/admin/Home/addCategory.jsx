import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategoryModal = ({ isOpen, closeModal, setCategorys }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertBase64(file);
      setLoading(true);
      const response = await adminAxios.post("uploadImage", { image: base64 });
      setImageUrl(response.data);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      ...formData,
      image: imageUrl,
    };

    adminAxios
      .post("/addCategory", newCategory)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setCategorys((prevCategorys) => [...prevCategorys, newCategory]);
        // adminAxios.get("/getAllCategory").then((res) => {
        //   setCategorys(res.data.categorys);
        // });
        closeModal();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 ${
        isOpen ? "flex justify-center items-center" : "hidden"
      } overflow-y-auto bg-gray-900 bg-opacity-50`}
    >
      <div
        className={`inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-3xl ${
          isOpen ? "sm:scale-100" : "sm:scale-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-100 px-6 py-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Add Category
            </h2>

            {/* Category Information */}
            <div className="space-y-6 mb-8">
              <div>
                <label
                  htmlFor="category-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="category-name"
                  name="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter category name"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-8">
              <label
                htmlFor="category-description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="category-description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter category description"
              />
            </div>

            {/* Image Upload */}
            {loading ? (
              <div className="flex item-center justify-center w-14 h-14">
                <img src="/Images/Pulse-1s-200px.gif" alt="" />
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Image Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
                <label
                  htmlFor="category-image-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="category-image-upload"
                  name="category-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
