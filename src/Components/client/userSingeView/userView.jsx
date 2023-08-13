import React from "react";
import { useEffect } from "react";
import userAxios from "../../../Axios/userAxios";
import { useParams } from "react-router-dom";

function UserView() {
  const { userId } = useParams();

  console.log(userId, "ljsdhf");
  useEffect(() => {
    userAxios.get(`/singView/${userId}`).then((res) => {
    });
  }, []);

  return <div>userView</div>;
}

export default UserView;
