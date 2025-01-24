import React, {useEffect, useState} from "react"
import {CardBody, Col, Label, Row} from "reactstrap"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {DATE_FORMAT, formatDate, priceFormat} from "../../common/utils";
import {statsApi} from "../../helpers/backend_helper";

import Highcharts from 'highcharts'
import {FieldDate, FieldSelect} from "../../components/Fields";
import {DATE_MODES} from "../../components/Fields/InputDate";
import HighChartsWrapper from "../../components/Common/HishChartsWrapper";
import {AvForm} from "availity-reactstrap-validation";
import {generateReport} from "../../store/bill/actions";
import {REPORT_TYPES, showByList} from "../../common/constants";

const hoy = new Date();
const defaultDates = [new Date(hoy.getTime() - 518400000), new Date()];
const initialState = {
    cargando: '',
    usuarios: [],
    ventasGanancias: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Reporte Ganancia Ventas'
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: []
            },
            yAxis: [{
                labels: {
                    format: '$ {value}'
                },
                title: {
                    text: 'Monto'
                },
                formatter: function(val) {
                    return val.ganancia
                },
            }],
            series: [{
                name: 'Ganancia ($)',
                data: []
            },
            ],
            tooltip: {
                formatter: function () {
                    const punto = this.point; // Obtener el punto actual
                    let html = `
                        <div>
                            <div>
                                <p>
                                    <b>-- ${this.series.name}</b><br/>
                                    <b>Piezas: </b> ${Highcharts.numberFormat(punto.cantidad_piezas)}<br/>
                                    <b>Ganancia: </b> ${priceFormat(punto.ganancia)} COP
                                    <b>Vendido: </b> ${priceFormat(punto.totalConDescuento)} COP
                                </p>
                            </div>
                        </div>
                    `;
                    return html;
                },
                shared: false
            }
        },
        opciones: {
            grupo: 'dia'
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        },
    },
}

