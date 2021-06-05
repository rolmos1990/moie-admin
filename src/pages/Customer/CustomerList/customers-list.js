import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import customerColumn from "./customerColumn"
import {Link} from "react-router-dom"
import {deleteCustomer, getCustomers} from "../../../store/customer/actions";
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import {normalizeColumnsList} from "../../../common/converters";
import {TableFilter} from "../../../components/TableFilter";
import {countCustomersByStatus, statsCustomerRegistered, statsCustomerRegisteredToday} from "../../../helpers/service";
import StatsStatusCard from "../../../components/Common/StatsStatusCard";
import StatsRegisteredCard from "../../../components/Common/StatsRegisteredCard";

const CustomersList = props => {
    const {customers, meta, onGetCustomers, onDeleteCustomer,  refresh, countCustomersByStatus, statsCustomerRegistered, statsCustomerRegisteredToday} = props;
    const [customerList, setCustomerList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    }

    useEffect(() => {
        onGetCustomers();
    }, [refresh])

    useEffect(() => {
        onGetCustomers()
    }, [onGetCustomers])

    useEffect(() => {
        setCustomerList(customers)
    }, [customers])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetCustomers(conditional, DEFAULT_PAGE_LIMIT, (page - 1) * DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetCustomers(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        onDeleteCustomer(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar Cliente?',
            description: 'Usted está eliminado este cliente, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };

    const columns = customerColumn(onDelete);

    return (
        <>
            <Row className="text-center">
                <Col md={4}>
                    <StatsStatusCard title="Clientes" getData={countCustomersByStatus}/>
                </Col>
                <Col md={4}>
                    <StatsRegisteredCard title="Clientes Registrados esta semana" getData={statsCustomerRegistered} getDataToday={statsCustomerRegisteredToday}/>
                </Col>
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
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                            >
                                {({paginationProps, paginationTableProps}) => (
                                    <ToolkitProvider
                                        keyField="id"
                                        data={customerList || []}
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
                                                                {/* {!filter && (
                                                                            <div className="position-relative">
                                                                                <SearchBar {...toolkitProps.searchProps}/>
                                                                                <i className="mdi mdi-magnify search-icon"></i>
                                                                            </div>
                                                                        )}*/}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="mb-3 float-md-end">
                                                            <Tooltip
                                                                placement="bottom"
                                                                title="Filtros Avanzados" aria-label="add"
                                                            >
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}></i></Button>
                                                            </Tooltip>
                                                            <Link to={"/customer"} className="btn btn-primary waves-effect waves-light text-light">
                                                                <i className="mdi mdi-plus"></i> Nuevo Cliente
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
                                                                {...toolkitProps.baseProps}
                                                                onTableChange={handleTableChange}
                                                                {...paginationTableProps}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="float-sm-start">
                                                    <PaginationListStandalone {...paginationProps}/>
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

CustomersList.propTypes = {
    customers: PropTypes.array,
    onGetCustomers: PropTypes.func,
}

const mapStateToProps = state => {
    const {customers, loading, meta, refresh, custom} = state.Customer
    return {customData: custom, customers, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    countCustomersByStatus,
    statsCustomerRegistered,
    statsCustomerRegisteredToday,
    onGetCustomers: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getCustomers(conditional, limit, page)),
    onDeleteCustomer: (id) => dispatch(deleteCustomer(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersList)
