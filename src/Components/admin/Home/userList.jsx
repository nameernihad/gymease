import React, { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminAxios from "../../../Axios/adminAxios";

function UserList() {
  const [userdetails, setuserdetails] = useState([]);
  const [blockStatusMap, setBlockStatusMap] = useState({});

  const handleBlockToggle = (userId) => {
    const currentStatus = blockStatusMap[userId];
    adminAxios
      .put(`/blockuser/${userId}`, { state: !currentStatus })
      .then((res) => {
        console.log(res.data);
        setBlockStatusMap({
          ...blockStatusMap,
          [userId]: res.data.status,
        });

        toast.success(res.data.message);
      });
  };

  useEffect(() => {
    adminAxios.get("/getAllUsers").then((res) => {
      setuserdetails(res.data.userList);
    });
  }, []);

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
                      blockStatusMap[user._id]
                        ? "text-green-700"
                        : "text-red-700"
                    } hover:text-white border  ${
                      blockStatusMap[user._id]
                        ? "hover:bg-green-800 "
                        : "hover:bg-red-800 "
                    } focus:outline-none ${
                      blockStatusMap[user._id]
                        ? "focus:ring-green-300"
                        : "focus:ring-red-300"
                    } font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                      blockStatusMap[user._id]
                        ? "dark:border-green-500"
                        : "dark:border-red-500"
                    } ${
                      blockStatusMap[user._id]
                        ? "dark:text-green-500"
                        : "dark:text-red-500"
                    } dark:hover:text-white ${
                      blockStatusMap[user._id]
                        ? "dark:hover:bg-green-600"
                        : "dark:hover:bg-red-600"
                    } ${
                      blockStatusMap[user._id]
                        ? "dark:focus:ring-green-800"
                        : "dark:focus:ring-red-800"
                    }`}
                    onClick={() => handleBlockToggle(user._id)}
                  >
                    {blockStatusMap[user._id] ? "Unblock" : "Block"}
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
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
