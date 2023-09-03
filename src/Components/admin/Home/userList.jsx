import React, { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminAxios from "../../../Axios/adminAxios";
import { useNavigate, useParams } from "react-router-dom";

function UserList() {
  const [userdetails, setuserdetails] = useState([]);

  const navigate = useNavigate();

  const handleBlockToggle = (userId) => {
    adminAxios.put(`/blockuser/${userId}`).then((res) => {
      console.log(res.data);
      toast.success(res.data.message);

      setuserdetails((prevUserDetails) =>
        prevUserDetails.map((user) =>
          user._id === userId ? { ...user, isBlock: !user.isBlock } : user
        )
      );
    });
  };

  useEffect(() => {
    adminAxios
      .get("/getAllUsers")
      .then((res) => {
        setuserdetails(res.data.userList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const navigateToSingleView = (userId) => {
    navigate(`/userView/${userId}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-slate-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SI/no
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {userdetails.map((user, index) => (
            <tr key={user._id} className="border-b bg-slate-50  text-gray-900 ">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4 ">{user.email}</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4 ">
                <div className="relative">
                  <button
                    type="button"
                    className={`${
                      user.isBlock ? "text-green-700" : "text-red-700"
                    } hover:text-white border  ${
                      user.isBlock ? "hover:bg-green-800 " : "hover:bg-red-800 "
                    } focus:outline-none ${
                      user.isBlock
                        ? "focus:ring-green-300"
                        : "focus:ring-red-300"
                    } font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                      user.isBlock
                        ? "dark:border-green-500"
                        : "dark:border-red-500"
                    } ${
                      user.isBlock ? "dark:text-green-500" : "dark:text-red-500"
                    } dark:hover:text-white ${
                      user.isBlock
                        ? "dark:hover:bg-green-600"
                        : "dark:hover:bg-red-600"
                    } ${
                      user.isBlock
                        ? "dark:focus:ring-green-800"
                        : "dark:focus:ring-red-800"
                    }`}
                    onClick={() => handleBlockToggle(user._id)}
                  >
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                </div>
              </td>
              <td
                className="px-6 py-4"
                onClick={() => {
                  navigateToSingleView(user._id);
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
