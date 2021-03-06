import React, {useEffect} from "react"
import {Col, Container, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {formatDate, priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {StatusField} from "../../components/StatusField";
import {COMMENT_ENTITIES, GROUPS, ORDER_STATUS} from "../../common/constants";
import Observations from "../../components/Common/Observations";
import {getOrder, updateOrder} from "../../store/order/actions";

const PostSaleDetail = (props) => {

    const {onGetOrder, refresh, order} = props;

    useEffect(() => {
        if (props.match.params.id) {
            onGetOrder(props.match.params.id);
        }
    }, [onGetOrder, refresh]);

    const updateDeliveryStatus = () => {
        props.onUpdateOrder(order.id, {enablePostSale: !order.enablePostSale})
    }

    return order.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid className="pb-3">
                    <Breadcrumb hasBack path="/postSales" title={order.name} item={`Post Venta #${order.id}`}/>

                    <Row className="mb-2">
                        <Col md={12}>
                            <div className={"mb-3 float-md-start"}>
                                <small className="badge rounded-pill bg-soft-info font-size-14 mr-5 p-2">Operador: {order?.user?.name}</small>
                            </div>
                            <div className={"mb-3 float-md-end"}>
                                <div className="button-items">

                                    <Tooltip placement="bottom" title={order.enablePostSale ? 'Desactivar' : 'Activar'} aria-label="add">
                                        <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => updateDeliveryStatus(order)}>
                                            <i className={`mdi mdi-${order.enablePostSale ? 'delete text-danger' : 'check text-success'}`}> </i>
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Refrescar" aria-label="add">
                                        <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => onGetOrder(order.id)}>
                                            <i className={"mdi mdi-refresh"}> </i>
                                        </button>
                                    </Tooltip>

                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Card id={'details'} className="mb-3 p-3">
                        <Row>
                            <Col md={12}>
                                <h4 className="card-title text-info">Informaci??n b??sica</h4>
                                <hr/>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    <Col md={6}>
                                        <label># Pedido: </label>
                                        <span className="p-1">{order.id}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Destino: </label>
                                        <span className="p-1">{order.orderDelivery.deliveryLocality.name}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Cliente: </label>
                                        <span className="p-1">{order.customer.name}</span>
                                        {order.customer.isMayorist === true && (
                                            <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                                                <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                                            </Tooltip>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <label>Estado del pedido: &nbsp;</label>
                                        <StatusField color={ORDER_STATUS[order.status].color}>
                                            {ORDER_STATUS[order.status].name}
                                        </StatusField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Monto del pedido: </label>
                                        <span className="p-1">{priceFormat(order.totalAmount)}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Metodo de envio: </label>
                                        <span className="p-1">{order.deliveryMethod.name}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Guia: </label>
                                        <span className="p-1">{order.orderDelivery.tracking}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Fecha de env??o: </label>
                                        <span className="p-1">{formatDate(order.orderDelivery.deliveryDate || order.createdAt)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Activo: </label>
                                        <span className="p-1">{order.enablePostSale ? 'SI': 'NO'}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>

                    <Card id={'tracking'} className="mb-3 p-3">
                        <Row>
                            <Col md={12}>
                                <h4 className="card-title text-info">Rastreo del paquete</h4>
                                <hr/>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    <Col md={6}>
                                        <label>Estatus del env??o: </label>
                                        <span className="p-1">{order.orderDelivery.deliveryStatus || ''}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Fecha del estatus del env??o: </label>
                                        <span className="p-1">{formatDate(order.orderDelivery.deliveryDate || order.createdAt)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Ubicaci??n estatus del env??o: </label>
                                        <span className="p-1">{order.orderDelivery.deliveryState}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Fecha del estatus del env??o: </label>
                                        <span className="p-1">{formatDate(order.orderDelivery.deliveryDate || order.createdAt)}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>

                    <Observations
                        entitySuggested={GROUPS.ORDER_OBSERVATIONS}
                        entity={COMMENT_ENTITIES.ORDER}
                        entityId={order.id}/>
                </Container>
            </div>
        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, order, refresh, loading} = state.Order;
    return {error, order, refresh, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
    onUpdateOrder: (id, payload) => dispatch(updateOrder(id, payload)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostSaleDetail)
)

PostSaleDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}