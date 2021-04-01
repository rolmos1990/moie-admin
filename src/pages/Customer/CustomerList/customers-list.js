import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {Card, CardBody, Col, Row, Spinner} from "reactstrap"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import customerListColumns from "./customerListColumn"
import { isEmpty } from "lodash"
import { Link } from "react-router-dom"
import {deleteCustomer, getCustomers} from "../../../store/customer/actions";
import {CustomerFilter} from "../CustomerFilter";
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModal, ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";

const CustomersList = props => {
    const { customers, meta, onGetCustomers, onDeleteCustomer, loading, refresh } = props;
    const [openmodal, setOpenmodal] = useState(true);
    const [customerList, setCustomerList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta.totalRegisters, // replace later with size(users),
        custom: true,
    }
    const { SearchBar } = Search

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
    const handleTableChange = (type, { page, searchText }) => {
        onGetCustomers(conditional, DEFAULT_PAGE_LIMIT, page - 1);
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

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };

    const NoDataIndication = () => (
        <div className="spinner">
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
            <div className="rect5" />
        </div>
    );

    return (
        <Row>
                        <CustomerFilter
                            onPressDisabled={() => setFilter(false)}
                            isActive={filter}
                            onSubmit={onFilterAction.bind(this)}/>
                        <Col lg={filter ? "8": "12"}>
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                        pagination={paginationFactory(pageOptions)}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                                keyField="id"
                                                data={customerList || []}
                                                columns={customerListColumns(onDelete.bind(this))}
                                                bootstrap4
                                                search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>
                                                        <Row className="row mb-2">
                                                            <Col md={6}>
                                                                <div className="form-inline mb-3">
                                                                    <div className="search-box ms-2">
                                                                        {!filter && (
                                                                            <div className="position-relative">
                                                                                <SearchBar {...toolkitProps.searchProps}/>
                                                                                <i className="mdi mdi-magnify search-icon"></i>
                                                                            </div>
                                                                        )}
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
                                                                        selectRow={selectRowProp}
                                                                        remote
                                                                        responsive
                                                                        loading={true}
                                                                        bordered={false}
                                                                        striped={true}
                                                                        classes={
                                                                            "table table-centered table-nowrap mb-0"
                                                                        }
                                                                        noDataIndication={ () => <NoDataIndication /> }
                                                                        {...toolkitProps.baseProps}
                                                                        onTableChange={handleTableChange}
                                                                        {...paginationTableProps}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="float-sm-end">
                                                            <PaginationListStandalone
                                                                {...paginationProps}
                                                            />
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

CustomersList.propTypes = {
    customers: PropTypes.array,
    onGetCustomers: PropTypes.func,
}

const mapStateToProps = state => {
    const { customers, loading, meta, refresh } = state.Customer
    return { customers, loading, meta, refresh }
}

const mapDispatchToProps = dispatch => ({
    onGetCustomers: (conditional = null, limit= DEFAULT_PAGE_LIMIT, page) => dispatch(getCustomers(conditional, limit, page)),
    onDeleteCustomer: (id) => dispatch(deleteCustomer(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersList)