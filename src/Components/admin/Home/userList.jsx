import React, { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminAxios from "../../../Axios/adminAxios";

function UserList() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [userdetails, setuserdetails] = useState([]);

  const handleBlockToggle = () => {
    setIsBlocked(!isBlocked);
  };

  useEffect(() => {
    adminAxios.get("/getAllUsers").then((res) => {
      setuserdetails(res.data.userList);
    });
  }, []);

  //   useEffect(() => {

  console.log(isBlocked);
  adminAxios
    .put("/blockuser/64ca2d48b19c913d45b0c0f3", { state: isBlocked })
    .then((res) => {
      // setIsBlocked(res.data.status);
      console.log(res.data);
    });
  //   }, []);

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
              <td className="px-6 py-4">{user.gender}</td>
              <td className="px-6 py-4 ">
                <div className="relative">
                  <button
                    type="button"
                    className={`${
                      isBlocked ? "text-green-700" : "text-red-700"
                    } hover:text-white border  ${
                      isBlocked ? "hover:bg-green-800 " : "hover:bg-red-800 "
                    } focus:outline-none ${
                      isBlocked ? "focus:ring-green-300" : "focus:ring-red-300"
                    } font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                      isBlocked
                        ? "dark:border-green-500"
                        : "dark:border-red-500"
                    } ${
                      isBlocked ? "dark:text-green-500" : "dark:text-red-500"
                    } dark:hover:text-white ${
                      isBlocked
                        ? "dark:hover:bg-green-600"
                        : "dark:hover:bg-red-600"
                    } ${
                      isBlocked
                        ? "dark:focus:ring-green-800"
                        : "dark:focus:ring-red-800"
                    }`}
                    onClick={handleBlockToggle}
                  >
                    {isBlocked ? "Unblock" : "Block"}
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
