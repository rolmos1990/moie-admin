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
import postSaleColumns from "./postSaleColumn";
import {Button, Tooltip} from "@material-ui/core";
import {doPrintBatchRequest, getOrders} from "../../store/order/actions";
import Conditionals from "../../common/conditionals";
import Images from "../../components/Common/Image";
import DropZoneIcon from "../../components/Common/DropZoneIcon";
import {importFile} from "../../store/office/actions";
import CustomerForm from "../CustomerEdit/CustomerForm";
import CustomModal from "../../components/Modal/CommosModal";
import PostSaleImportFileForm from "./PostSaleImportFileForm";

const PostSaleList = props => {
    const {orders, meta, onGetOrders, loading, refresh, customActions} = props;
    const [statesList, setStatesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [openImportFileModal, setOpenImportFileModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(null);
    const [filterable, setFilterable] = useState(true);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    }

    useEffect(() => {
        if (null !== refresh) onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, currentPage * DEFAULT_PAGE_LIMIT);
    }, [refresh])

    useEffect(() => {
        onGetOrders(getConditionals());
        if (customActions) {
            setFilterable(false);
        }
    }, [onGetOrders])

    useEffect(() => {
        setStatesList(orders)
    }, [orders])

    const handleTableChange = (type, {page, searchText}) => {
        let p = page - 1;
        setCurrentPage(p);
        onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, p * DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetOrders(getConditionals(condition), DEFAULT_PAGE_LIMIT, 0);
    }

    const handleImportFile = (reload) => {
        setOpenImportFileModal(false);
        if(reload) onGetOrders(getConditionals(), DEFAULT_PAGE_LIMIT, currentPage * DEFAULT_PAGE_LIMIT);
    }

    const getConditionals = (condition) => {
        const cond = conditional || [];
        if(!condition){
            condition = [];
        }
        // cond.push({field:'orderDelivery.tracking', value:'', operator: Conditionals.OPERATORS.NOT_NULL});
        return [...cond, ...condition];
    }

    const columns = postSaleColumns();

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
                                                            <h4 className="text-info"><i className="uil-shopping-cart-alt me-2"></i> Post Venta</h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3 float-md-end d-flex">
                                                        {columns.some(s => s.filter) && (
                                                            <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}> </i>
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <Tooltip placement="bottom" title="Importar archivo" aria-label="add">
                                                            <Button onClick={() => setOpenImportFileModal(true)}>
                                                                <i className={"mdi mdi-file-excel"}> </i>
                                                            </Button>
                                                        </Tooltip>

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
            <CustomModal title={"Importar"} showFooter={false} isOpen={openImportFileModal} onClose={()=> setOpenImportFileModal(false)}>
                <PostSaleImportFileForm onCloseModal={(reload) => handleImportFile(reload)}/>
            </CustomModal>
        </Row>
    )
}

PostSaleList.propTypes = {
    states: PropTypes.array,
    onGetStates: PropTypes.func,
    onDeleteStates: PropTypes.func,
}

const mapStateToProps = state => {
    const {orders, loading, meta, refresh} = state.Order
    return {orders, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onImportFile: (data) => dispatch(importFile(data)),
    onGetOrders: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getOrders(conditional, limit, page)),
    onPrintBatchRequest: (conditional) => dispatch(doPrintBatchRequest(conditional)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostSaleList)
