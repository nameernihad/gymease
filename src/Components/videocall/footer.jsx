import {
  selectPeerCount,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import {
  faMicrophone,
  faMicrophoneSlash,
  faRightFromBracket,
  faUsersLine,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@mui/material/Tooltip";

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const handleLeave = () => {
    hmsActions.leave();
  };
  const count = useHMSStore(selectPeerCount);

  return (
    <div className="control-bar bg-gray-900">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? (
          <Tooltip title="UnMute" placement="top-start">
            <FontAwesomeIcon
              icon={faMicrophoneSlash}
              style={{ color: "#e8ecf2" }}
              className="w-5 h-5"
            />
          </Tooltip>
        ) : (
          <Tooltip title="Mute" placement="top-start">
            <FontAwesomeIcon
              icon={faMicrophone}
              style={{ color: "#e8ecf2" }}
              className="w-5 h-5"
            />
          </Tooltip>
        )}
      </button>

      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? (
          <Tooltip title="Turn on Camera" placement="top-start">
            <FontAwesomeIcon
              icon={faVideoSlash}
              style={{ color: "#e8ecf2" }}
              className="w-5 h-5"
            />
          </Tooltip>
        ) : (
          <Tooltip title="Turn off Camera" placement="top-start">
            <FontAwesomeIcon
              icon={faVideo}
              style={{ color: "#e8ecf2" }}
              className="w-5 h-5"
            />
          </Tooltip>
        )}
      </button>
      <button className="btn-control" onClick={handleLeave}>
        <Tooltip title="Leave" placement="top-start">
          <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
        </Tooltip>
      </button>
      <div className="relative inline-block">
        <button className="btn-control" onClick={handleLeave}>
          <Tooltip title="Participants" placement="top-start">
            <FontAwesomeIcon
              icon={faUsersLine}
              style={{ color: "#e8ecf2" }}
              className="w-5 h-5"
            />
          </Tooltip>
        </button>
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {count}
        </span>
      </div>
    </div>
  );
}

export default Footer;
