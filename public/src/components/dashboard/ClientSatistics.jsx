import React from "react";
import {
 FaUser,
 FaMale,
 FaFemale,
 FaHeart,
 FaDumbbell,
 FaGripHorizontal
 // FaGym
} from "../../icons"

const ClientSatistics = ({ clientsData }) => {
 return <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">total clients</h3>
    <FaUser className="text-gray-700" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.totalClients}</h3>
  </div>

  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">total Males</h3>
    <FaMale className="text-blue-600" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.maleClients}</h3>
  </div>
  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">total Females</h3>
    <FaFemale className="text-pink-600" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.femaleClients}</h3>
  </div>
  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">Cardio clients</h3>
    <FaHeart className="text-red-500" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.cardioClients}</h3>
  </div>
  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">musculation clients</h3>
    <FaDumbbell className="text-gray-800" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.musculationClients}</h3>
  </div>
  <div className="bg-white rounded shadow p-5 border-b-8 border-blue-500">
   <div className="flex justify-between">
    <h3 className="text-xl">full-Gym clients</h3>
    <FaGripHorizontal className="text-sky-600" size={30} />
   </div>
   <hr className="my-2" />
   <h3 className="text-xl">{clientsData?.fullGymClients}</h3>
  </div>

 </section>
};

export default ClientSatistics;
