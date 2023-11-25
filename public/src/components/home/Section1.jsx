import React from "react";
import { Link } from "react-router-dom";
import { customFetch } from "../../utils";
import { useGlobalContext } from "../../Context";



const Section1 = () => {
 const { user, logoutUser } = useGlobalContext()

 const test = async () => {
  await customFetch.get()
 }

 return <section className="md:h-screen bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 text-white">
  <section className="relative mb-72">
   <div
    className="absolute top-0 left-0 w-full bg-cover pb-96 md:pb-80"
    style={{
     backgroundImage:
      'url("https://i.pinimg.com/736x/8a/4f/61/8a4f616f34a57cbd69d62d47fc845c22.jpg")',
     // paddingBottom: '40%',
    }}
   ></div>
   <div className="relative z-10 p-5 text-white text-center">
    <h1 className="text-4xl font-bold mb-4">
     "Your body can stand almost anything. It's your mind that you have to convince." <br />
     {/* <button onClick={test} className="btn btn-sm">Test</button> */}
     {/* <button onClick={() => { logoutUser() }} className="btn btn-sm mx-3">log-out</button> */}
    </h1>
    <p className="text-lg">- Fitness Motivation Quote</p>
   </div>
  </section>
  <div className="container mx-auto px-4 ">
   <div className="flex flex-col md:flex-row items-center justify-between flex-wrap">
    <div className="md:w-1/2">
     <h2 className="text-4xl font-extrabold mb-4">
      {
       user && <span>Hello {user?.name}</span>
      }  Unlock Your Gym's Potential
     </h2>
     <p className="text-xl mb-6">
      Join our platform and take your gym to new heights of success.
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
       Reach a wider audience.
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
       Boost your gym's revenue.
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
       Simplify gym management.
      </li>
     </ul>
     {
      user ? (
       <Link to="/dashboard"
        className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block capitalize"
       >
        go to your dashboard
       </Link>
      ) : (
       <Link to="/register"
        className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block capitalize"
       >
        Register Your Gym
       </Link>
      )
     }
    </div>
    <div className="md:w-1/2 mt-6 md:mt-0">
     <img
      src="https://i.pinimg.com/564x/9c/c7/64/9cc7646888c19ec93e53e56950aaaff2.jpg"
      alt="Motivational Gym Image"
      className="rounded-lg shadow-lg w-full md:h-96 "
     />
    </div>
   </div>
  </div>

 </section>

 // return <section className="relative">
 //  <div
 //   className="absolute top-0 left-0 w-full bg-cover pb-72"
 //   style={{
 //    backgroundImage:
 //     'url("https://i.pinimg.com/736x/8a/4f/61/8a4f616f34a57cbd69d62d47fc845c22.jpg")',
 //    // paddingBottom: '40%',
 //   }}
 //  ></div>
 //  <div className="relative z-10 p-5 text-white text-center">
 //   <h1 className="text-4xl font-bold mb-4">
 //    "Your body can stand almost anything. It's your mind that you have to convince."
 //   </h1>
 //   <p className="text-lg">- Fitness Motivation Quote</p>
 //  </div>
 // </section>




};
// w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0

export default Section1;
