import React from "react";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <section
      className="bg-black bg-opacity-60"
      style={{
        backgroundImage:
          "url('https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <motion.div
          className="space-y-8 lg:flex lg:justify-between sm:gap-6 xl:gap-10 lg:space-y-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Pricing Card */}
          <div className="flex flex-col p-6 mx-auto w-full lg:max-w-xs text-center text-white bg-gray-900 rounded-lg border border-amber-500 shadow xl:p-8 dark:text-white">
            <h3 className="mb-4 text-3xl font-bold">Free Plan</h3>
            <p className="mb-6 text-white sm:text-lg dark:text-white">
              Unlock a healthier you with our Free Plan, packed with essential
              features to kickstart your fitness journey:
            </p>
            <ul
              role="list"
              className="mb-6 space-y-2 text-left list-disc list-inside text-white"
            >
              <li>Access a range of workout video tutorials.</li>
              <li>Download tutorials for offline viewing.</li>
              <li>
                Explore different workout categories: beginner, intermediate,
                advanced.
              </li>
              <li>Personalized progress tracking to stay motivated.</li>
              <li>Category advice based on your goals.</li>
            </ul>
            <button className="bg-amber-500 hover:bg-amber-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">
              Get started
            </button>
          </div>

          {/* Right Pricing Card */}
          <div className="flex flex-col p-6 mx-auto w-full lg:max-w-xs text-center text-white bg-gray-900 rounded-lg border border-amber-500 shadow xl:p-8 dark:text-white">
            <h3 className="mb-4 text-3xl text-white font-bold">Premium</h3>
            <p className="font-light text-white sm:text-lg dark:text-white">
              Elevate your fitness journey with our Premium plan, offering
              exclusive features:
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl text-white font-extrabold">
                $99
              </span>
              <span className="text-white dark:text-white">/month</span>
            </div>
            <ul
              role="list"
              className="mb-8 space-y-4 text-left list-disc list-inside text-white"
            >
              <li>Access to live workout classes.</li>
              <li>Engage with trainers through live chat.</li>
              <li>Full-time personalized mentoring.</li>
              <li>And more exclusive benefits.</li>
            </ul>
            <button className="bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-primary-200 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">
              Get started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