const Revenue = ({className}) => {

    const [stats, setStats] = useState(initialState);

    useEffect(() => {
        if (stats.ventasGanancias) {
            ventasGananciasCargar()
        }
    }, [stats.ventasGanancias.fecha]);

    const getStatsLabel = (stats, node) => {
        if(parserClientDate(stats[node].fecha.inicial) == parserClientDate(stats[node].fecha.final)){
            return parserClientDate(stats[node].fecha.inicial);
        }
        else {
            return parserClientDate(stats[node].fecha.inicial) + ' a ' + parserClientDate(stats[node].fecha.final)
        }
    }

    const ventasGananciasCargar_bk = () => {
        if (valida(stats.ventasGanancias.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas_whatsapp';
            url += '/' + parserServerDate(stats.ventasGanancias.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasGanancias.fecha.final);
            //leer estadisticas de ventas

            const resp = {
                "0": {
                    "fecha": "23-01-2025",
                    "ganancia": 30000,
                    "cantidad_piezas": 100
                },
                "1": {
                    "fecha": "24-01-2025",
                    "ganancia": 30000,
                    "cantidad_piezas": 200
                },
                "2": {
                    "fecha": "25-01-2025",
                    "ganancia": 55000,
                    "cantidad_piezas": 300
                },
                "3": {
                    "fecha": "26-01-2025",
                    "ganancia": 30000,
                    "cantidad_piezas": 400
                },
                "4": {
                    "fecha": "27-01-2025",
                    "ganancia": 49999,
                    "cantidad_piezas": 500
                },
                "5": {
                    "fecha": "28-01-2025",
                    "ganancia": 87998.9,
                    "cantidad_piezas": 600
                },
                "6": {
                    "fecha": "29-01-2025",
                    "ganancia": 115998,
                    "cantidad_piezas": 700
                },
                "7": {
                    "fecha": "30-01-2025",
                    "ganancia": 149990.09,
                    "cantidad_piezas": 800
                }
            };

            var fechas = [];
            var datosVentas = [];
            var keys = Object.keys(resp);
            for (var i = 0; i < keys.length; i++) {
                var data = resp[keys[i]];
                fechas[i] = data.fecha;
                datosVentas.push({
                    y: parseFloat(data.ganancia), // Valor para la gráfica
                    ganancia: parseFloat(data.ganancia),
                    cantidad_piezas: data.cantidad_piezas,
                    monto: data.totalAmount
                });
            }

            const newStats = {...stats};
            newStats.ventasGanancias.data.subtitle.text = getStatsLabel(newStats,'ventasGanancias');
            newStats.ventasGanancias.data.xAxis.categories = fechas;
            newStats.ventasGanancias.data.series[0].data = datosVentas;
            newStats.cargando = '';
            setStats(newStats);
        }
    }

    const ventasGananciasCargar = () => {
        if (valida(stats.ventasGanancias.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_revenue';
            url += '/' + parserServerDate(stats.ventasGanancias.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasGanancias.fecha.final);
            url += '/' + stats.ventasGanancias.opciones.grupo;
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {

                var fechas = [];
                var datosVentas = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    fechas[i] = data.fecha;
                    datosVentas.push({
                        y: parseFloat(data.ganancia), // Valor para la gráfica
                        ganancia: parseFloat(data.totalRevenue),
                        cantidad_piezas: data.totalQuantity,
                        totalConDescuento: data.totalWithDiscount,
                        delivery: data.totalDeliveryAmount
                    });
                }

                const newStats = {...stats};
                newStats.ventasGanancias.data.subtitle.text = getStatsLabel(newStats,'ventasGanancias');
                newStats.ventasGanancias.data.xAxis.categories = fechas;
                newStats.ventasGanancias.data.series[0].data = datosVentas;
                newStats.cargando = '';
                setStats(newStats);

            })
        }
    }



    const parserServerDate = (date) => {
        return formatDate(date, DATE_FORMAT.ONLY_DATE);
    }

    const valida = (node) => {
        if (!node) return;
        let v = false;
        if (node.inicial && node.final && (node.inicial <= node.final)) {
            v = true;
        } else if (node.inicial || node.final){
            v = true;
        }
        return v;
    }

    const parserClientDate = (date) => {
        return formatDate(date, DATE_FORMAT.DD_MM_YYYY);
    }

    const onChangeDate = (dates, node) => {
        if (dates.length > 0) {
            const s = {...stats}
            if ((dates.length === 1) || (dates[0].toString() == dates[1].toString())) {
                s[node] = {...stats[node], fecha: {...stats[node].fecha, inicial: dates[0], final: dates[0]}};
            } else {
                s[node] = {...stats[node], fecha: {...stats[node].fecha, inicial: dates[0], final: dates[1]}};
            }
            setStats(s);
            console.log(s);
        }
    }

    const onChangeGrupo = (grupo, node) => {
        if (grupo && grupo.value) {
            const s = {...stats}
            s[node] = {...stats[node], opciones: {...stats[node].opciones, grupo: grupo.value}}
            setStats(s);
        }
    }

    return (
        <AvForm className="needs-validation" autoComplete="off">
            <Card className={className}>
                <CardBody>
                    <Row id="ventasGanancias">
                        <Col md={12}>
                            <h4 className="card-title text-info"> Ventas por Whatsapp</h4>
                        </Col>
                        <Col md={4}>
                            <div className="mb-3">
                                <Label>Fecha</Label>
                                <FieldDate
                                    name="ventasGanancias_dates"
                                    mode={DATE_MODES.RANGE}
                                    defaultValue={defaultDates}
                                    onChange={(dates) => onChangeDate(dates, "ventasGanancias")}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="mb-3">
                                <Label>Mostrar por</Label>
                                <FieldSelect
                                    name="ventasTipo_grupo"
                                    options={showByList}
                                    defaultValue={showByList.length > 0 ? showByList[0] : null}
                                    onChange={(data) => onChangeGrupo(data, "ventasGanancias")}
                                />
                            </div>
                        </Col>
                        <Row>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventasGanancias.data}/>
                            </Col>
                        </Row>
                    </Row>
                </CardBody>
            </Card>
        </AvForm>
    )
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    onGenerateReport: (data) => dispatch(generateReport(REPORT_TYPES.CONCILIATION, data))
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Revenue)
)

Revenue.propTypes = {
    error: PropTypes.any,
}
