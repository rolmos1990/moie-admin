import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {Link} from "react-router-dom"
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {TableFilter} from "../../components/TableFilter";
import {normalizeColumnsList} from "../../common/converters";
import NoDataIndication from "../../components/Common/NoDataIndication";
import orderColumns from "./orderColumn";
import {Button, Tooltip} from "@material-ui/core";
import {doConciliation, doPrintBatchRequest, getOrders} from "../../store/order/actions";
import OrderEdit from "./orderEdit";
import Conditionals from "../../common/conditionals";

const OrderList = props => {
    const {orders, meta, onGetOrders, refresh, customActions, conditionals, showAsModal, reconciliation} = props;
    const [statesList, setStatesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [orderSelected, setOrderSelected] = useState(null);
    const [ordersSelected, setOrdersSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [filterable, setFilterable] = useState(true);
    const [conciliationView, setConciliationView] = useState(null);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    }

    useEffect(() => {
        if (null !== refresh) onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, currentPage * DEFAULT_PAGE_LIMIT);
    }, [refresh])

    useEffect(() => {
        if (null !== conciliationView) {
            onFilterAction(conditional);
        }
    }, [conciliationView])

    useEffect(() => {
        if (conciliationView && !reconciliation.loading && reconciliation.success) {
            setConciliationView(false);

        }
    }, [reconciliation])

    useEffect(() => {
        onGetOrders(getConditionals());
        if (customActions) {
            setFilterable(false);
        }
    }, [onGetOrders])

    useEffect(() => {
        setStatesList(orders)
        console.log('orders', orders)
    }, [orders])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        let p = page - 1;
        setCurrentPage(p);
        onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, p * DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        let conditionals = condition || [];
        handleConciliateStatus(conditionals);
        setConditional(conditionals);
        onGetOrders(conditionals, DEFAULT_PAGE_LIMIT, 0);
    }

    const printOrders = () => {
        let conditionals = conditional || [];

        if (ordersSelected && ordersSelected.length === 1) {
            conditionals.push({field: 'id', value: ordersSelected[0], operator: Conditionals.OPERATORS.EQUAL});
        }
        if (ordersSelected && ordersSelected.length > 1) {
            conditionals.push({field: 'id', value: ordersSelected.join('::'), operator: Conditionals.OPERATORS.IN});
        }

        props.onPrintBatchRequest(conditionals);
    }

    const handleConciliateStatus = (conditionals) => {
        let statusFiltered = conditionals.find(c => c.field === 'status');
        let statusToConciliate = 4;//Enviada --> 4
        if (conciliationView) {
            if (statusFiltered) {
                statusFiltered.value = statusToConciliate;
            } else {
                conditionals.push({field: 'status', value: statusToConciliate, operator: Conditionals.OPERATORS.EQUAL});
            }
        } else if (statusFiltered.value === statusToConciliate) {
            conditionals.splice(conditionals.indexOf(statusFiltered), 1);
        }
    }

    const showConciliationView = () => {
        setOrdersSelected([]);
        setConciliationView(true);
    }
    const hideConciliationView = () => {
        setOrdersSelected([]);
        setConciliationView(false);
    }

    const sendToConciliation = () => {
        props.onConciliation(ordersSelected, props.history);
    }

    const getConditionals = () => {
        const cond = conditional || [];
        const extConditions = conditionals || [];
        return [...cond, ...extConditions];
    }

    const columns = orderColumns(setOrderSelected, showAsModal);

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: (row) => {
            let list = [...ordersSelected]

            const index = list.indexOf(row.id);
            if(index >= 0){
                list.splice(index, 1);
            } else{
                list.push(row.id);
            }
            setOrdersSelected(list);
        },
        onSelectAll: (rows) => {
            setOrdersSelected([]);
        }
    };

    const onPressAction = () => {
        let conditionals = conditional || [];

        if (ordersSelected && ordersSelected.length === 1) {
            conditionals.push({field: 'id', value: ordersSelected[0], operator: Conditionals.OPERATORS.EQUAL});
        }
        if (ordersSelected && ordersSelected.length > 1) {
            conditionals.push({field: 'id', value: ordersSelected.join('::'), operator: Conditionals.OPERATORS.IN});
        }

        /** TODO -- envio la condicion para procesar en orden superior */
        props.customActions(conditionals);
    };

    return (
        <Row>
            <TableFilter
                onPressDisabled={() => setFilter(false)}
                isActive={filter && filterable}
                fields={columns}
                onSubmit={onFilterAction.bind(this)}/>

            <Col lg={filter && filterable ? "8" : "12"}>
                <Card>
                    <CardBody>
                        <PaginationProvider pagination={paginationFactory(pageOptions)}>
                            {({paginationProps, paginationTableProps}) => (
                                <ToolkitProvider
                                    keyField="id"
                                    data={statesList || []}
                                    columns={normalizeColumnsList(columns)}
                                    bootstrap4
                                    search
                                >
                                    {toolkitProps => (
                                        <React.Fragment>
                                            <Row className="row mb-2">
                                                <Col md={4}>
                                                    <div className="form-inline mb-3">
                                                        <div className="search-box ms-2">
                                                            <h4 className="text-info">
                                                                <i className="uil-shopping-cart-alt me-2"></i> {conciliationView ? 'Conciliar ' : ''} Pedidos
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                {customActions ? <Col md={8}>
                                                    <div className="mb-3 float-md-end">
                                                        <Tooltip placement="bottom" title="Aceptar" aria-label="add">
                                                            <Button onClick={() => onPressAction()} color="success">
                                                                <i className={"mdi mdi-check"}> </i> &nbsp; Aceptar
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </Col> : (
                                                    <Col md={8}>
                                                        <div className="mb-3 float-md-end">
                                                            {columns.some(s => s.filter) && (
                                                                <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                    <Button onClick={() => setFilter(!filter)}>
                                                                        <i className={"mdi mdi-filter"}> </i>
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                            {!conciliationView && (
                                                                <>
                                                                    <Tooltip placement="bottom" title="Impresión multiple" aria-label="add">
                                                                        <Button color="primary" onClick={() => printOrders()} disabled={ordersSelected.length === 0 && (!conditional || conditional.length === 0)}>
                                                                            <i className="mdi mdi-printer"> </i>
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip placement="bottom" title="Conciliar" aria-label="add">
                                                                        <Button color="primary" onClick={() => showConciliationView()}>
                                                                            <i className="mdi mdi-list-status"> </i> Conciliar
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Link to={"/orders/create"} className="btn btn-primary waves-effect waves-light text-light">
                                                                        <i className="mdi mdi-plus"> </i> Crear pedido
                                                                    </Link>
                                                                </>
                                                            )}

                                                            {conciliationView && (
                                                                <>
                                                                    <Tooltip placement="bottom" title="Aceptar" aria-label="add">
                                                                        <Button color="primary" onClick={() => sendToConciliation()} disabled={ordersSelected.length === 0}>
                                                                            {!reconciliation.loading && <i className="mdi mdi-check"> </i>}
                                                                            {reconciliation.loading && <i className="fa fa-spinner fa-spin"> </i>}
                                                                            Aceptar
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip placement="bottom" title="Cancelar" aria-label="add">
                                                                        <Button color="default" onClick={() => hideConciliationView(false)}>
                                                                            Cancelar
                                                                        </Button>
                                                                    </Tooltip>
                                                                </>
                                                            )}
                                                        </div>
                                                    </Col>
                                                )}
                                            </Row>
                                            <Row>
                                                <Col xl="12">
                                                    <div className="table-responsive mb-4">
                                                        <BootstrapTable
                                                            selectRow={selectRowProp}
                                                            remote
                                                            responsive
                                                            loading={true}
                                                            bordered={false}
                                                            striped={true}
                                                            classes={
                                                                "table table-centered table-nowrap mb-0"
                                                            }
                                                            noDataIndication={() => <NoDataIndication/>}
                                                            {...toolkitProps.baseProps}
                                                            onTableChange={handleTableChange}
                                                            {...paginationTableProps}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="float-sm-start">
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
            {orderSelected && (<OrderEdit orderId={orderSelected} showOrderOverlay={true} onCloseOverlay={() => setOrderSelected(null)}/>)}
        </Row>
    )
}

OrderList.propTypes = {
    states: PropTypes.array,
    onGetStates: PropTypes.func,
    onDeleteStates: PropTypes.func,
}

const mapStateToProps = state => {
    const {orders, loading, meta, refresh, conciliation} = state.Order
    return {
        orders,
        loading,
        meta,
        refresh,
        conciliation
    }
}

const mapDispatchToProps = dispatch => ({
    onGetOrders: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getOrders(conditional, limit, page)),
    onPrintBatchRequest: (conditional) => dispatch(doPrintBatchRequest(conditional)),
    onConciliation: (ordersSelected) => dispatch(doConciliation(ordersSelected)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)
