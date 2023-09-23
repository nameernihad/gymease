import JoinForm from "../../Components/videocall/joinForm";
import "../../Components/videocall/Style.css";
import { useEffect } from "react";
import VideoCall from "../../Components/videocall/videoCall";
import { useHMSActions } from "@100mslive/react-sdk";

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
