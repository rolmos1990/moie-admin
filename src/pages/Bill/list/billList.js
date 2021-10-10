import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import {getBills, registerBill} from "../../../store/bill/actions";
import {TableFilter} from "../../../components/TableFilter";
import billColumns from "./billColumns";
import {normalizeColumnsList} from "../../../common/converters";
import Conditionals from "../../../common/conditionals";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import CustomModal from "../../../components/Modal/CommosModal";
import OrderList from "../../Orders/orderList";
import BillGenerateReportForm from "../../Reports/BillsReportForm";

const BillList = props => {
    const {states, bills, meta, getStates, onGetBills, loading, refresh} = props; //onDeleteBill,
    const [billList, setBillList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [openOrdersModal, setOpenOrdersModal] = useState(false);
    const [orderListConditions, setOrderListConditions] = useState([]);
    const [openReportModal, setOpenReportModal] = useState(false);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        custom: true,
    }
    useEffect(() => {
        onGetBills();
    }, [refresh])

    useEffect(() => {
        onGetBills()
        //getStates();
    }, [onGetBills])

    useEffect(() => {
        setBillList(bills);
    }, [bills])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetBills(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetBills(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        //onDeleteBill(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar el Municipio?',
            description: 'Usted está eliminado este Municipio, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };
    const columns = billColumns(onDelete);

    const addOrders = () => {
        const conditions = new Conditionals.Condition;
        // conditions.add("status", 4, Conditionals.OPERATORS.EQUAL);//Enviada
        conditions.add('office', '', Conditionals.OPERATORS.NOT_NULL);
        console.log('conditions', conditions);
        setOrderListConditions(conditions.condition);
        setOpenOrdersModal(true);
    };

    const onCloseModal = () => {
        setOpenOrdersModal(false);
    };
    const onAcceptModal = (conditionals) => {
        console.log('conditionals', conditionals)
        if (conditionals && conditionals.length > 0) {
            const value = conditionals[0].value;
            const ids = value.split ? value.split('::') : [value];
            props.onCreateBill({ids: ids});
        }
        setOpenOrdersModal(false);
    };

    return (
        <>
            <CustomModal title={"Agregar pedidos"} size="lg" showFooter={false} isOpen={openOrdersModal} onClose={onCloseModal}>
                <OrderList customActions={onAcceptModal} showAsModal={true} conditionals={orderListConditions}/>
            </CustomModal>
            <CustomModal title={"Generar Reporte"} showFooter={false} isOpen={openReportModal} onClose={() => setOpenReportModal(false)}>
                <BillGenerateReportForm onCloseModal={(reload) => setOpenReportModal(false)}/>
            </CustomModal>
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
                                        data={billList || []}
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
                                                                <h4 className="text-info"><i className="uil-bill me-2"></i> Facturas</h4>
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
                                                            <Tooltip placement="bottom" title="Generar reporte" aria-label="add">
                                                                <Button onClick={() => setOpenReportModal(true)}>
                                                                    <i className="mdi mdi-file"> </i>
                                                                </Button>
                                                            </Tooltip>
                                                            <Button color="primary" className="btn-sm btn-rounded waves-effect waves-light" onClick={addOrders}>
                                                                <i className="mdi mdi-plus"> </i> Generar Factura
                                                            </Button>
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
        </>

    )
}

BillList.propTypes = {
    states: PropTypes.array,
    onGetBills: PropTypes.func,
    //onDeleteBill: PropTypes.func,
}

const mapStateToProps = state => {
    const {states, bills, loading, meta, refresh} = state.Bill
    return {states, bills, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetBills: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getBills(conditional, limit, page)),
    onCreateBill: (ids) => dispatch(registerBill(ids)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillList)