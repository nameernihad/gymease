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
    <div className="flex ps-10 w-full  bg-black ">
      <div className="mx-6 w-1/2">
        <video
          src="/Images/beforeWorkout.mp4"
          controls
          controlsList="nodownload"
        ></video>
      </div>
      <div className="w-1/2 px-10">
        <p className="text-white text-2xl font-semibold">
          Welcome to GymEase - Where Transformation Begins!
        </p>
        <p className="mb-3 font-normal text-center mt-3   text-gray-700 dark:text-gray-400">
          Are you ready to embark on a transformative fitness journey at
          GymEase, where we're dedicated to pushing the boundaries of your
          potential and sculpting your physique into a masterpiece of strength
          and vitality? Our platform is meticulously designed to empower and
          inspire you, guiding you towards becoming a healthier, stronger, and
          more confident version of yourself. With a team of certified fitness
          trainers and nutrition experts, we offer expertly crafted workouts
          tailored to your specific needs and aspirations, whether you're a
          beginner or seasoned athlete. Witness real-life transformations in our
          "Before Workout Video" section, where individuals like you started
          their fitness journey. Our user-friendly interface ensures easy access
          to workouts, nutrition guidance, and transformation stories, while our
          vibrant community provides support and camaraderie. Join us today and
          take the first step toward your fitness goals with GymEase.
        </p>
      </div>
    </div>
  );
}

export default BeforeWorkout;
