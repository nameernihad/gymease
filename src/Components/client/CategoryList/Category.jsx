import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../landingPage/navBar";
import Footer from "../landingPage/footer";
import userAxios from "../../../Axios/userAxios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CategoryItem({ category }) {
  const [isHovered, setIsHovered] = useState(false);
  const levelId = useParams();

  return (
    <motion.div
      className="bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden"
      whileHover={{ scale: 1.01 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/workout/${category._id}/${levelId.id}`}>
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div
            className={`absolute bottom-0  p-4  text-amber-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <h5 className="text-lg font-semibold">{category.name}</h5>
          </div>
          <motion.div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-50 text-amber-500 opacity-0 hover:opacity-100 transition-opacity">
            <div className="px-5 py-5">
              <h5 className="text-3xl font-bold tracking-tight">
                {category.name}
              </h5>
              <p className="text-sm text-gray-300 mt-2">
                {category.description}
              </p>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

function Category() {
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    userAxios.get("/getAllCategory").then((res) => {
      setCategoryList(res.data.allcategory);
    });
  }, []);

  return (
    <div className="bg-black">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 pt-24 px-10 p-4">
        {CategoryList.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))}
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Category;
