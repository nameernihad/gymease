import React from "react";

const BlogPostCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className=" mt-10 flex flex-col items-center border-2 border-amber-600 bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  dark:bg-black dark:hover:bg-gray-800">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://img.freepik.com/free-photo/tanned-young-athletic-girl-doing-abs-workout-yoga-mat_651396-1725.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Guided Workout Instruction
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Access a library of detailed workout tutorials designed to target
            different fitness goals. Whether you're a beginner or advanced, our
            tutorials ensure you perform exercises correctly and effectively.
          </p>
        </div>
      </div>
      <div className="flex mt-10 flex-col items-center border-2 border-amber-600 bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  dark:bg-black dark:hover:bg-gray-800">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://cdn.thewirecutter.com/wp-content/uploads/2020/03/onlineworkout-lowres-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Real-time Virtual Workouts
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Engage in dynamic live online fitness classes that bring the energy
            of the gym to your home. Join expert trainers and fellow enthusiasts
            for interactive sessions that keep you motivated and connected.
          </p>
        </div>
      </div>
      <div className="flex my-5 flex-col items-center border border-amber-600 bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  dark:bg-black dark:hover:bg-gray-800">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://www.nextinsurance.com/wp-content/uploads/2020/04/April_2020_5-802x454.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Personalized Fitness Guidance
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Receive dedicated full-time mentorship from experienced fitness
            professionals. Get personalized advice, tailored workout plans, and
            ongoing support to maximize your progress and achieve lasting
            results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
