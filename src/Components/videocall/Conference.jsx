import {
  selectCameraStreamByPeerID,
  selectPeers,
  useHMSStore,
} from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  //   for live streem
  //   const videoTrack = useHMSStore(selectCameraStreamByPeerID(peerId));

  return (
    <div className="conference-section">
      <h2>Conference</h2>

      <div className="peers-container ">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;
