import {Card, CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {connect} from "react-redux";
import {getProducts} from "../../../store/product/actions";
import React, {useEffect, useState} from "react";
import {TableFilter} from "../../../components/TableFilter";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import {normalizeColumnsList} from "../../../common/converters";
import {Button, Tooltip} from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import productColumns from "./productColumn";
import WidgetCard from "../../../components/Common/WidgetCard";

const ProductList = props => {

    const {refresh, onGetProducts, products, meta} = props;
    const [productList, setProductList] = useState([]);
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters || 0,
        custom: true,
    };

    useEffect(() => {
        onGetProducts();
    }, [refresh])

    useEffect(() => {
        onGetProducts()
    }, [onGetProducts])

    useEffect(() => {
        setProductList(products)
    }, [products])

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetProducts(condition, DEFAULT_PAGE_LIMIT, 0);
    }

    const handleTableChange = (type, {page, searchText}) => {
        onGetProducts(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }


    const columns = productColumns();

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

    const reports = [
        {
            id: 1,
            icon: "mdi mdi-clock-five-time",
            title: "Productos",
            value: pageOptions.totalSize,
            prefix: "",
            suffix: "",
            decimal: 0,
            charttype: "bar",
            chartheight: 40,
            chartwidth: 70,
            badgeValue: parseInt(pageOptions.totalSize * 0.86),
            color: "success",
            desc: "activos",
            badgeValue2: parseInt(pageOptions.totalSize * 0.14),
            color2: "danger",
            desc2: "inactivos",
            series: series1,
            options: options1,
        },
        {
            id: 2,
            icon: "mdi mdi-arrow-up-bold",
            title: "Productos publicados",
            value: parseInt(pageOptions.totalSize * 0.67),
            decimal: 0,
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            prefix: "",
            suffix: "",
            badgeValue: "0.2%",
            color: "success",
            desc: "desde ayer",
            series: series2,
            options: options2,
        },
        {
            id: 3,
            icon: "mdi mdi-arrow-up-bold",
            title: "Agregados en esta semana",
            value: 265,
            decimal: 0,
            prefix: "",
            suffix: "",
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            badgeValue: "0.24%",
            color: "success",
            desc: "desde hace una semana",
            series: series3,
            options: options3,
        },
    ];

    return (
        <>
            <Row className="text-center">
                {reports.map((report, key) => (
                    <Col md={4} key={key}>
                        <WidgetCard report={report}/>
                    </Col>
                ))}
            </Row>
            <Row>
                <TableFilter
                    onPressDisabled={() => setFilter(false)}
                    isActive={filter}
                    fields={columns}
                    onSubmit={onFilterAction.bind(this)}/>

                <Col lg={filter ? "8" : "12"}>
                    <Card>
                        <CardBody>
                            <PaginationProvider pagination={paginationFactory(pageOptions)}>
                                {({paginationProps, paginationTableProps}) => (
                                    <ToolkitProvider
                                        keyField="id"
                                        data={productList || []}
                                        columns={normalizeColumnsList(columns)}
                                        bootstrap4
                                        search
                                    >
                                        {toolkitProps => (
                                            <React.Fragment>

                                                <Row className="row mb-2">
                                                    <Col md={6}>
                                                        <div className="form-inline mb-3">
                                                            <div className="search-box ms-2">
                                                                {/*{!filter && (
                                                                <div className="position-relative">
                                                                    <SearchBar {...toolkitProps.searchProps}/>
                                                                    <i className="mdi mdi-magnify search-icon"> </i>
                                                                </div>
                                                            )}*/}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="mb-3 float-md-end">
                                                            {columns.some(s => s.filter) && (
                                                                <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                    <Button onClick={() => setFilter(!filter)}>
                                                                        <i className={"mdi mdi-filter"}> </i>
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                            <Link to={"/product"} className="btn btn-primary waves-effect waves-light text-light">
                                                                <i className="mdi mdi-plus"> </i> Nuevo Producto
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl="12">
                                                        <div className="table-responsive mb-4">
                                                            <BootstrapTable
                                                                remote
                                                                responsive
                                                                loading={true}
                                                                bordered={false}
                                                                striped={true}
                                                                classes={"table table-centered table-nowrap mb-0"}
                                                                noDataIndication={() => <NoDataIndication/>}
                                                                onTableChange={handleTableChange}
                                                                {...toolkitProps.baseProps}
                                                                {...paginationTableProps}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="float-sm-end">
                                                    <PaginationListStandalone {...paginationProps} />
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </ToolkitProvider>
                                )}
                            </PaginationProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

ProductList.propTypes = {
    onGetProducts: PropTypes.func,
    products: PropTypes.array,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    refresh: PropTypes.bool,
}

const mapStateToProps = state => {
    const {products, loading, meta, refresh} = state.Product
    return {products, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetProducts: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getProducts(conditional, limit, page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
