import React from "react"
import imageNotFound from "../../assets/images/image-not-found.png"
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const PieChart = props => {

    const pieData = {
        series: props.data.series,
        options: {
            chart: {
                type: 'donut',
                width: 50,
            },
            labels: props.data.labels,
            responsive: [{
                breakpoint: 480,
                options: {
                    size: '95%',
                    expandOnClick: false,
                    chart: {
                        type: 'donut',
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };
    return (
        <>
            <ReactApexChart
                options={pieData.options}
                series={pieData.series}
                type={pieData.options.chart.type}
                width={450}
                height={450}
            />
        </>
    );
}

PieChart.propTypes = {
    data: PropTypes.object.isRequired
}

export default PieChart;
