import React, {useEffect, useState} from "react"
import PropTypes from "prop-types";
import {customerOrdersStats} from "../../helpers/service";
import moment from "moment";
import {ORDER_COLORS, ORDER_STATUS, ORDERS_ENUM} from "../../common/constants";
import PieChart from "../../components/Common/PieChart";
import BarChart from "../../components/Common/BarChart";

const OrdersPieChart = ({customerId}) => {

    const [orderChart, setOrderChart] = useState({series: [], labels:[]});

    useEffect(() => {
        if (customerId) {
            customerOrdersStats(customerId, moment()).then(resp => {
                const chartData = {series: [], labels:[], colors: []};
                if(resp){
                    //CONCILIADAS Y ANULADAS
                    resp.filter(pc => pc.status >= ORDERS_ENUM.CONFIRMED).forEach(pc => {
                        chartData.series.push(pc.sumPrices);
                        chartData.labels.push(ORDER_STATUS[pc.status].name);
                        chartData.colors.push(ORDER_STATUS[pc.status].colorCss);
                    })
                }
                setOrderChart(chartData);
            });
        }
    }, [customerId]);

    return (
        <>
            <h4 className="card-title text-info">Pedidos</h4>
            <div style={{background: '#f6f6f6', height: '100%'}}>
                <BarChart data={orderChart} colors={orderChart.colors}/>
            </div>
        </>
    );
}

OrdersPieChart.propTypes = {
    customerId: PropTypes.number.isRequired
}

export default OrdersPieChart;
