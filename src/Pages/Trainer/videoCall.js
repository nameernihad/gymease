import JoinForm from "../../Components/Trainer/videoCall/roomCreatForm";
import "../../Components/videocall/Style.css";
import { useEffect } from "react";

import { useHMSActions } from "@100mslive/react-sdk";
import VideoCall from "../../Components/Trainer/videoCall/videoCall";

export default function VideoCallPage() {
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  return (
    <div className="VideoCall">
      <VideoCall />
    </div>
  );
}
