import React, {useEffect, useState} from "react"
import PropTypes from "prop-types";
import {customerOrdersStats} from "../../helpers/service";
import moment from "moment";
import {ORDER_STATUS} from "../../common/constants";
import PieChart from "../../components/Common/PieChart";

const OrdersPieChart = ({customerId}) => {

    const [orderChart, setOrderChart] = useState({series: [], labels:[]});

    useEffect(() => {
        if (customerId) {
            customerOrdersStats(customerId, moment()).then(resp => {
                const chartData = {series: [], labels:[], colors: []};
                console.log('customerOrdersStats', resp)
                if(resp){
                    //CONCILIADAS Y ANULADAS
                    resp.filter(pc => pc.status === 5 && pc.status === 6).forEach(pc => {
                        chartData.series.push(pc.qty);
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
                <PieChart data={orderChart}/>
            </div>
        </>
    );
}

OrdersPieChart.propTypes = {
    customerId: PropTypes.number.isRequired
}

export default OrdersPieChart;
