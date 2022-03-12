import React, {useEffect, useState} from "react"
import {CardBody, Col, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {DATE_FORMAT, formatDate} from "../../common/utils";
import {REPORT_TYPES} from "../../common/constants";
import {generateReport} from "../../store/reports/actions";
import {statsApi} from "../../helpers/backend_helper";

import Highcharts from 'highcharts'
import {FieldDate, FieldSelect} from "../../components/Fields";
import {DATE_MODES} from "../../components/Fields/InputDate";
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {getUsers} from "../../store/user/actions";
import {getEmptyOptions} from "../../common/converters";
import HighChartsWrapper from "../../components/Common/HishChartsWrapper";

const showByList = [getEmptyOptions(), ...['dia', 'Semana', 'Mes', 'Año'].map((g) => ({label: g, value: g}))]
const hoy = new Date();
const defaultDates = [new Date(hoy.getTime() - 518400000), new Date()];
const initialState = {
    cargando: '',
    usuarios: [],
    ventas: {
        data: {
            title: {
                text: 'Ventas'
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
                }
            },
                {
                    labels: {
                        format: '{value} Pz.'
                    },
                    title: {
                        text: 'Piezas'
                    },
                    opposite: true
                }],
            series: [{
                name: 'Venta ($)',
                data: []
            },
                {
                    name: 'Ganancia ($)',
                    data: []
                },
                {
                    name: 'Piezas',
                    yAxis: 1,
                    dashStyle: 'shortdot',
                    data: []
                }]
        },
        opciones: {
            usuario: '',
            grupo: 'dia'
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime())
        },
    },
    ventasEstado: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ventas por departamento'
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
                }
            }],
            series: [{
                name: 'Venta ($)',
                data: []
            }]
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        }
    },
    ventasOrigen: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ventas por origen'
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
                }
            }],
            series: [
                /*{
                    name: 'Página Web',
                    data: []
                },
                {
                    name: 'Página Web Movil',
                    data: []
                },
                {
                    name: 'Facebook',
                    data: []
                },
                {
                    name: 'App',
                    data: []
                },
                {
                    name: 'Whatsapp',
                    data: []
                },
                {
                    name: 'Blackberry',
                    data: []
                },
                {
                    name: 'Otros',
                    data: []
                }*/
            ]
        },
        opciones: {
            grupo: 'dia'
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        }
    },
    reincidencias: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Reincidencias'
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
                }
            }],
            series: [{
                name: 'Clientes',
                data: []
            },
                {
                    name: 'Reincidentes',
                    data: []
                }]
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime())
        }
    },
    ventasWhatsapp: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ventas por Whatsapp'
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
                }
            }],
            series: [{
                name: 'Venta ($)',
                data: []
            }]
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        }
    },
    ventasTipo: {
        data: {
            title: {
                text: 'Ventas por tipo'
            },
            subtitle: {
                text: null
            },
            tooltip: {
                shared: true
            },
            xAxis: {
                crosshair: true,
                categories: []
            },
            yAxis: [{
                labels: {
                    format: '$ {value}'
                },
                title: {
                    text: 'Monto'
                }
            }, {
                labels: {
                    format: '{value}'
                },
                title: {
                    text: 'Pedidos'
                },
                opposite: true
            }],
            series: [
                {
                    name: 'Monto Previo Pago',
                    type: 'column',
                    color: '#aad0f3',
                    data: []
                },
                {
                    name: 'Monto Contra Entrega',
                    type: 'column',
                    color: '#5b5b62',
                    data: []
                },
                {
                    name: 'Pedidos Previo Pago',
                    yAxis: 1,
                    color: '#7CB5EC',
                    data: []
                },
                {
                    name: 'Pedidos Contra Entrega',
                    yAxis: 1,
                    color: '#434348',
                    data: []
                }]
        },
        opciones: {
            grupo: 'dia'
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        }
    },
    masVendidos: {
        data: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Productos más vendidos'
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: []
            },
            yAxis: [{
                labels: {
                    format: '{value}'
                },
                title: {
                    text: 'Piezas'
                }
            }],
            series: [{
                name: 'Cantidad',
                data: []
            },
                {
                    name: 'Existencia',
                    data: []
                }]
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        },
    },
    horas: {
        data: {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Pedidos por hora'
            },
            subtitle: {
                text: "sub"
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            yAxis: [
                {
                    labels: {
                        format: '$ {value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Monto',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                },
                // Secondary yAxis
                {
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    title: {
                        text: 'Pedidos',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
            series: [
                {
                    name: 'Monto',
                    type: 'column',
                    yAxis: 1,
                    data: []
                },
                {
                    name: 'Cantidad',
                    type: 'spline',
                    data: []
                }
            ]
        },
        fecha: {
            inicial: new Date(hoy.getTime() - 518400000),
            final: new Date(hoy.getTime()),
        }
    }
}

const Stats = ({users, onGetUsers}) => {

    const [stats, setStats] = useState(initialState);

    useEffect(() => {
        if (onGetUsers) {
            onGetUsers();
        }
    }, [onGetUsers]);

    useEffect(() => {
        if (stats.ventas) {
            cargarVentas()
        }
    }, [stats.ventas.fecha]);

    useEffect(() => {
        if (stats.ventas) {
            cargarVentas()
        }
    }, [stats.ventas.opciones]);

    useEffect(() => {
        if (stats.ventasEstado) {
            ventasEstadoCargar()
        }
    }, [stats.ventasEstado.fecha]);

    useEffect(() => {
        if (stats.ventasWhatsapp) {
            ventasWhatsappCargar()
        }
    }, [stats.ventasWhatsapp.fecha]);

    useEffect(() => {
        if (stats.ventasOrigen) {
            ventasOrigenCargar()
        }
    }, [stats.ventasOrigen.fecha]);

    useEffect(() => {
        if (stats.ventasOrigen) {
            ventasOrigenCargar()
        }
    }, [stats.ventasOrigen.opciones]);

    useEffect(() => {
        if (stats.ventasTipo) {
            ventasTipoCargar()
        }
    }, [stats.ventasTipo.fecha]);

    useEffect(() => {
        if (stats.ventasTipo) {
            ventasTipoCargar()
        }
    }, [stats.ventasTipo.opciones]);

    useEffect(() => {
        if (stats.masVendidos) {
            masVendidosCargar()
        }
    }, [stats.masVendidos.fecha]);

    useEffect(() => {
        if (stats.horas) {
            horasCargar()
        }
    }, [stats.horas.fecha]);

    useEffect(() => {
        if (stats.reincidencias) {
            reincidenciasCargar()
        }
    }, [stats.reincidencias.fecha]);

    useEffect(() => {
        if (users) {
            const options = users.map((user) => ({label: user.name, value: user.id}))
            setStats({...stats, usuarios: [getEmptyOptions(), ...options]});
            console.log('users', users)
        }
    }, [users]);

    const cargarVentas = () => {
        if (valida(stats.ventas.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas';
            url += '/' + parserServerDate(stats.ventas.fecha.inicial);
            url += '/' + parserServerDate(stats.ventas.fecha.final);
            url += '/' + stats.ventas.opciones.grupo;
            url += '/' + stats.ventas.opciones.usuario;
            //leer estadisticas de ventas
            statsApi(url).then((resp) => {
                var fechas = [];
                var datosVentas = [];
                var datosGanancias = [];
                var datosPiezas = [];

                var keys = Object.keys(resp);

                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    fechas[i] = data.fecha;
                    datosVentas[i] = parseFloat(data.monto);
                    datosGanancias[i] = parseFloat(data.ganancia);
                    datosPiezas[i] = parseFloat(data.piezas);
                }
                const newStats = {...stats};
                newStats.ventas.data.subtitle.text = parserClientDate(stats.ventas.fecha.inicial) + ' a ' + parserClientDate(stats.ventas.fecha.final)
                newStats.ventas.data.xAxis.categories = fechas;
                newStats.ventas.data.series[0].data = datosVentas;
                newStats.ventas.data.series[1].data = datosGanancias;
                newStats.ventas.data.series[2].data = datosPiezas;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            console.error(data.error);
            estadisticas.cargando = '';
        });*/
        }
    }

    const ventasEstadoCargar = () => {
        if (valida(stats.ventasEstado.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas_estado';
            url += '/' + parserServerDate(stats.ventasEstado.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasEstado.fecha.final);
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var estados = [];
                var datosVentas = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    estados[i] = data.estado;
                    datosVentas[i] = parseFloat(data.monto);
                }
                const newStats = {...stats};
                newStats.ventasEstado.data.subtitle.text = parserClientDate(stats.ventasEstado.fecha.inicial) + ' a ' + parserClientDate(stats.ventasEstado.fecha.final)
                newStats.ventasEstado.data.xAxis.categories = estados;
                newStats.ventasEstado.data.series[0].data = datosVentas;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const ventasOrigenCargar = () => {
        if (valida(stats.ventasOrigen.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas_origen';
            url += '/' + parserServerDate(stats.ventasOrigen.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasOrigen.fecha.final);
            url += '/' + stats.ventasOrigen.opciones.grupo;
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var fechas = [];
                var series = [];
                var datosWeb = [];
                var datosWebMovil = [];
                var datosFacebook = [];
                var datosApp = [];
                var datosWhatsapp = [];
                var datosBlackberry = [];
                var datosOtros = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    fechas[i] = data.fecha;
                    series[i] = data.data;
                    /* datosWeb[i] = parseFloat(data.web);
                    datosWebMovil[i] = parseFloat(data.webMovil);
                    datosFacebook[i] = parseFloat(data.facebook);
                    datosApp[i] = parseFloat(data.app);
                    datosWhatsapp[i] = parseFloat(data.whatsapp);
                    datosBlackberry[i] = parseFloat(data.blackberry);
                    datosOtros[i] = parseFloat(data.otros);*/
                }
                const newStats = {...stats};
                newStats.ventasOrigen.data.subtitle.text = parserClientDate(stats.ventasOrigen.fecha.inicial) + ' a ' + parserClientDate(stats.ventasOrigen.fecha.final)
                newStats.ventasOrigen.data.xAxis.categories = fechas;
                newStats.ventasOrigen.data.series = series;
                /*newStats.ventasOrigen.data.series[0].data = datosWeb;
                newStats.ventasOrigen.data.series[1].data = datosWebMovil;
                newStats.ventasOrigen.data.series[2].data = datosFacebook;
                newStats.ventasOrigen.data.series[3].data = datosApp;
                newStats.ventasOrigen.data.series[4].data = datosWhatsapp;
                newStats.ventasOrigen.data.series[5].data = datosBlackberry;
                newStats.ventasOrigen.data.series[6].data = datosOtros;*/
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const reincidenciasCargar = () => {
        if (valida(stats.reincidencias.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_reincidencias';
            url += '/' + parserServerDate(stats.reincidencias.fecha.inicial);
            url += '/' + parserServerDate(stats.reincidencias.fecha.final);
            //leer estadisticas de ventas
            statsApi(url).then(function (data) {
                var fechas = [];
                var datosClientes = data.clientes;
                var datosReincidentes = data.reincidentes;

                const newStats = {...stats};
                newStats.reincidencias.data.subtitle.text = parserClientDate(stats.reincidencias.fecha.inicial) + ' a ' + parserClientDate(stats.reincidencias.fecha.final)
                newStats.reincidencias.data.xAxis.categories = ['Total'];
                newStats.reincidencias.data.series[0].data = datosClientes;
                newStats.reincidencias.data.series[1].data = datosReincidentes;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const ventasWhatsappCargar = () => {
        if (valida(stats.ventasWhatsapp.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas_whatsapp';
            url += '/' + parserServerDate(stats.ventasWhatsapp.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasWhatsapp.fecha.final);
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var whatsapp = [];
                var datosVentas = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    whatsapp[i] = data.origen;
                    datosVentas[i] = parseFloat(data.monto);
                }
                const newStats = {...stats};
                newStats.ventasWhatsapp.data.subtitle.text = parserClientDate(stats.ventasWhatsapp.fecha.inicial) + ' a ' + parserClientDate(stats.ventasWhatsapp.fecha.final)
                newStats.ventasWhatsapp.data.xAxis.categories = whatsapp;
                newStats.ventasWhatsapp.data.series[0].data = datosVentas;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const ventasTipoCargar = () => {
        if (valida(stats.ventasTipo.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_ventas_tipo';
            url += '/' + parserServerDate(stats.ventasTipo.fecha.inicial);
            url += '/' + parserServerDate(stats.ventasTipo.fecha.final);
            url += '/' + stats.ventasTipo.opciones.grupo;
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var fechas = [];
                var cantidadPrevioPago = [];
                var montoPrevioPago = [];
                var cantidadContraEntrega = [];
                var montoContraEntrega = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    fechas[i] = data.fecha;
                    cantidadPrevioPago[i] = parseFloat(data.cantidadPrevioPago);
                    montoPrevioPago[i] = parseFloat(data.montoPrevioPago);
                    cantidadContraEntrega[i] = parseFloat(data.cantidadContraEntrega);
                    montoContraEntrega[i] = parseFloat(data.montoContraEntrega);
                }
                const newStats = {...stats};
                newStats.ventasTipo.data.subtitle.text = parserClientDate(stats.ventasTipo.fecha.inicial) + ' a ' + parserClientDate(stats.ventasTipo.fecha.final)
                newStats.ventasTipo.data.xAxis.categories = fechas;
                newStats.ventasTipo.data.series[0].data = montoPrevioPago;
                newStats.ventasTipo.data.series[1].data = montoContraEntrega;
                newStats.ventasTipo.data.series[2].data = cantidadPrevioPago;
                newStats.ventasTipo.data.series[3].data = cantidadContraEntrega;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const masVendidosCargar = () => {
        if (valida(stats.masVendidos.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_mas_vendidos';
            url += '/' + parserServerDate(stats.masVendidos.fecha.inicial);
            url += '/' + parserServerDate(stats.masVendidos.fecha.final);
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var ids = [];
                var cantidad = [];
                var existencia = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    ids[i] = data.id;
                    cantidad[i] = parseFloat(data.cantidad);
                    existencia[i] = parseFloat(data.existencia);
                }
                const newStats = {...stats};
                newStats.masVendidos.data.subtitle.text = parserClientDate(stats.masVendidos.fecha.inicial) + ' a ' + parserClientDate(stats.masVendidos.fecha.final)
                newStats.masVendidos.data.xAxis.categories = ids;
                newStats.masVendidos.data.series[0].data = cantidad;
                newStats.masVendidos.data.series[1].data = existencia;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const horasCargar = () => {
        if (valida(stats.horas.fecha)) {
            stats.cargando = 'Cargando estadisticas de ventas...';
            //definir la url para la consulta a la API
            var url = '/stats/estadistica_horas';
            url += '/' + parserServerDate(stats.horas.fecha.inicial);
            url += '/' + parserServerDate(stats.horas.fecha.final);
            //leer estadisticas de ventas
            statsApi(url).then(function (resp) {
                var horas = [];
                var cantidad = [];
                var monto = [];
                var keys = Object.keys(resp);
                for (var i = 0; i < keys.length; i++) {
                    var data = resp[keys[i]];
                    horas[i] = data.hora;
                    cantidad[i] = parseInt(data.cantidad);
                    monto[i] = parseFloat(data.monto);
                }
                const newStats = {...stats};
                newStats.horas.data.subtitle.text = parserClientDate(stats.horas.fecha.inicial) + ' a ' + parserClientDate(stats.horas.fecha.final)
                newStats.horas.data.xAxis.categories = horas;
                newStats.horas.data.series[0].data = monto;
                newStats.horas.data.series[1].data = cantidad;
                newStats.cargando = '';
                setStats(newStats);
            })
            /*.error(function(data,status){
            if(status===403){
                estadisticas.logout();
            }
            swal("Error", data.error, "error");
            estadisticas.cargando = '';
        });*/
        }
    }

    const parserServerDate = (date) => {
        return formatDate(date, DATE_FORMAT.ONLY_DATE);
    }

    const valida = (node) => {
        if (!node) return;
        let v = false;
        if (node.inicial <= node.final) {
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
            if (dates.length === 1) {
                s[node] = {...stats[node], fecha: {...stats[node].fecha, inicial: dates[0]}}
            } else {
                s[node] = {...stats[node], fecha: {...stats[node].fecha, inicial: dates[0], final: dates[1]}}
            }
            setStats(s);
        }
    }

    const onChangeUser = (user, node) => {
        if (user && user.value) {
            const s = {...stats}
            s[node] = {...stats[node], opciones: {...stats[node].opciones, usuario: user.value}}
            setStats(s);
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
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off">
                <Card className="mb-2">
                    <CardBody>
                        <Row id="ventas">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Total de ventas</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="ventas_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "ventas")}
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Mostrar por</Label>
                                    <FieldSelect
                                        name="ventas_grupo"
                                        options={showByList}
                                        defaultValue={showByList.length > 0 ? showByList[0] : null}
                                        onChange={(data) => onChangeGrupo(data, "ventas")}
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Usuarios</Label>
                                    <FieldSelect
                                        name="ventas_users"
                                        options={stats.usuarios}
                                        defaultValue={stats.usuarios.length > 0 ? stats.usuarios[0] : null}
                                        onChange={(data) => onChangeUser(data, "ventas")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventas.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="ventasEstado">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Ventas por departamento</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="ventasEstado_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "ventasEstado")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventasEstado.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="ventasOrigen">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Ventas por origen</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="ventasOrigen_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "ventasOrigen")}
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Mostrar por</Label>
                                    <FieldSelect
                                        name="ventasOrigen_grupo"
                                        options={showByList}
                                        defaultValue={showByList.length > 0 ? showByList[0] : null}
                                        onChange={(data) => onChangeGrupo(data, "ventasOrigen")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventasOrigen.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="ventasWhatsapp">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Ventas por Whatsapp</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="ventasWhatsapp_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "ventasWhatsapp")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventasWhatsapp.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="ventasTipo">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Ventas por tipo</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="ventasTipo_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "ventasTipo")}
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
                                        onChange={(data) => onChangeGrupo(data, "ventasTipo")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.ventasTipo.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="masVendidos">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Productos más vendidos</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="masVendidos_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "masVendidos")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.masVendidos.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="horas">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Pedidos por hora</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="horas_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "horas")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.horas.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mb-2">
                    <CardBody>
                        <Row id="reincidencias">
                            <Col md={12}>
                                <h4 className="card-title text-info"> Reincidencias</h4>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <Label>Fecha</Label>
                                    <FieldDate
                                        name="reincidencias_dates"
                                        mode={DATE_MODES.RANGE}
                                        defaultValue={defaultDates}
                                        onChange={(dates) => onChangeDate(dates, "reincidencias")}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <HighChartsWrapper options={stats.reincidencias.data}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </AvForm>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {users} = state.User
    return {users}
}

const mapDispatchToProps = dispatch => ({
    onGenerateReport: (data) => dispatch(generateReport(REPORT_TYPES.CONCILIATION, data)),
    onGetUsers: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getUsers(conditional, limit, page)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Stats)
)

Stats.propTypes = {
    error: PropTypes.any,
}

