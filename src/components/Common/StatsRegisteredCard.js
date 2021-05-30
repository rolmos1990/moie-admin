import React, {useEffect, useState} from "react"
import PropTypes from "prop-types";
import WidgetCard4 from "./WidgetCard4";

const StatsRegisteredCard = (props) => {
    const {getData, getDataToday, title} = props;
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        if (getData) {
            getData().then(data => setReportData(data));
        }
    }, [getData]);

    useEffect(() => {
        if (reportData && !reportData.hasOwnProperty('countToday') && getDataToday) {
            getDataToday().then(data => setReportData({...reportData, countToday: data.count}));
        }
    }, [reportData]);


    return (
        <React.Fragment>
            <WidgetCard4 title={title} reportData={reportData}/>
        </React.Fragment>
    );
}

export default StatsRegisteredCard;

StatsRegisteredCard.propTypes = {
    getData: PropTypes.func.isRequired,
    getDataToday: PropTypes.func,
    title: PropTypes.string.isRequired,
    history: PropTypes.object
}