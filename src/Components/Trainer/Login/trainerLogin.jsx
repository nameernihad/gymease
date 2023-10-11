import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trainerAxios from "../../../Axios/trainerAxios";
import { useDispatch } from "react-redux";
import { TrainerauthLogin } from "../../../Redux/TrainerAuth";
import { toast } from "react-toastify";

function TrainerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginForm = async (event) => {
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
  
    try {
      const res = await trainerAxios.post("/", { email, password });
      const result = res.data;
      console.log(result);
  
      if (res.status === 200) {
        const { token, trainer } = result;
        dispatch(TrainerauthLogin({ token, trainer }));
        localStorage.setItem("Trainer", token);
        navigate("/trainer");
      } else if (res.status === 401) {
        // Check if the response has an "error" field
        if (result.error === "you are not a trainer") {
          setErrMsg("You are not authorized as a trainer.");
        } else {
          // Handle other error messages
          if (result.message) {
            if (Array.isArray(result.message)) {
              setErrMsg(result.message.join(", "));
            } else {
              setErrMsg(result.message.toString());
            }
          } else {
            setErrMsg("An error occurred while processing your request.");
          }
        }
      }
    } catch (error) {
      // Handle unexpected errors
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            setErrMsg(error.response.data.message.join(", "));
          } else {
            setErrMsg(error.response.data.message.toString());
          }
        } else {
          setErrMsg("An error occurred while processing your request.");
        }
      } else {
        setErrMsg("An error occurred while processing your request.");
      }
    }
  };
  
  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg);
    }
  }, [errMsg]);
  
  
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
