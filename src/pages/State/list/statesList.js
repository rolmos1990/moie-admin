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
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import {deleteState, getStates} from "../../../store/location/actions";
import statesColumns from "./statesColumn";
import {TableFilter} from "../../../components/TableFilter";
import {normalizeColumnsList} from "../../../common/converters";
import NoDataIndication from "../../../components/Common/NoDataIndication";

const StatesList = props => {
    const {states, meta, onGetStates, onDeleteState, loading, refresh} = props;
    const [statesList, setStatesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);


    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    }
    const {SearchBar} = Search

    useEffect(() => {
        onGetStates();
    }, [refresh])

    useEffect(() => {
        onGetStates()
    }, [onGetStates])

    useEffect(() => {
        setStatesList(states)
    }, [states])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetStates(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetStates(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        onDeleteState(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '??Seguro desea eliminar el Estado?',
            description: 'Usted est?? eliminado este Estado, una vez eliminado no podr?? ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };

    const columns = statesColumns(onDelete);

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };

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
                                                            <h4 className="text-info"><i className="uil-shopping-cart-alt me-2"></i> Estados</h4>
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
                                                            <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add" >
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}></i>
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <Link to={"/state"} className="btn btn-primary waves-effect waves-light text-light">
                                                            <i className="mdi mdi-plus"></i> Nuevo Estado
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

StatesList.propTypes = {
    states: PropTypes.array,
    onGetStates: PropTypes.func,
    onDeleteStates: PropTypes.func,
}

const mapStateToProps = state => {
    const {states, loading, meta, refresh} = state.Location
    return {states, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetStates: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getStates(conditional, limit, page)),
    onDeleteStates: (id) => dispatch(deleteState(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatesList)
