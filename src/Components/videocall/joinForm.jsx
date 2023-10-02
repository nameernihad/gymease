import React, { useEffect, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import videoAxios from "../../Axios/videoAxios";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    roomCode: "",
  });
  const [serverData, setServerData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  // ... Rest of your code ...

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, roomCode } = inputValues;

    if (!name) {
      setErrorMessage("Name is required.");
      return;
    }

    setErrorMessage("");

    try {
      // use roomCode to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      await hmsActions.join({ name, authToken });
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred during submission.");
    }
  };

  // ... Rest of your code ...

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
        {/* Add input field for roomCode */}
        <div className="input-container">
          <input
            value={inputValues.roomCode}
            onChange={handleInputChange}
            id="roomCode"
            type="text"
            name="roomCode"
            placeholder="Room code"
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
