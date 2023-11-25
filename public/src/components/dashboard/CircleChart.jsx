import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CircleChart = ({ clientStatsData, gymStatsData }) => {
  const COLORS1 = ['#3498db', '#e74c3c'];
  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];
  // const COLORS = ['#3498db', '#e74c3c', '#2ecc71'];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor="middle">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Membership Statistics:</h2>
      <div className="md:flex">
        <div className="md:flex-grow mb-4 md:mr-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={clientStatsData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {clientStatsData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                ))}
              </Pie>
              <Legend align="center" verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="md:flex-grow">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={gymStatsData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {gymStatsData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend align="center" verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;

/* 
<div className="">
  <h2 className="text-2xl font-bold mb-4">Client and Gym Statistics</h2>
  <ResponsiveContainer width="100%" height={300} >
   <PieChart >
    <Pie
     dataKey="value"
     data={clientStatsData}
     cx="30%"
     cy="50%"
     innerRadius={0} // Set innerRadius to 0 for a full pie chart
     outerRadius={80}
     labelLine={false}
     label={renderLabel}
     cla
    >
     {clientStatsData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
     ))}
    </Pie>
    <Pie
     dataKey="value"
     data={gymStatsData}
     cx="70%"
     cy="50%"
     innerRadius={0} // Set innerRadius to 0 for a full pie chart
     outerRadius={80}
     labelLine={false}
     label={renderLabel}
    >
     {gymStatsData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
     ))}
    </Pie>
    <Legend align="center" verticalAlign="bottom" height={36} />
   </PieChart>
  </ResponsiveContainer>
 </div>

*/

/* 

<article className="">
  <h3 className="text-xl">Members Satistics :</h3>
  <div className="grid gap-y-8">
   <div>
    <PieChart width={400} height={400}>
     <Pie
      data={clientStatsData}
      cx={200}
      cy={200}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
     >
      {clientStatsData.map((entry, index) => (
       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
     </Pie>
     <Tooltip />
     <Legend />
    </PieChart>
   </div>
   <div>
    <PieChart width={400} height={400}>
     <Pie
      data={gymStatsData}
      cx={200}
      cy={200}
      labelLine={false}
      label={renderCustomizedLabel2}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
     >
      {gymStatsData.map((entry, index) => (
       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
     </Pie>
     <Tooltip />
     <Legend />
    </PieChart>
   </div>
  </div>

 </article>
*/