import React from 'react';
import { Chart } from "react-google-charts";

const MyPieChart = ({languages}) => {


    return(
        <div>

            <Chart
                width={'600px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={languages}
                options={{
                    title: `User's Preferred Language`,
                }}
            />

        </div>
    );
}

export default MyPieChart;