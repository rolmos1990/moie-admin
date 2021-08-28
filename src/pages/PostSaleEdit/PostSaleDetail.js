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
import {getOrder} from "../../store/order/actions";

const PostSaleDetail = (props) => {

    const {onGetOrder, order} = props;

    useEffect(() => {
        if (props.match.params.id) {
            onGetOrder(props.match.params.id);
        }
    }, [onGetOrder]);


    return order.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid className="pb-3">
                    <Breadcrumb hasBack path="/postSales" title={order.name} item={`Post Venta #${order.id}`}/>

                    <Card id={'details'} className="mb-3 p-3">
                        <Row>
                            <Col md={12}>
                                <h4 className="card-title text-info">Información básica</h4>
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
                                        <label>Fecha de envío: </label>
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
                                        <label>Estatus del envío: </label>
                                        <span className="p-1">{order.orderDelivery.deliveryStatus || ''}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Fecha del estatus del envío: </label>
                                        <span className="p-1">{formatDate(order.orderDelivery.deliveryDate || order.createdAt)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Ubicación estatus del envío: </label>
                                        <span className="p-1">{order.orderDelivery.deliveryState}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Fecha del estatus del envío: </label>
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
    const {error, order, loading} = state.Order;
    return {error, order, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostSaleDetail)
)

PostSaleDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}