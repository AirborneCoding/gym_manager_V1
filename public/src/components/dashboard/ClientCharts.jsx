import React from 'react';
import CircleChart from './CircleChart';
import BarAreaChart from './BarAreaChart';
import { useSelector } from 'react-redux';

const CombinedPieChart = ({ clientsData, monthlyMoneyData }) => {
 let { count } = useSelector(state => state.clients);

 const clientStatsData = [
  { name: 'Male', value: clientsData?.maleClients },
  { name: 'Female', value: clientsData?.femaleClients },
 ];

 const gymStatsData = [
  { name: 'Cardio Clients', value: clientsData?.cardioClients },
  { name: 'Musculation Clients', value: clientsData?.musculationClients },
  { name: 'Full Gym Clients', value: clientsData?.fullGymClients },
 ];

 // if (count < 1) {
 //  return <section className="text-center bg-white p-5 rounded ">
 //   <h3 className="text-xl font-bold">Add clients to see results</h3>
 //  </section>
 // }

 return <section className=" bg-white p-5 rounded h-auto">
  <div className=""> {/* This div will take 75% of the available space */}
   <CircleChart clientStatsData={clientStatsData} gymStatsData={gymStatsData} />
  </div>
  <div className=""> {/* This div will take 25% of the available space */}
   <BarAreaChart monthlyMoneyData={monthlyMoneyData} />
  </div>
 </section>

};

export default CombinedPieChart;
