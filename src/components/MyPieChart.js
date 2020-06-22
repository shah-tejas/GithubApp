import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
// import { Chart } from "react-google-charts";

const MyPieChart = ({languages}) => {
      
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#56eec7', '#FF5733', '#35E929', '#3983D5', '#9E2DE7'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
      }) => {
         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

    console.log(languages);

    return(
        <div>
            <PieChart width={600} height={600}>
                <Pie
                    data={languages}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="language"
                    labelLine={false}
                >
                    {
                        languages.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>

            {/* <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={languages}
                // data={[
                //     ['Task', 'Hours per Day'],
                //     ['Work', 11],
                //     ['Eat', 2],
                //     ['Commute', 2],
                //     ['Watch TV', 2],
                //     ['Sleep', 7],
                // ]}
                options={{
                    title: 'Languages',
                }}
/> */}

        </div>
    );
}

export default MyPieChart;