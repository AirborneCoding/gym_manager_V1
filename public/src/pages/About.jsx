import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
 return (
  <div className="container mx-auto px-4 py-24 text-white">
   <div className="max-w-3xl mx-auto">
   <Link to="/" className="my-10 bg-yellow-300 hover:bg-yellow-400 text-gray-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block">
    Back Home
   </Link>
    <h2 className="text-3xl mb-4 font-extrabold">About Us</h2>
    <p className="text-lg mb-6">
     Our gym management platform was created with the mission to simplify gym operations and enhance member experiences.
     With years of experience in the fitness industry, our team understands the unique challenges faced by gym owners and members alike.
    </p>
    <p className="text-lg mb-6">
     We are passionate about fitness and believe that everyone should have access to a safe and effective fitness environment.
     Our platform provides gym owners with powerful management tools while offering members a seamless fitness journey.
    </p>
    <p className="text-lg">
     Thank you for choosing our platform. We are committed to supporting your gym's success and helping you achieve your fitness goals.
    </p>
   
   </div>
  </div>
 );
};

export default AboutUs;
