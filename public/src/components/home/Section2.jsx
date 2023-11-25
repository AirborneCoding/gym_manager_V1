import React from "react";

const Section2 = () => {
 return <section className="bg-white py-16 ">
  <div className="container mx-auto px-4">
   <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
    Frequently Asked Questions
   </h2>
   <div className="grid grid-cols-1 gap-4">
    {/* FAQ Item 1 */}
    <div className="border border-gray-300 rounded-lg p-4">
     <details>
      <summary className="cursor-pointer font-semibold text-gray-800">
       How can I join your gym?
      </summary>
      <p className="mt-2 text-gray-600">
       To join our gym, you can visit our facility during our operating hours and speak with our staff. They will guide you through the membership options and the registration process.
      </p>
     </details>
    </div>
    {/* FAQ Item 2 */}
    <div className="border border-gray-300 rounded-lg p-4">
     <details>
      <summary className="cursor-pointer font-semibold text-gray-800">
       What are your membership plans?
      </summary>
      <p className="mt-2 text-gray-600">
       We offer a variety of membership plans to suit your fitness goals. Our plans include options for single workouts, monthly memberships, and yearly memberships. You can explore them on our website or inquire at our front desk.
      </p>
     </details>
    </div>
    {/* FAQ Item 3 */}
    <div className="border border-gray-300 rounded-lg p-4">
     <details>
      <summary className="cursor-pointer font-semibold text-gray-800">
       Can I bring a guest with me?
      </summary>
      <p className="mt-2 text-gray-600">
       Yes, we offer guest passes for members to bring a friend or family member with them to the gym. Please check our guest pass policy for more details.
      </p>
     </details>
    </div>
    {/* FAQ Item 4 */}
    <div className="border border-gray-300 rounded-lg p-4">
     <details>
      <summary className="cursor-pointer font-semibold text-gray-800">
       What are your gym hours?
      </summary>
      <p className="mt-2 text-gray-600">
       Our gym is open from 5:00 AM to 11:00 PM, seven days a week. We are closed on major holidays.
      </p>
     </details>
    </div>
   </div>
  </div>
 </section>



};

export default Section2;
