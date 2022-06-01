import React, {useEffect, useState} from "react"
import PropTypes from "prop-types";
import {customerCategoryStats, customerOrdersStats} from "../../helpers/service";
import moment from "moment";
import {ORDER_STATUS, ORDERS_ENUM} from "../../common/constants";
import PieChart from "../../components/Common/PieChart";
import BarChart from "../../components/Common/BarChart";

const CategoriesPieChart = ({customerId}) => {

    const [categoryChart, setCategoryChart] = useState({series: [], labels:[]});

    useEffect(() => {
        if (customerId) {
            customerCategoryStats(customerId, moment()).then(resp => {
                const chartData = {series: [], labels:[]};
                if(resp){
                    resp.forEach(pc => {
                        chartData.series.push(pc.qty);
                        chartData.labels.push(pc.name);
                    })
                }
                setCategoryChart(chartData);
            });
        }
    }, [customerId]);

    return (
        <>
            <h4 className="card-title text-info">Categorias</h4>
            <div style={{background: '#f6f6f6', height: '100%'}}>
                <BarChart data={categoryChart}/>
            </div>
        </>
    );
}

CategoriesPieChart.propTypes = {
    customerId: PropTypes.number.isRequired
}

export default CategoriesPieChart;
