import React from 'react';
import { Chart } from "react-google-charts";

const MyPieChart = ({languages, userfullname}) => {

    const title = `${userfullname}'s preferred Languages`;

    return(
        <div>

            <Chart
                width={'600px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={languages}
                options={{
                    title: title,
                }}
            />

        </div>
    );
}

export default MyPieChart;