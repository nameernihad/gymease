import React, { useState } from "react";
import userAxios from "../../../Axios/userAxios.js";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin } from "../../../Redux/ClientAuth.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";
import ForgotPasswordModal from "./forgetPassEmail.jsx";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          userAxios
            .post("/loginWithGoogle", {
              name: res.data.name,
              email: res.data.email,
              picture: res.data.picture,
            })
            .then((result) => {
              console.log(result);
              if (result.data.token) {
                const token = result.data.token;
                dispatch(ClientLogin({ token: token }));
                navigate("/home");
              }
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

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
      const res = await userAxios.post("/login", { email, password });
      const result = res.data;
      console.log(result);
      if (result.token) {
        const token = result.token;
        dispatch(ClientLogin({ token: token }));
        navigate("/home");
      }
    } catch (error) {
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

  React.useEffect(() => {
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
              LOGIN
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
                    onClick={() => setShowForgotPasswordModal(true)}
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
              {/* {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>} */}

              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 w-14"></span>
                  <span className="font-normal text-gray-100">
                    or login with
                  </span>
                  <span className="h-px bg-gray-400 w-14"></span>
                </span>
                <div className="flex flex-col space-y-4">
                  <p
                    onClick={() => login()}
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-600 rounded-md group hover:bg-blue-600 focus:outline-none"
                  >
                    <img
                      src="Images/googlelogo.png"
                      alt="Google Logo"
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                      Google
                    </span>
                  </p>

                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                  >
                    <img
                      src="Images/facbooklogo.png"
                      alt="Facebook Logo"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                      Facebook
                    </span>
                  </a>
                </div>
              </div>
            </form>
            {showForgotPasswordModal && (
              <ForgotPasswordModal
                onClose={() => setShowForgotPasswordModal(false)}
              />
            )}
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

export default UserLogin;
