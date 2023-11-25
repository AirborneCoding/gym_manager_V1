import React from "react";
import { Section1, Section2, Section3, Section4 } from "../components";

const Home = () => {
  return <>
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
  </>;
};

export default Home;


/* 
<section className="py-16 bg-gray-900 text-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-extrabold mb-4">
          Elevate Your Gym's Success
        </h2>
        <p className="text-xl mb-6">
          Manage your gym efficiently and inspire your members to greatness.
        </p>
        <ul className="text-lg mb-6">
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-300 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Streamline gym operations.
          </li>
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-300 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            Boost member engagement.
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-300 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 3.929V1m4 0v2.929m0 0L12 7"
              />
            </svg>
            Drive gym success.
          </li>
        </ul>
        <a
          href="#registration-link"
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
        >
          Register Your Gym
        </a>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src="https://your-image-url-here.jpg"
          alt="Motivational Gym Image"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</section>

*/