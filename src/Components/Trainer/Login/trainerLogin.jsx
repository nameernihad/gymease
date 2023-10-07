import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trainerAxios from "../../../Axios/trainerAxios";
import { useDispatch } from "react-redux";
import { TrainerauthLogin } from "../../../Redux/TrainerAuth";

function TrainerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginForm = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email Address is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    trainerAxios.post("/", { email, password }).then((res) => {
      console.log(res.data);
      const result = res.data;
      if (result.token) {
        const token = result.token;
        dispatch(TrainerauthLogin({ token: token }));
        navigate("/trainer");
      } else {
        setErrMsg(result.message);
      }
    });
  };

  return (
    <div className="">
      <div
        className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/Images/29e6537b39a03c9df498023218ff34dc.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="flex flex-col overflow-hidden bg-transparent border-2 border-amber-500  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-5 bg-transparent md:flex-1 flex flex-col justify-center items-center">
            <h3 className="my-4 text-4xl font-semibold text-amber-500 text-center">
              TRAINER LOGIN
            </h3>
            <form
              action="#"
              className="flex flex-col space-y-5 w-full max-w-md"
              onSubmit={loginForm}
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="name"
                  autoFocus
                  className="px-4 py-2 transition bg-gray-100 bg-opacity-30 duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-center text-center"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-sky-500 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  className="px-4 py-2 transition bg-gray-100 bg-opacity-30 duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-center text-center"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-amber-500 rounded-md shadow hover:bg-amber-300 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 py-6 md:w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="image-container">
              <img
                src={
                  process.env.PUBLIC_URL + "/Images/logo-removebg-preview.png"
                }
                alt="Background"
                width={600}
                height={400}
              />
              <div className="blink-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerLogin;
