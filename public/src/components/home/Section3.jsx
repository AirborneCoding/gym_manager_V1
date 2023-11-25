import { motion } from 'framer-motion';

const benefits = [
 {
  title: 'Improved Health',
  description: 'Regular exercise at the gym can lead to improved overall health, lower risk of chronic diseases, and increased longevity.',
  imageSrc: 'https://i.pinimg.com/236x/69/05/33/6905337ce4c5ca508968fbe67461c322.jpg',
 },
 {
  title: 'Increased Strength',
  description: 'Gym workouts help you build muscle strength, which can enhance your daily activities and prevent injuries.',
  imageSrc: 'https://i.pinimg.com/236x/31/69/9d/31699dcdcf0caa07b43f6ca62bffc0a2.jpg',
 },
 {
  title: 'Weight Management',
  description: 'Using the gym for weight management helps with burning calories, losing weight, or maintaining a healthy weight.',
  imageSrc: 'https://i.pinimg.com/236x/7e/93/54/7e935439bfeb875a6117ad24b083ff10.jpg',
 },
 {
  title: 'Stress Relief',
  description: 'Exercise releases endorphins, reducing stress and improving your mood, mental well-being, and sleep quality.',
  imageSrc: 'https://i.pinimg.com/236x/ba/8f/af/ba8faffd618a0f0e4f9918a583101877.jpg',
 },
];

const Section3 = () => {
 return (
  <section className="py-16 bg-white">
   <div className="container mx-auto px-4">
    <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
     Benefits of Gym Workouts
    </h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
     {benefits.map((benefit, index) => (
      <motion.div
       key={index}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 1.5, delay: index * 0.5 }}
       className="bg-gray-100 rounded-lg p-6 text-center"
      >
       <img
        src={benefit.imageSrc}
        alt={benefit.title}
        className="w-20 h-20 mx-auto mb-4 rounded-full"
       />
       <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
       <p className="text-gray-600">{benefit.description}</p>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default Section3;
