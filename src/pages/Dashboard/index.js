import React from "react"
import {Col, Container, Row} from "reactstrap"
import {Breadcrumbs} from "@material-ui/core";
import MiniWidget from "./mini-widget";
import TopVendors from "./top-vendors";
import LatestTransaction from "./latest-transaction";
import TopUsers from "./top-users";

const series1 = [{
    data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
}]

const options1 = {
    fill: {
        colors: ['#5b73e8']
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
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
            show: !1
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

const series2 = [70]

const options2 = {
    fill: {
        colors: ['#34c38f']
    },
    chart: {
        sparkline: {
            enabled: !0
        }
    },
    dataLabels: {
        enabled: !1
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: !1
            }
        }
    }
};

const series3 = [55]

const options3 = {
    fill: {
        colors: ['#5b73e8']
    },
    chart: {
        sparkline: {
            enabled: !0
        }
    },
    dataLabels: {
        enabled: !1
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: !1
            }
        }
    }
};

/* TODO -- hacer graficos clientes pegado a servicios */
/* debo obtener la información de clientes registrados, ayer hoy y antier */
/* comparar hoy, ayer y antier clientes registrados */
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

const Dashboard = () => {
    const reports = [
        {
            id: 1,
            icon: "mdi mdi-clock-five-time",
            title: "Productos",
            value: 34152,
            prefix: "",
            suffix: "",
            decimal: 0,
            charttype: "bar",
            chartheight: 40,
            chartwidth: 70,
            badgeValue: "34142",
            color: "success",
            desc: "disponibles",
            badgeValue2: "10",
            color2: "danger",
            desc2: "reservado",
            series: series1,
            options: options1,

        },
        {
            id: 2,
            icon: "mdi mdi-arrow-up-bold",
            title: "Ventas diarias",
            value: 5643,
            decimal: 0,
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            prefix: "$",
            suffix: "",
            badgeValue: "0.82%",
            color: "success",
            desc: "desde ayer",
            series: series2,
            options: options2,
        },
        {
            id: 3,
            icon: "mdi mdi-arrow-down-bold",
            title: "Ventas semanales",
            value: 45254,
            decimal: 0,
            prefix: "$",
            suffix: "",
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            badgeValue: "6.24%",
            color: "danger",
            desc: "desde hace una semana",
            series: series3,
            options: options3,
        },
        {
            id: 4,
            icon: "uil-users-alt",
            title: "Clientes",
            value: 19800,
            decimal: 0,
            charttype: "line",
            chartheight: 40,
            chartwidth: 70,
            badgeValue: "200",
            color: "success",
            desc: "registrados hoy",
            series: series4,
            options: options4,
        },
    ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
            <Breadcrumbs title="Lucy Moie" item="Dashboard" />
            <Row>
                <MiniWidget reports={reports} />
            </Row>
            <Row>
                <Col xl={4}>
                <TopUsers/>
                </Col>
                <Col xl={8}>
                    <LatestTransaction />
                </Col>
            </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
