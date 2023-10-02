import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import { Avatar } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function Peer({ peer }) {
  const { isLocalVideoEnabled, toggleVideo } = useAVToggle();
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="peer-container">
      {isLocalVideoEnabled ? (
        <video
          ref={videoRef}
          className={`peer-video  ${peer.isLocal ? "local" : ""}`}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <img
          className="peer-video"
          src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
          alt=""
        />
      )}
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "You" : ""}
      </div>
    </div>
  );
}

export default Peer;
