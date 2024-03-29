import React from "react"
import imageNotFound from "../../assets/images/image-not-found.png"
import {Card, CardBody} from "reactstrap";
import ReactApexChart from "react-apexcharts";
import CountUp from "react-countup";
import PropTypes from "prop-types";

const WidgetCard = props => {

    const {report} = props;
    return (
        <Card>
            {report.charttype && (
                <CardBody>
                    <div className="float-end mt-2">
                        {report.charttype == "text" ? (
                            <h4 class="text-info">{report.series}</h4>
                        ) : (
                            <ReactApexChart
                                options={report.options}
                                series={report.series}
                                type={report.charttype}
                                height={report.chartheight}
                                width={report.chartwidth}
                            />
                        )}

                    </div>
                    <div>
                        <h4 className="mb-1 mt-1">
                        <span>
                            <CountUp end={report.value} separator="," prefix={report.prefix} suffix={report.suffix} decimals={report.decimal}/>
                        </span>
                        </h4>
                        <p className="text-muted mb-0">{report.title}</p>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                    <span className={"text-" + report.color + " me-1"}>
                        <i className={report.icon + " me-1"}> </i>{report.badgeValue}
                    </span> {" "}{report.desc}
                        {(report.badgeValue2 || report.badgeValue2 === 0) && (
                            <> &nbsp; / &nbsp;
                                <span className={"text-" + report.color2 + " me-1"}>
                                    <i className={report.icon2 + " me-1"}> </i> {report.badgeValue2}
                                </span> {" "}{report.desc2}
                            </>
                        )}
                    </p>
                </CardBody>
            )}
        </Card>
    )
}


WidgetCard.propTypes = {
    report: PropTypes.object.isRequired
}

export default WidgetCard
