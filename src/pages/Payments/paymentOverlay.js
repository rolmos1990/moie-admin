import React, {useEffect, useState} from "react"
import {Col, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {getOrders} from "../../store/order/actions";
import Conditionals from "../../common/conditionals";
import {formatDate, priceFormat} from "../../common/utils";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {StatusField} from "../../components/StatusField";
import {ORDER_STATUS} from "../../common/constants";
import {applyPayment} from "../../store/payments/actions";

const PaymentOverlay = (props) => {

    const {payment, onRelateOrder, onCloseOverlay, onGetOrders, orders} = props;
    const [findOrderBy, setFindOrderBy] = useState(null)
    const [orderRelated, setOrderRelated] = useState(null)

    useEffect(() => {
        console.log('YG payment', payment)
        if (payment) {
            const conditions = new Conditionals.Condition;
            conditions.add("payment", payment.id, Conditionals.OPERATORS.EQUAL);
            onGetOrders(conditions);
            setFindOrderBy("PAYMENT");
        }
    }, [payment]);

    useEffect(() => {
        console.log('YG orders', orders);
        if (findOrderBy === "PAYMENT") {
            if (orders.length === 1 && orders[0].payment && orders[0].payment.id === payment.id) {
                setOrderRelated(orders[0]);

            } else {
                const conditions = new Conditionals.Condition;
                conditions.add("payment", null, Conditionals.OPERATORS.NULL);
                conditions.add("orderDelivery.chargeOnDelivery", 0, Conditionals.OPERATORS.EQUAL);
                onGetOrders(conditions);
                setFindOrderBy("NO_PAYMENT");
            }
        }

    }, [orders]);

    const selectOrder = (order) => {
        ConfirmationModalAction({
            title: 'Confirmación',
            description: `Usted está asociando el pago# ${payment.id} con el pedido# ${order.id}, ¿Desea continuar?`,
            id: '_clienteModal',
            onConfirm: () => {
                console.log('YG onRelateOrder', order);
                onRelateOrder(payment.id, {orderId: order.id});
                setOrderRelated(order);
            }
        });
    }

    return payment.id ? (
        <div className={'orderDetail-overlay pt-2'}>
            <Row className="mb-2">
                <Col md={12}>
                    <div className={"mb-3 float-md-start"}>
                        <Tooltip placement="bottom" title="Ocultar" aria-label="add">
                            <button className="btn btn-outline-default mr-5" onClick={() => onCloseOverlay()}>
                                <i className="uil uil-arrow-to-right font-size-16"> </i>
                            </button>
                        </Tooltip>
                        <small className="badge rounded-pill bg-info font-size-14 mr-5 p-2">Pago# {payment.id}</small>
                    </div>
                    <div className={"mb-3 float-md-end"}>

                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12} className="p-3">
                    <Card id={'payment-detail'} className="p-3">
                        <Col xs={10}>
                            <h4 className="card-title text-info"><i className="uil uil-truck"> </i> Datos del pago</h4>
                        </Col>
                        <Row>
                            <Col md={6}>
                                <label>Nombre: </label>
                                <span className="p-1">{payment.name}</span>
                            </Col>
                            <Col md={6}>
                                <label>Teléfono: </label>
                                <span className="p-1">{payment.cellphone}</span>
                            </Col>
                            <Col md={6}>
                                <label>Correo: </label>
                                <span className="p-1">{payment.email}</span>
                            </Col>
                            <Col md={6}>
                                <label>Forma de pago: </label>
                                <span className="p-1">{payment.paymentForm}</span>
                            </Col>
                            {payment.originBank && (
                                <Col md={6}>
                                    <label>Banco origen: </label>
                                    <span className="p-1">{payment.originBank}</span>
                                </Col>
                            )}
                            <Col md={6}>
                                <label>Banco destino: </label>
                                <span className="p-1">{payment.targetBank}</span>
                            </Col>
                            <Col md={6}>
                                <label>Fecha: </label>
                                <span className="p-1">{formatDate(payment.createdAt)}</span>
                            </Col>
                            <Col md={6}>
                                <label>Número de comprobante: </label>
                                <span className="p-1">{payment.consignmentNumber}</span>
                            </Col>
                            <Col md={6}>
                                <label>Monto: </label>
                                <span className="p-1">{priceFormat(payment.consignmentAmount, "", true)}</span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={12} className="p-3">
                    {!orderRelated && (
                        <Card id={'orders'} className="p-3">
                            <Col xs={10}>
                                <h4 className="card-title text-info"><i className="uil uil-truck"> </i> Seleccionar venta</h4>
                            </Col>
                            <Row>
                                <table className="table table-sm table-striped table-bordered table-centered table-nowrap font-size-11">
                                    <thead>
                                    <tr>
                                        <th style={{width: '35%'}}>Cliente</th>
                                        <th style={{width: '20%'}}>Fecha</th>
                                        <th style={{width: '15%'}}>Monto</th>
                                        <th style={{width: '15%'}}>Envio</th>
                                        <th style={{width: '15%'}}>Total</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.sort((a, b) => a.id < b.id).map((order, k) => (
                                        <tr>
                                            <td>{order.customer.name}</td>
                                            <td>{formatDate(order.createdAt)}</td>
                                            <td className="text-end">{priceFormat(order.subTotalAmount, "", true)}</td>
                                            <td className="text-end">{priceFormat(order.totalAmount - order.subTotalAmount, "", true)}</td>
                                            <td className="text-end">{priceFormat(order.totalAmount, "", true)}</td>
                                            <td>
                                                <Tooltip placement="bottom" title="Asociar pedido" aria-label="add">
                                                    <button size="small" className="btn btn-sm btn-primary" onClick={() => selectOrder(order)}>
                                                        <i className="uil uil-plus-circle font-size-18"> </i>
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Row>
                        </Card>
                    )}
                    {orderRelated && (
                        <Card id={'order-detail'} className="p-3">
                            <Col xs={10}>
                                <h4 className="card-title text-info"><i className="uil uil-truck"> </i> Pedido asociado</h4>
                            </Col>
                            <Row>
                                <Col md={6}>
                                    <label>Pedido #: </label>
                                    <span className="p-1">{orderRelated.id}</span>
                                </Col>
                                <Col md={6}>
                                    <label>Estado: </label>
                                    <span className="p-1">
                                         <StatusField color={ORDER_STATUS[orderRelated.status].color} className={"font-size-10 mr-5"}>
                                            {ORDER_STATUS[orderRelated.status].name}
                                        </StatusField>
                                    </span>
                                </Col>
                                <Col md={6}>
                                    <label>Cliente: </label>
                                    <span className="p-1">{orderRelated.customer.name}</span>
                                </Col>
                                <Col md={6}>
                                    <label>Correo: </label>
                                    <span className="p-1">{orderRelated.customer.email}</span>
                                </Col>
                                <Col md={6}>
                                    <label>Fecha: </label>
                                    <span className="p-1">{formatDate(orderRelated.createdAt)}</span>
                                </Col>
                                <Col md={6}>
                                    <label>Cantidad de prendas: </label>
                                    <span className="p-1">{orderRelated.quantity}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <label>Monto: </label>
                                    <span className="p-1">{priceFormat(orderRelated.subTotalAmount, "", true)}</span>
                                </Col>
                                <Col md={4}>
                                    <label>Envio: </label>
                                    <span className="p-1">{priceFormat(orderRelated.totalAmount - orderRelated.subTotalAmount, "", true)}</span>
                                </Col>
                                <Col md={4}>
                                    <label>Total: </label>
                                    <span className="p-1">{priceFormat(orderRelated.totalAmount, "", true)}</span>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Col>
            </Row>

        </div>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {orders} = state.Order
    return {orders}
}

const mapDispatchToProps = dispatch => ({
    onGetOrders: (conditions) => dispatch(getOrders(conditions.all(), 500, 0)),
    onRelateOrder: (paymentId, payload) => dispatch(applyPayment(paymentId, payload))
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PaymentOverlay)
)

PaymentOverlay.propTypes = {
    payment: PropTypes.object.isRequired,
    showOverlay: PropTypes.bool,
    onCloseOverlay: PropTypes.func,
    error: PropTypes.any,
    history: PropTypes.object
}
