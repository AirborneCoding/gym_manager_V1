import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const AboutSection = () => {
 return (
  <section className="bg-opacity-50 text-white py-16"> {/* Change bg-gray-900 to bg-opacity-50 */}
   <div className="container mx-auto px-4">
    <div className="text-center">
     <h2 className="text-3xl font-semibold mb-4">About Our Gym Management Project</h2>
     <p className="text-lg mb-8">
      Welcome to our gym management platform where fitness meets convenience!
      We are dedicated to providing you with the best tools to manage your gym efficiently and empower your members on their fitness journey.
     </p>
     <Link to="/about" className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg inline-block">
      Learn More
     </Link>
    </div>
   </div>
  </section>
 );
};

export default AboutSection;
