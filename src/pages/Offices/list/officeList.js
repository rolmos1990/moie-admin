import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row, Spinner} from "reactstrap"
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {Link} from "react-router-dom"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModal, ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import {getOffices} from "../../../store/office/actions";
import {TableFilter} from "../../../components/TableFilter";
import officeColumns from "./officeColumns";
import {normalizeColumnsList, statesToOptions} from "../../../common/converters";

const OfficeList = props => {
    const {states, offices, meta, getStates, onGetOffices, loading, refresh} = props; //onDeleteOffice,
    const [officeList, setOfficeList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        custom: true,
    }
    const {SearchBar} = Search

    useEffect(() => {
        onGetOffices();
    }, [refresh])

    useEffect(() => {
        onGetOffices()
        //getStates();
    }, [onGetOffices])

    useEffect(() => {
        setOfficeList(offices);
    }, [offices])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetOffices(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetOffices(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        //onDeleteOffice(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar el Municipio?',
            description: 'Usted está eliminado este Municipio, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };
    const columns = officeColumns(onDelete);

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };

    const NoDataIndication = () => (
        <div className="spinner">
            <div className="rect1"/>
            <div className="rect2"/>
            <div className="rect3"/>
            <div className="rect4"/>
            <div className="rect5"/>
        </div>
    );

    return (
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
                                    data={officeList || []}
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
                                                            <h4 className="text-info"><i className="uil-truck me-2"></i> Despachos</h4>
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
                                                        <Link to={"/office"} className="btn btn-primary waves-effect waves-light text-light">
                                                            <i className="mdi mdi-plus"> </i> Generar Despacho
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

OfficeList.propTypes = {
    states: PropTypes.array,
    onGetOffices: PropTypes.func,
    //onDeleteOffice: PropTypes.func,
}

const mapStateToProps = state => {
    const {states, offices, loading, meta, refresh} = state.Office
    return {states, offices, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    //getStates,
    onGetOffices: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getOffices(conditional, limit, page)),
    //onDeleteOffice: (id) => dispatch(deleteOffice(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OfficeList)
