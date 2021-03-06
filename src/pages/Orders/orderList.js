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
import {doPrintBatchRequest, getOrders} from "../../store/order/actions";
import OrderEdit from "./orderEdit";
import Conditionals from "../../common/conditionals";

const OrderList = props => {
    const {orders, meta, onGetOrders, loading, refresh, customActions, conditionals, showAsModal} = props;
    const [statesList, setStatesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [orderSelected, setOrderSelected] = useState(null);
    const [printOrderIds, setPrintOrderIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [filterable, setFilterable] = useState(true);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    }

    useEffect(() => {
        if(null !== refresh) onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, currentPage * DEFAULT_PAGE_LIMIT);
    }, [refresh])

    useEffect(() => {
        onGetOrders(getConditionals());
        if(customActions){
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
        setConditional(condition);
        onGetOrders(condition, DEFAULT_PAGE_LIMIT, 0);
    }

    const printOrders = () => {
        let conditionals = conditional || [];

        if(printOrderIds && printOrderIds.length === 1){
            conditionals.push({field:'id', value:printOrderIds[0], operator: Conditionals.OPERATORS.EQUAL});
        }
        if(printOrderIds && printOrderIds.length > 1){
            conditionals.push({field:'id', value:printOrderIds.join('::'), operator: Conditionals.OPERATORS.IN});
        }

        props.onPrintBatchRequest(conditionals);
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
            let list = [...printOrderIds]

            const index = list.indexOf(row.id);
            if(index >= 0){
                list.splice(index, 1);
            } else{
                list.push(row.id);
            }
            setPrintOrderIds(list);
        },
        onSelectAll: (rows) => {
            setPrintOrderIds([]);
        }
    };

    const onPressAction = () => {
        let conditionals = conditional || [];

        if(printOrderIds && printOrderIds.length === 1){
            conditionals.push({field:'id', value:printOrderIds[0], operator: Conditionals.OPERATORS.EQUAL});
        }
        if(printOrderIds && printOrderIds.length > 1){
            conditionals.push({field:'id', value:printOrderIds.join('::'), operator: Conditionals.OPERATORS.IN});
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
                                                <Col md={6}>
                                                    <div className="form-inline mb-3">
                                                        <div className="search-box ms-2">
                                                            <h4 className="text-info"><i className="uil-shopping-cart-alt me-2"></i> Pedidos</h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                {customActions ? <Col md={6}>
                                                    <div className="mb-3 float-md-end">
                                                        <Tooltip placement="bottom" title="Aceptar" aria-label="add">
                                                            <Button onClick={() => onPressAction() } color="success">
                                                                <i className={"mdi mdi-check"}> </i> &nbsp; Aceptar
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </Col> : (
                                                    <Col md={6}>
                                                        <div className="mb-3 float-md-end">
                                                            {columns.some(s => s.filter) && (
                                                                <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                    <Button onClick={() => setFilter(!filter)}>
                                                                        <i className={"mdi mdi-filter"}> </i>
                                                                    </Button>
                                                                </Tooltip>
                                                            )}
                                                            <Tooltip placement="bottom" title="Impresi??n multiple" aria-label="add">
                                                                <Button color="primary" onClick={() => printOrders()} disabled={printOrderIds.length === 0 && (!conditional || conditional.length === 0)}>
                                                                    <i className="mdi mdi-printer"> </i>
                                                                </Button>
                                                            </Tooltip>

                                                            <Link to={"/orders/create"} className="btn btn-primary waves-effect waves-light text-light">
                                                                <i className="mdi mdi-plus"> </i> Crear pedido
                                                            </Link>
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
    const {orders, loading, meta, refresh} = state.Order
    return {orders, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetOrders: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getOrders(conditional, limit, page)),
    onPrintBatchRequest: (conditional ) => dispatch(doPrintBatchRequest(conditional)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)
