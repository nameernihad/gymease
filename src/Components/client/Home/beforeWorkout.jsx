import React from "react";
import YouTube from "react-youtube";

function BeforeWorkout() {
  const videoId = "5iHQDUvR_vc";

  const screenWidth = window.innerWidth; // Get the width of the screen

  const opts = {
    width: screenWidth - 200, // Subtracting 200px for centering and spacing from each side
    height: (screenWidth - 200) * 0.5625, // Maintain aspect ratio (16:9)
  };

  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="mx-6 my-10">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
}

export default BeforeWorkout;
