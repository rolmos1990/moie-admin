import React, {useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Card, Tooltip} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {addOrderOffice, confirmOffice, deleteOffice, getOffice, printOfficeReport, registerOffice, resetPrintOfficeReport, updateOffice} from "../../store/office/actions";
import {FieldDate, FieldSelect, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {DATE_FORMAT, formatDate, printPartOfPage} from "../../common/utils";
import {DELIVERY_METHODS, DELIVERY_TYPES, GROUPS, OFFICE_STATUS, STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import {DATE_MODES} from "../../components/Fields/InputDate";
import {getEmptyOptions} from "../../common/converters";
import {getDeliveryMethods, getOrdersByOffice} from "../../store/order/actions";
import {getFieldOptionByGroups} from "../../store/fieldOptions/actions";
import {StatusField} from "../../components/StatusField";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import CustomModal from "../../components/Modal/CommosModal";
import OrderList from "../Orders/orderList";
import Conditionals from "../../common/conditionals";
import {fileOfficeTemplate} from "../../helpers/backend_helper";

const OfficeEdit = (props) => {
    const {getOffice, office, deliveryMethods, orders, printReportData} = props;
    const [officeData, setOfficeData] = useState({_status: STATUS.ACTIVE});
    const isEdit = props.match.params.id;
    const [orderListConditions, setOrderListConditions] = useState([]);
    const [deliveryMethodList, setDeliveryMethodList] = useState([]);
    const [deliveryTypes, setDeliveryTypes] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [deliveryType, setDeliveryType] = useState(null);
    const [openOrdersModal, setOpenOrdersModal] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [reportBody, setReportBody] = useState(null);


    //carga inicial
    useEffect(() => {
        setDeliveryTypes([getEmptyOptions(), ...DELIVERY_TYPES.map(dt => ({label: dt.label, value: dt.id}))]);

        if (isEdit && getOffice) {
            getOffice(props.match.params.id);
        }

        onGetFieldOptions();
        onGetDeliveryMethods();
    }, [getOffice]);

    useEffect(() => {
        if (reportBody && reportBody.length > 0) {
            let html = null;
            reportBody.forEach((body) => {
                if (html) {
                    html += '<br/>';
                } else {
                    html = '';
                }
                html += body.html;
            })
            printPartOfPage(html);
        }
    }, [reportBody]);

    useEffect(() => {
        if (orders && isEdit) {
            setOrdersList(orders);
        }
    }, [orders]);

    useEffect(() => {
        if (!reportBody && printReportData && printReportData.data && printReportData.data.batch) {
            setReportBody(printReportData.data.batch.body);
            props.resetPrintOfficeReport();
        }
    }, [printReportData.data]);

    useEffect(() => {
        if (office.id && isEdit) {
            setOfficeData({...office, _status: office.status});
            setDeliveryType(office.type);
            setDeliveryMethod(office.deliveryMethod);

            /** GET ORDERS */
            getOrdersByConditional();
        }
    }, [office]);

    useEffect(() => {
        console.log('deliveryMethods', deliveryMethods)
        if (deliveryMethods) {

            const list = deliveryMethods || [];
            const ot = deliveryType + '';
            setDeliveryMethodList([getEmptyOptions(), ...list.filter(op => (op.settings.includes(ot))).map(op => ({label: op.name, value: op.code}))]);
        }
    }, [deliveryType, deliveryMethods]);

    const handleValidSubmit = (event, values) => {
        const selectedDelivery = deliveryMethods.filter(item => item.code === values.deliveryMethod.value)[0];
        const data = {
            ...values,
            status: values._status,
            deliveryMethod: selectedDelivery.id,
            type: values.deliveryType.value,
            batchDate: values.batchDate[0] ? formatDate(values.batchDate[0], DATE_FORMAT.ONLY_DATE) : null
        };
        if(values.batchDate && values.batchDate.length === 1){
            data.batchDate= values.batchDate[0] ? formatDate(values.batchDate[0], DATE_FORMAT.ONLY_DATE) : null
        }
        if(values.batchDate && values.batchDate.length > 1){
            data.batchDate= values.batchDate ? formatDate(values.batchDate, DATE_FORMAT.ONLY_DATE) : null
        }
        delete data._status;
        delete data.deliveryType;

        if (!isEdit) {
            props.registerOffice(data, props.history)
        } else {
            props.updateOffice(props.match.params.id, data, props.history)
        }
    }

    const getOrdersByConditional = () => {
        const conditions = new Conditionals.Condition;
        conditions.add("office", props.match.params.id, Conditionals.OPERATORS.EQUAL);
        console.log("DEBUG - BUSCANDO ORDENES", conditions.all());
        onGetOrders(conditions);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '??Seguro desea eliminar este Despacho?',
            description: 'Usted est?? eliminado este Despacho, una vez eliminado no podr?? ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id, props.history)
        });
    };

    const onConfirm = (id) => {
        ConfirmationModalAction({
            title: '??Seguro desea confirmar el despacho?',
            description: 'Usted est?? confirmando este Despacho, al confirmar no podr?? modificar nuevamente.',
            id: '_clienteModal',
            onConfirm: () => onConfirmOffice(id, props.history)
        });
    };
    const onCloseModal = () => {
        getOrdersByConditional();
        setOpenOrdersModal(false);
    };

    const onAcceptModal = (conditionals) => {
        getOrdersByConditional();
        props.addOrderOffice(officeData.id, {id: 123}, conditionals, props.history);
        setOpenOrdersModal(false);
    };

    const addOrders = () => {
        const conditions = new Conditionals.Condition;
        conditions.add("status", 3, Conditionals.OPERATORS.EQUAL);//IMPRESA
        conditions.add("deliveryMethod.id", office.deliveryMethod.id, Conditionals.OPERATORS.EQUAL);
        conditions.add("orderDelivery.deliveryType", office.type, Conditionals.OPERATORS.EQUAL);
        conditions.add('office', '',  Conditionals.OPERATORS.NULL);
        console.log('conditions', conditions);
        setOrderListConditions(conditions.condition);
        setOpenOrdersModal(true);
    };

    const onConfirmDelete = (id, history) => props.deleteOffice(id, history);
    const onConfirmOffice = (id, history) => props.confirmOffice(id, history);
    const onGetDeliveryMethods = (conditional = null, limit = 50, page) => props.getDeliveryMethods(conditional, limit, page);
    const onGetFieldOptions = (conditional = null, limit = 500, page) => props.getFieldOptionByGroups([GROUPS.ORDERS_ORIGIN], limit, page);
    const onGetOrders = (conditions) => props.getOrdersByOffice(conditions.all(), 200, 0);
    const handleDownloadTemplate = (id) => fileOfficeTemplate('test.xls', id);
    const printReport = (id) => {
        setReportBody(null);
        props.printOfficeReport(id);
    }

    return (
        <React.Fragment>
            <CustomModal title={"Agregar pedidos"} size="lg" showFooter={false} isOpen={openOrdersModal} onClose={onCloseModal}>
                <OrderList customActions={onAcceptModal} showAsModal={true} conditionals={orderListConditions}/>
            </CustomModal>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/offices" title={officeData.name} item={"Despachos"}/>
                    {officeData.status && (
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className={"mb-3 float-md-start"}>
                                    <StatusField color={OFFICE_STATUS[officeData.status].color} className={"font-size-14 mr-5"}>
                                        {OFFICE_STATUS[officeData.status].name}
                                    </StatusField>
                                    <small className="badge rounded-pill bg-soft-info font-size-14 mr-5 p-2">Operador: {officeData?.user?.name}</small>
                                </div>
                                <div className={"mb-3 float-md-end"}>
                                    <div className="button-items">

                                        <Tooltip placement="bottom" title="Imprimir reporte" aria-label="add">
                                            <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => printReport(officeData.id)}>
                                                <i className={"mdi mdi-printer"}> </i> {printReportData.loading ? 'Generando...' : ''}
                                            </button>
                                        </Tooltip>
                                        {!!(officeData?.type === 3 && DELIVERY_METHODS.INTERRAPIDISIMO === officeData?.deliveryMethod?.code) &&  (
                                            <Tooltip placement="bottom" title="Descargar Plantilla Excel" aria-label="add">
                                                <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => handleDownloadTemplate(officeData.id)}>
                                                    <i className={"mdi mdi-file-excel"}> </i>
                                                </button>
                                            </Tooltip>
                                        )}
                                        {officeData.status === 1 && (
                                            <>
                                                <Tooltip placement="bottom" title="Eliminar despacho" aria-label="add">
                                                    <button type="button" color="primary" className="btn-sm btn btn-outline-danger waves-effect waves-light" onClick={() => onDelete(officeData.id)}>
                                                        <i className={"mdi mdi-delete"}> </i>
                                                    </button>
                                                </Tooltip>
                                                <Tooltip placement="bottom" title="Agregar pedidos" aria-label="add">
                                                    <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => addOrders()}>
                                                        <i className={"mdi mdi-plus"}> </i>
                                                    </button>
                                                </Tooltip>
                                                <Tooltip placement="bottom" title="Finalizar" aria-label="add">
                                                    <button type="button" color="primary" className="btn-sm btn btn-outline-success waves-effect waves-light" onClick={() => onConfirm(officeData.id)}>
                                                        <i className={"mdi mdi-check"}> </i>
                                                    </button>
                                                </Tooltip>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <AvForm className="needs-validation" autoComplete="off"
                            onValidSubmit={(e, v) => {
                                handleValidSubmit(e, v)
                            }}>
                        <Row>
                            <Col xl="4" className="mb-2">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Fecha <span className="text-danger">*</span></Label>
                                                    <FieldDate
                                                        name={"batchDate"}
                                                        mode={DATE_MODES.SINGLE}
                                                        defaultValue={officeData.batchDate}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Nombre <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_name"}
                                                        name={"name"}
                                                        value={officeData.name}
                                                        minLength={3}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Tipo <span className="text-danger">*</span></Label>
                                                    <FieldSelect
                                                        id={"deliveryType"}
                                                        name={"deliveryType"}
                                                        options={deliveryTypes}
                                                        defaultValue={deliveryType}
                                                        onChange={item => setDeliveryType(item.value)}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Metodo<span className="text-danger">*</span></Label>
                                                    <FieldSelect
                                                        id={"deliveryMethod"}
                                                        name={"deliveryMethod"}
                                                        options={deliveryMethodList}
                                                        defaultValue={deliveryMethod?.code}
                                                        onChange={item => setDeliveryMethod(item.value)}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Descripci??n <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        type={"textarea"}
                                                        id={"description"}
                                                        name={"description"}
                                                        value={officeData.description}
                                                        minLength={3}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={12} className="text-right">
                                                <ButtonSubmit loading={props.loading}/>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="8">
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title text-info"><i
                                            className="uil-shopping-cart-alt me-2"> </i> Pedidos en despacho</h4> <br/>
                                        <Row>
                                            {ordersList.sort((a, b) => a.id < b.id).map((order, k) => (
                                                <Col md={4} className="">
                                                    <div key={k} className="order-box">
                                                        <div>
                                                            <Link to={`/order/${order.id}`} className="text-muted">
                                                                <small className="font-weight-600"><span className="text-info">Pedido #: {order.id}</span></small>
                                                            </Link>
                                                            <Tooltip placement="bottom" title={"Peso"} aria-label="add">
                                                                <small className="float-end text-muted" style={{"cursor": "default"}}>
                                                                    <i className="mdi mdi-weight-pound"></i> {order.totalWeight}
                                                                </small>
                                                            </Tooltip>
                                                            <br/>
                                                            <small><span className="font-weight-600">Cliente: </span> <small>{order.customer.name}</small></small>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        {!ordersList && (
                                            <div className={"m-1 pl-2"}>No hay registros asociados</div>
                                        )}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </AvForm>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {deliveryMethods, ordersByOffice} = state.Order
    const {error, office, loading, printReport} = state.Office
    return {error, office, loading, deliveryMethods: deliveryMethods.data, orders: ordersByOffice, printReportData: printReport}
}

export default withRouter(
    connect(mapStateToProps, {
        apiError, registerOffice, deleteOffice, confirmOffice, updateOffice, getOffice,
        getDeliveryMethods, getFieldOptionByGroups, addOrderOffice, getOrdersByOffice, printOfficeReport, resetPrintOfficeReport
    })(OfficeEdit)
)

OfficeEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

