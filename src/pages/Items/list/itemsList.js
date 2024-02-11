import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {Link} from "react-router-dom"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {getItems, getWallets, resetItem, resetWallet} from "../../../store/items/actions";
import itemsColumns from "./itemsColumn";
import {TableFilter} from "../../../components/TableFilter";
import {normalizeColumnsList} from "../../../common/converters";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import HasPermissions from "../../../components/HasPermissions";
import {PERMISSIONS} from "../../../helpers/security_rol";
import NoAccess from "../../../components/Common/NoAccess";
//import {itemsStatsApi} from "../../../helpers/backend_helper";
import CountUp from "react-countup";

const ItemsList = props => {
    const {items, meta, onGetItems, onResetitems, loading, refresh} = props;
    const [itemsList, setWalletsList] = useState([])
    const [itemsStats, setWalletStats] = useState({})
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [defaultPage, setDefaultPage] = useState(1);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
        page: defaultPage,
        onPageChange: (page, sizePerPage) => {
            setDefaultPage(page);
        },
    }
    const {SearchBar} = Search

    useEffect(() => {
        if(refresh === null){
            onResetitems();
            onGetItems()
        } else {
            onGetItems();
        }
    }, [refresh, onGetItems])

    useEffect(() => {
        setWalletsList(items)
        loadStats();
    }, [items])

    const loadStats = () => {
        //itemsStatsApi().then(function (resp) {
        //    setWalletStats(resp.items);
        //});
    }

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetItems(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetItems(condition, DEFAULT_PAGE_LIMIT, 0);
        setDefaultPage(1);
    }

    const columns = itemsColumns();

    return (
        <Row>
            {/*{itemsStats.fechaUltimoMovimiento && (
                <Row>
                    <Col md={4}>
                        <Card>
                            <CardBody>
                                <div className="float-end mt-2">
                                    <Tooltip placement="bottom" title="Saldo inicio de mes" aria-label="add">
                                        <i className="mdi mdi-scale-balance font-size-24 mr-1 text-primary p-3"> </i>
                                    </Tooltip>
                                </div>
                                <div>
                                    <h4 className="mb-1 mt-2">
                                        <CountUp end={itemsStats.inicioMes} separator="," decimals={0}/>
                                    </h4>
                                    <p className="text-muted mb-0">{"Saldo Inicio de Mes"}</p>
                                </div>
                                <p className="text-muted mb-0 mt-3">
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <CardBody>
                                <div className="float-end mt-2">
                                    <Tooltip placement="bottom" title="Fecha último movimiento" aria-label="add">
                                        <i className="mdi mdi-sort-calendar-ascending font-size-24 mr-1 text-muted p-3"> </i>
                                    </Tooltip>
                                </div>
                                <div>
                                    <h4 className="mb-1 mt-2">
                                        {itemsStats.fechaUltimoMovimiento}
                                    </h4>
                                    <p className="text-muted mb-0">{"Fecha último movimiento"}</p>
                                </div>
                                <p className="text-muted mb-0 mt-3">
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <CardBody>
                                <div className="float-end mt-2">
                                    <Tooltip placement="bottom" title="Saldo" aria-label="add">
                                        <i className="mdi mdi-currency-usd font-size-24 mr-1 text-muted p-3"> </i>
                                    </Tooltip>
                                </div>
                                <div>
                                    <h4 className="mb-1 mt-2">
                                        <CountUp end={itemsStats.saldo} separator="," decimals={0}/>
                                    </h4>
                                    <p className="text-muted mb-0">{"Saldo"}</p>
                                </div>
                                <p className="text-muted mb-0 mt-3">
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}*/}
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
                                    data={itemsList || []}
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
                                                            <h4 className="text-info"><i className="uil-shopping-cart-alt me-2"></i> Items</h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3 float-md-end">
                                                        {columns.some(s => s.filter) && (
                                                            <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}></i>
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <HasPermissions permissions={[PERMISSIONS.ITEMS_CREATE]} renderNoAccess={() => <NoAccess/>}>
                                                            <Link to={"/item"} className="btn btn-primary waves-effect waves-light text-light">
                                                                <i className="mdi mdi-plus"></i> Nuevo registro
                                                            </Link>
                                                        </HasPermissions>
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
        </Row>
    )
}

ItemsList.propTypes = {
    items: PropTypes.array,
    onGetItems: PropTypes.func,
    onDeleteWallets: PropTypes.func,
}

const mapWalletToProps = state => {
    const {items, loading, meta, refresh} = state.Item
    return {items, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onResetitems: () => {
        dispatch(resetItem());
    },
    onGetItems: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getItems(conditional, limit, page))
})

export default connect(
    mapWalletToProps,
    mapDispatchToProps
)(ItemsList)
