import { useEffect, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import videoAxios from "../../Axios/videoAxios";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });
  const [serverData, setServerData] = useState();
  const [roomCode, setRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Managment_token = process.env.REACT_APP_MANAGMENT_TOKEN;

  console.log(Managment_token, "toookent");

  useEffect(() => {
    console.log(serverData);
  }, [serverData]);
  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = inputValues;

    if (!name) {
      setErrorMessage("Name is required.");
      return;
    }

    setErrorMessage("");

    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      await hmsActions.join({ name, authToken });
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred during submission.");
    }
  };

  useEffect(() => {
    try {
      videoAxios
        .get("650f09eef63c67d540929f0d", {
          headers: {
            Authorization: `Bearer ${Managment_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // Handle successful response
            setServerData(response.data.data);

            if (response.data.data.length >= 2) {
              setRoomCode(response.data.data[1].code);
            }

            console.log(serverData);
          } else if (response.status === 404) {
            // Handle "Room not found" error
            setErrorMessage("Room not found: 404");
          } else if (response.status === 403) {
            // Handle "Room is disabled" error
            setErrorMessage("Room is disabled: 403");
          } else if (response.status === 400) {
            // Handle "Invalid query parameter" error
            setErrorMessage("Invalid query parameter: 400");
          } else if (response.status === 401) {
            // Handle "Authentication Error" error
            setErrorMessage("Authentication Error: 401");
          } else {
            // Handle other status codes
            setErrorMessage("Unknown error: " + response.status);
          }
        })
        .catch((error) => {
          // Handle network or other errors
          setErrorMessage("Request error: " + error.message);
        });
    } catch (error) {
      // Handle other exceptions
      setErrorMessage("Error: " + error.message);
    }
  }, []);

  return (
    <div className="flex  items-center gap-32 pt-20 ps-10  bg-slate-300 h-screen">
      <img
        src="/Images/fdd63ae2bc98e779fe31d1d3a428f51b-removebg-preview.png"
        alt=""
        className=""
      />
      <form onSubmit={handleSubmit} className="">
        <h2 className="font-bold text-lg">Join Room</h2>
        <div className="input-container">
          <input
            value={inputValues.name}
            onChange={handleInputChange}
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
          />
        </div>{" "}
        {errorMessage && (
          <div className="error-message text-red-500">{errorMessage}</div>
        )}
        <button className="btn-primary">Join</button>
      </form>
    </div>
  );
}

export default JoinForm;
