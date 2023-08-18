import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-black">
      <style>
        {`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #1a202c;
          }
          ::-webkit-scrollbar-thumb {
            background: #4299e1;
            border-radius: 3px;
          }
        `}
      </style>
      <div className="container mx-auto pt-16">
        {" "}
        {/* Added top padding */}
        <h1 className="text-3xl text-amber-500 text-center py-8">About Us</h1>
      </div>
      <div className="container mx-auto mt-3">
        <div className="flex flex-col md:flex-row items-center justify-center md:h-screen">
          <div className="w-full md:w-1/2 overflow-auto md:order-2 mb-4 md:mb-0">
            <img
              src="https://149874912.v2.pressablecdn.com/wp-content/uploads/2023/05/chest_-and_-shoulder_-workout-scaled.jpg"
              alt="About Us"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto max-h-[calc(100vh-128px)] md:order-1">
            <h2 className="text-2xl text-amber-500 font-semibold mb-2">
              Welcome to gymEase
            </h2>
            <p className="text-white">
              Welcome to gymEase, your ultimate fitness destination that goes
              beyond the ordinary. We are committed to revolutionizing your
              fitness journey by providing you with personalized experiences
              that empower and uplift. For our esteemed premium users, we offer
              a world of exclusive benefits. Imagine having your own personal
              trainer by your side, tailoring workouts to your goals and
              progress. Our trainers are not just coaches; they are mentors who
              will guide you on the path to success. Engage in interactive live
              classes that bring the energy of the gym right to your living
              room. With real-time guidance from our experts, you'll feel
              motivated to push your limits and achieve your best. Our live chat
              feature lets you connect with trainers and fellow fitness
              enthusiasts, fostering a sense of community and camaraderie.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <div className="flex flex-col md:flex-row items-center justify-center md:h-screen">
          <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto max-h-[calc(100vh-128px)] md:order-2">
            <h2 className="text-2xl text-amber-500 font-semibold mb-2">
              Personalized Mentoring and Tutorials
            </h2>
            <p className="text-white">
              Mentorship is at the heart of gymEase. Our premium users receive
              dedicated mentoring sessions, helping you navigate challenges and
              stay on track. Whether it's setting goals, addressing concerns, or
              seeking advice, our mentors are here to support you every step of
              the way. Additionally, our extensive exercise tutorials ensure you
              have access to proper form and technique, ensuring safe and
              effective workouts. At gymEase, we believe that fitness is a
              journey meant to be enjoyed. Join us as a premium member and
              experience fitness like never before.
            </p>
          </div>
          <div className="w-full md:w-1/2 overflow-auto md:order-1 mb-4 md:mb-0">
            <img
              src="https://cdn.shopify.com/s/files/1/0866/7664/files/gym_workout_routines_5_1024x1024.jpg?v=1614281430"
              alt="About Us"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
