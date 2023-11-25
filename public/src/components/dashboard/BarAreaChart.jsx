import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const monthlyMoneyData2 = [
  {
    year: 2023,
    month: 9,
    totalMoney: 1400
  },
  {
    year: 2023,
    month: 10,
    totalMoney: 2000
  },
  {
    year: 2023,
    month: 11,
    totalMoney: 100
  },
  {
    year: 2023,
    month: 12,
    totalMoney: 5000
  }

]

import { FaChartBar, FaChartArea } from 'react-icons/fa';

const BarAreaChart = ({ monthlyMoneyData }) => {

  console.log(monthlyMoneyData);
  const [chartType, setChartType] = useState('bar');

  const showBar = () => {
    setChartType("bar");
  };
  const showArea = () => {
    setChartType("area");
  };

  const customYAxisTickFormatter = (value) => `${value} DH`;

  const lastTotalMoney = monthlyMoneyData[monthlyMoneyData.length - 1]?.totalMoney;

  return <div className="w-full">
    <h2 className="text-2xl font-bold mt-20 mb-5 text-blue-600">Gym Profits: <span className="text-blue-900">{lastTotalMoney} DH</span></h2>
    <div className={`space-x-5 mb-24`}>
      <button
        className={`text-gray-400 ${chartType == "bar" ? "text-blue-500" : "text-gray-400"}`}
        onClick={showBar}><FaChartBar size={28} /></button>
      <button
        className={`${chartType === "area" ? "text-gray-500" : "text-blue-500"}`}
        onClick={showArea}><FaChartArea size={28} /></button>
    </div>
    <div className="">
      {
        chartType == "bar" ? (
          <ResponsiveContainer width='100%' height={250}>

            <BarChart data={monthlyMoneyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={customYAxisTickFormatter} />
              <Tooltip formatter={customYAxisTickFormatter} />
              <Legend />
              <Bar
                dataKey="totalMoney"
                fill="#8884d8"
                name="totalMoney"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width='100%' height={250}>
            <AreaChart data={monthlyMoneyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={customYAxisTickFormatter} />
              <Tooltip formatter={customYAxisTickFormatter} />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalMoney"
                fill="#8884d8"
                name="totalMoney"
              />
            </AreaChart>
          </ResponsiveContainer>

        )
      }
    </div>
  </div >

};

export default BarAreaChart;


/* 
<BarChart data={monthlyMoneyData} margin={{ top: 50 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey='totalMoney' fill='#8884d8' barSize={75} />
            </BarChart> 

          // <ResponsiveContainer width='100%' height={300}>
          //   <AreaChart width={450} height={300} data={monthlyMoneyData}>
          //     <XAxis dataKey="month" />
          //     <YAxis />
          //     <Tooltip />
          //     <Area type="monotone" dataKey="totalMoney" fill="#8884d8" />
          //   </AreaChart>
          // </ResponsiveContainer>
*/