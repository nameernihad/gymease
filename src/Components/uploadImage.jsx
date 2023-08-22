import React, { useState } from "react";
import axios from "axios";

export default function UploadImage() {
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
      const response = await axios.post(
        "http://localhost:4000/admin/uploadImage",
        { image: base64 }
      );
      setImageUrl(response.data);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const UploadInput = () => {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {/* ... rest of the label content ... */}
          <input
            onChange={handleImageUpload}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
    );
  };

  return (
    <div className="flex justify-center flex-col m-8">
      <div>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-gray-500">
          Upload Image
        </h2>
      </div>
      <div>
        {imageUrl && (
          <div>
            Access Your File at{" "}
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex item-center justify-center">
            <img src="https://i.gifer.com/ZKZg.gif" alt="" />
          </div>
        ) : (
          <UploadInput />
        )}
      </div>
    </div>
  );
}
