import React, {useEffect, useState} from "react"
import imageNotFound from "../../assets/images/image-not-found.png"
import {Card, CardBody} from "reactstrap";
import ReactApexChart from "react-apexcharts";
import CountUp from "react-countup";
import PropTypes from "prop-types";
import WidgetCard from "./WidgetCard";

const series4 = [{
    data: [25, 66, 200]
}]

const options4 = {

    fill: {
        colors: ['#f1b44c']
    },
    chart: {
        width: 70,
        sparkline: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    labels: ["Antier", "Ayer", "Hoy"],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        x: {
            show: 1
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: !1
        }
    }
};

const WidgetCard4 = props => {
    const {reportData, title} = props;
    const [dataCard, setDataCard] = useState({});

    useEffect(() => {
        let rData = {};
        if(reportData){
            rData = {...reportData};
        }
        console.log(rData);

        const data = {
            id: 4,
            icon: "uil-users-alt",
            title: title,
            value: rData.count || 0,
            decimal: 0,
            charttype: "line",
            chartheight: 40,
            chartwidth: 70,
            badgeValue: `${!!rData.countToday ? rData.countToday : 0}`,
            color: "success",
            desc: "registrados hoy",
            series: series4,
            options: options4,
        };
        setDataCard(data);
    }, [reportData])

    return (
        <WidgetCard report={dataCard}/>
    )
}


WidgetCard4.propTypes = {
    reportData: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

export default WidgetCard4
