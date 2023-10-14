import { useEffect, useState } from "react";
import videoAxios from "../../../Axios/videoAxios";
import NavBar from "../NavBar";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import { logRoles } from "@testing-library/react";
import { useHMSActions } from "@100mslive/react-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import trainerAxios from "../../../Axios/trainerAxios";

function JoinForm() {
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomCode, setRoomCode] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmails, setUserEmails] = useState([]);

  const templateId =
    process.env.REACT_APP_TEMPLATE_ID || "650d77e3f118ad66dc2dd093";

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const hmsActions = useHMSActions();

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoomDescriptionChange = (e) => {
    setRoomDescription(e.target.value);
  };

  const createRoom = async () => {
    try {
      setLoading(true);
      const response = await videoAxios.post(
        "rooms",
        {
          name: roomName,
          description: roomDescription,
          template_id: "650d77e3f118ad66dc2dd093",
        },
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTcyOTU5MDIsImV4cCI6MTY5NzM4MjMwMiwianRpIjoiand0X25vbmNlIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE2OTcyOTU5MDIsImFjY2Vzc19rZXkiOiI2NTBkNzY1N2NhNTg0OGYwZTNkNDY5OWUifQ.0H7PR9Rh7aa7CMRxOQFqz3Hb6UVE3vrvtCoSV-BfPCM`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Room created Success");
        // Handle successful room creation
        console.log("Room created successfully:", response.data);

        const roomId = response.data.id;
        console.log(roomId);
        if (roomId) {
          console.log(roomId);
          const roomCodeResponse = await videoAxios.post(
            `/room-codes/room/${roomId}`,
            {},
            {
              headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTcyOTU5MDIsImV4cCI6MTY5NzM4MjMwMiwianRpIjoiand0X25vbmNlIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE2OTcyOTU5MDIsImFjY2Vzc19rZXkiOiI2NTBkNzY1N2NhNTg0OGYwZTNkNDY5OWUifQ.0H7PR9Rh7aa7CMRxOQFqz3Hb6UVE3vrvtCoSV-BfPCM`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (roomCodeResponse) {
            console.log(roomCodeResponse.data);
            const hostRoomCode = roomCodeResponse.data.data.find(
              (room) => room.role === "host"
            );
            const guestRoomCode = roomCodeResponse.data.data.find(
              (room) => room.role === "guest"
            );

            setRoomCode(guestRoomCode.code);
            if (hostRoomCode) {
              const hostRoomCodeValue = hostRoomCode.code;

              const authToken = await hmsActions.getAuthTokenByRoomCode({
                roomCode: hostRoomCodeValue,
              });
              await hmsActions.join({ authToken });
            } else {
              console.error("Host room code not found in the response");
            }
          } else {
            setErrorMessage("Failed to retrieve room code: ");
          }
        } else {
          setErrorMessage("Failed to create the room: ");
        }
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Room Disabled");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoom();
  };

  useEffect(() => {
    try {
      trainerAxios.get("/getSubscription").then((response) => {
        const emails = response.data.subscription.map(
          (subscription) => subscription.user.email
        );
        setUserEmails(emails);
          console.log(userEmails);
      });
    } catch (error) {
      console.error("Error fetching user emails:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (userEmails.length > 0 && roomCode) {
        trainerAxios
          .post("/sentEmail", { userEmails, roomCode })
          .then((res) => {
            
            console.log(res.data,"kgfjjhgjhvjhvhgvn");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [userEmails, roomCode]); // Make sure to include userEmails and roomCode in the dependency array

  return (
    <>
      <NavBar />
      <div className="container flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex w-full ps-80  items-center gap-32 pt-20  bg-slate-300 h-screen">
          <img
            src="/Images/fdd63ae2bc98e779fe31d1d3a428f51b-removebg-preview.png"
            alt=""
            className=""
          />
          <form onSubmit={handleSubmit}>
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
            </div>
            <div className="input-container">
              <input
                value={roomName}
                onChange={handleRoomNameChange}
                type="text"
                name="roomName"
                placeholder="Room Name"
              />
            </div>
            <div className="input-container">
              <input
                value={roomDescription}
                onChange={handleRoomDescriptionChange}
                type="text"
                name="roomDescription"
                placeholder="Room Description"
              />
            </div>
            {errorMessage && (
              <div className="error-message text-red-500">{errorMessage}</div>
            )}
            <button type="submit" className="btn-primary">
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  style={{ color: "#c2c2c2" }}
                />
              ) : (
                "Create Room"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default JoinForm;
