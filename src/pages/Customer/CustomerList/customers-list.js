import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Card, CardBody, Col, Row } from "reactstrap"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import customerListColumns from "./customerListColumn"
import { isEmpty } from "lodash"
import { Link } from "react-router-dom"
import {getCustomers} from "../../../store/customer/actions";

const CustomersList = props => {
    const { customers, onGetCustomers } = props
    const [customerList, setCustomerList] = useState([])
    const pageOptions = {
        sizePerPage: 10,
        totalSize: 30, // replace later with size(users),
        custom: true,
    }
    const { SearchBar } = Search

    useEffect(() => {
        onGetCustomers()
    }, [onGetCustomers])

    useEffect(() => {
        if (!isEmpty(customers)) {
            setCustomerList(customers)
        }
    }, [customers])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, { page, searchText }) => {
        setCustomerList(
            customers.filter(user =>
                Object.keys(user).some(
                    key =>
                        typeof user[key] === "string" &&
                        user[key].toLowerCase().includes(searchText.toLowerCase())
                )
            )
        )
    }

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };

    return (
        <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                        pagination={paginationFactory(pageOptions)}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                                keyField="id"
                                                data={customerList || []}
                                                columns={customerListColumns()}
                                                bootstrap4
                                                search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>
                                                        <Row className="row mb-2">

                                                            <Col md={6}>
                                                                <div className="form-inline mb-3">
                                                                    <div className="search-box ms-2">
                                                                        <div className="position-relative">
                                                                            <SearchBar {...toolkitProps.searchProps} />
                                                                            <i className="mdi mdi-magnify search-icon"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className="mb-3 float-md-end">
                                                                    <Link to={"/customer"} className="btn btn-primary waves-effect waves-light text-light">
                                                                        <i className="mdi mdi-plus"></i><i className={"uil-users-alt me-2"} ></i> Nuevo
                                                                    </Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl="12">
                                                                <div className="table-responsive mb-4">
                                                                    <BootstrapTable
                                                                        selectRow={selectRowProp}
                                                                        responsive
                                                                        remote
                                                                        bordered={false}
                                                                        striped={false}
                                                                        classes={
                                                                            "table table-centered table-nowrap mb-0"
                                                                        }
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
    const { customers } = state.Customer
    return { customers }
}

const mapDispatchToProps = dispatch => ({
    onGetCustomers: () => dispatch(getCustomers()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersList)
