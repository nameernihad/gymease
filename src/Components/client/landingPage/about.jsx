import React from "react";
import { motion } from "framer-motion";

const AboutContentImageSection = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col-reverse md:flex-row p-8 px-32 bg-black">
      <div className="md:w-1/1 md:pr-8 ">
        <motion.div
          className="bg-transparent"
          initial="hidden"
          variants={imageVariants}
          whileInView={"visible"}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://t4.ftcdn.net/jpg/02/40/74/59/360_F_240745994_ZYbBPZmutbA8OCXiFX52LAwujGYagp05.jpg"
            alt="Sample"
            className="rounded-md shadow-md border border-amber-600"
          />
        </motion.div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-2xl text-amber-500 font-dancing-script mb-4">
          Who We Are
        </h2>
        <motion.div
          className="h-96 w-full overflow-auto text-slate-200 custom-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial="hidden"
          variants={contentVariants}
          whileInView={"visible"}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px; /* Width of the scrollbar */
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background-color: transparent; /* Background color of the scrollbar track */
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #4A5568; /* Color of the scrollbar thumb */
                border-radius: 2px; /* Rounded corners for the thumb */
              }
            `}
          </style>
          <p className="text-slate-200 text-4xl font-bold mb-6">About Us</p>
          <p className="text-slate-200">
            At GymEase, our mission is to inspire and guide individuals towards
            their ultimate health and wellness potential. With a passion for
            transforming lives, we've assembled a team of dedicated fitness
            mentors who bring their expertise and encouragement to every step of
            your journey. Our commitment goes beyond just workouts – we believe
            in fostering balanced lifestyles through personalized fitness plans
            and comprehensive offline tutorials that cover nutrition,
            mindfulness, and more. With a strong emphasis on community support,
            real-time mentorship, and the latest in fitness technology, GymEase
            is your partner in achieving lasting, positive changes for your body
            and mind. Join us in embracing a fitness experience that's not only
            effective but also empowering and fulfilling.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContentImageSection;
