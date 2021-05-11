import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "reactstrap"
import {Button, Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getImageByQuality, priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";

import {getOrder, updateCard, updateOrder} from "../../store/order/actions";
import CustomModal from "../../components/Modal/CommosModal";
import OrderDeliveryOptions from "./create/orderDeliveryOptions";
import {DELIVERY_METHODS_PAYMENT_TYPES, DELIVERY_TYPES, PAYMENT_TYPES} from "../../common/constants";
import {map} from "lodash";
import Images from "../../components/Common/Image";
import OrderCustomer from "./create/orderCustomer";
import OrderProducts from "./create/orderProducts";
import OrderCar from "./create/orderCar";

const OrderDetail = (props) => {

    const {onGetOrder, onUpdateCar, onUpdateOrder, order, car} = props;
    const [orderData, setOrderData] = useState({});

    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [openDeliveryModal, setOpenDeliveryModal] = useState(false);
    const [openProductsModal, setOpenProductsModal] = useState(false);

    useEffect(() => {
        if (props.match.params && props.match.params.id) {
            onGetOrder(props.match.params.id);
        }

    }, [onGetOrder]);

    useEffect(() => {
        if (order && order.id) {

            let newCar = {
                ...car,
                customer: {id: order.customer.id},
                deliveryOptions: {
                    origin: order.origen,
                    type: order.deliveryType,
                    method: order.deliveryMethod.name,
                    cost: parseFloat(order.deliveryCost) || 0,
                    paymentType: order.paymentMode,
                    pieces: order.piecesForChanges || 0
                },
                products: [],
                isEdit:true
            };

            const o = {...order}
            if (o.orderDetails) {
                o.orderDetails.forEach(prod => {
                    const total = prod.quantity * prod.price;
                    prod.discount = total * (prod.discountPercent / 100);
                    prod.total = total - prod.discount;
                });

                o.orderDetails.forEach(prod => {
                    newCar.products.push({
                        origin: prod.product,
                        color: prod.color,
                        size: prod.size,
                        sizeId: prod.size,
                        quantity: prod.quantity,
                        quantityAvailable: 0,
                        discountPercentage: prod.discountPercent,
                        discount: prod.discount,
                    });
                })
            }

            onUpdateCar(newCar)
            setOrderData(order);
        }
        console.log(order);
    }, [order]);

    const toggleModal = () => {
        setOpenCustomerModal(!openCustomerModal);
    }
    const onCloseModal = () => {
        toggleModal();
        onUpdateCar({...car, customer:{}});
    }
    const onAcceptModal = () => {
        toggleModal();
        if (car.customer && car.customer.id) {
            onUpdateOrder(orderData.id, {customer: car.customer.id});
        }
    }

    const toggleDeliveryModal = () => {
        setOpenDeliveryModal(!openDeliveryModal);
    }
    const onCloseDeliveryModal = () => {
        toggleDeliveryModal();
    }
    const onAcceptDeliveryModal = () => {
        toggleDeliveryModal();
        if (car.deliveryOptions) {
            const deliveryData = {
                deliveryMethod: car.deliveryOptions.method,
                deliveryCost: car.deliveryOptions.cost,
                chargeOnDelivery: car.deliveryOptions.type === 3,
                origen: car.deliveryOptions.origin,
                deliveryType: parseInt(car.deliveryOptions.type),
            };

            if(DELIVERY_METHODS_PAYMENT_TYPES.includes(deliveryData.deliveryMethod)){
                deliveryData.piecesForChanges = parseInt(car.deliveryOptions.pieces);
                deliveryData.paymentMode = car.deliveryOptions.paymentType === PAYMENT_TYPES.CASH? 1:2;
            }
            onUpdateOrder(orderData.id, deliveryData);
        }
    }

    const toggleProductsModal = () => {
        setOpenProductsModal(!openDeliveryModal);
    }
    const onCloseProductsModal = () => {
        toggleProductsModal();
    }
    const onAcceptProductsModal = () => {
        toggleProductsModal();
        if (car.products) {
            const order = {
                products: car.products.map(prod => ({
                    id:prod.origin.id,
                    productSize:prod.sizeId,
                    quantity: prod.quantity,
                    discountPercentage: prod.discountPercentage,
                }))
            };
            onUpdateOrder(orderData.id, order);
        }
    }

    const getDeliveryType = (deliveryType) => {
        let find = DELIVERY_TYPES.find(dt => dt.id === deliveryType);
        return find ? find.label : '';
    }

    const getPaymentType = () => {
       if(!order.paymentMode) return '';
       return order.paymentMode === 1? PAYMENT_TYPES.CASH:PAYMENT_TYPES.TRANSFER;
    }

    return orderData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Card id={'customer-detail'} className="p-3">
                                        <Row>
                                            <Col md={10}>
                                                <h5 className="text-info"><i className="uil-users-alt me-2"> </i> Datos del cliente</h5>
                                            </Col>
                                            <Col md={2} className="text-right">
                                                <Tooltip placement="bottom" title="Editar cliente" aria-label="add">
                                                    <button type="button"
                                                            size="small"
                                                            className="btn btn-sm text-primary"
                                                            onClick={() => {
                                                                toggleModal();
                                                            }}>
                                                        <i className="uil uil-pen font-size-18"> </i>
                                                    </button>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <label>Nombre: </label>
                                                <span className="p-1">{orderData.customer.name}</span>
                                                {orderData.customer.isMayorist === true && (
                                                    <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                                                        <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                                                    </Tooltip>
                                                )}
                                            </Col>
                                            <Col md={12}>
                                                <label>Correo: </label>
                                                <span className="p-1">{orderData.customer.email}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Departamento: </label>
                                                <span className="p-1">{orderData.customer.state?.name}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Municipio: </label>
                                                <span className="p-1">{orderData.customer.municipality?.name}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Documento: </label>
                                                <span className="p-1">{orderData.customer.document}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Teléfono Celular: </label>
                                                <span className="p-1">{orderData.customer.cellphone}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Teléfono Residencial: </label>
                                                <span className="p-1">{orderData.customer.phone}</span>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col md={12}>
                                    <Card id={'delivery-options'} className="p-3">
                                        <Row>
                                            <Col md={10}>
                                                <h5 className="text-info"><i className="uil-shopping-cart-alt me-2"> </i> Datos de envio</h5>
                                            </Col>
                                            <Col md={2} className="text-right">
                                                <Tooltip placement="bottom" title="Editar envio" aria-label="add">
                                                    <button type="button"
                                                            size="small"
                                                            className="btn btn-sm text-primary"
                                                            onClick={() => {
                                                                toggleDeliveryModal();
                                                            }}>
                                                        <i className="uil uil-pen font-size-18"> </i>
                                                    </button>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <label>Origen del pedido: </label>
                                                <span className="p-1">{orderData.origen}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Tipo de pedido: </label>
                                                <span className="p-1">{getDeliveryType(orderData.deliveryType)}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Metodo de envio: </label>
                                                <span className="p-1">{orderData.deliveryMethod.name}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Costo del envio: </label>
                                                <span className="p-1">{orderData.deliveryCost}</span>
                                            </Col>
                                            {DELIVERY_METHODS_PAYMENT_TYPES.includes(orderData.deliveryMethod.name) && (
                                                <>
                                                    <Col md={12}>
                                                        <label>Forma de pago: </label>
                                                        <span className="p-1">{getPaymentType()}</span>
                                                    </Col>
                                                    <Col md={12}>
                                                        <label>Piezas para cambio: </label>
                                                        <span className="p-1">{orderData.piecesForChanges || 0}</span>
                                                    </Col>
                                                </>
                                            )}
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Card id={'products'} className="p-3">
                                        <Row>
                                            <Col md={11}>
                                                <h5 className="text-info"><i className="uil-box me-2"> </i> Productos</h5>
                                            </Col>
                                            <Col md={1} className="text-right">
                                                <Tooltip placement="bottom" title="Editar products" aria-label="add">
                                                    <button type="button"
                                                            size="small"
                                                            className="btn btn-sm text-primary"
                                                            onClick={() => {
                                                                toggleProductsModal();
                                                            }}>
                                                        <i className="uil uil-pen font-size-18"> </i>
                                                    </button>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {map(orderData.orderDetails, (product, k) => (
                                                <div key={k} className="col-md-6">
                                                    <div className="prod-box">
                                                        <Row>
                                                            <Col md={2} className="text-center">
                                                                <div className={`border-1`} id={`product-${k}`} role="tabpanel">
                                                                    <Images src={`${getImageByQuality(product.product.productImage[0], 'medium')}`}
                                                                            alt={product.product.productImage[0].filename}
                                                                            height={83}
                                                                            className="img-fluid mx-auto d-block"
                                                                            data-zoom={`${product.product.productImage[0].path}`}
                                                                            styles={{height: '83px', borderRadius: '8px'}}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col md={5} className="p-1">
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <b className="text-info">{product.product.reference}</b>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <small>{product.color} <span className="badge rounded-pill bg-soft-info">{product.size}</span></small>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <small><span className="font-weight-600">Cantidad:</span> {product.quantity}</small>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md={5} className="p-1">
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <small><span className="font-weight-600">Precio:</span> {priceFormat(product.price)}</small>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <small><span className="font-weight-600">Desc.:</span> <span
                                                                            className="text-danger">-{priceFormat(product.discount)} ({product.discountPercent}%)</span></small>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <div className="font-weight-600 font-size-12"><b>Total: {priceFormat(product.total)}</b></div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            ))}
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Card id={'summary-detail'} className="p-3">
                                        <Row>
                                            <Col md={12}>
                                                <h5 className="text-info"><i className="uil-dollar-alt me-2"> </i> Totales</h5>
                                            </Col>
                                            <Col md={12}>
                                                <div className="table-responsive">
                                                    <table className="table table-sm mb-0">
                                                        <tbody>
                                                        <tr>
                                                            <td>Total sin descuento:</td>
                                                            <td className="text-end">{priceFormat(orderData.subTotalAmount)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Descuento:</td>
                                                            <td className="text-end text-danger">- {priceFormat(orderData.totalDiscount)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total con descuento:</td>
                                                            <td className="text-end">{priceFormat(orderData.totalDiscount + orderData.subTotalAmount)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Envio:</td>
                                                            <td className="text-end">{priceFormat(orderData.deliveryCost)}</td>
                                                        </tr>
                                                        <tr className="bg-light">
                                                            <th className="font-size-16">Total :</th>
                                                            <td className="text-end"><span className="fw-bold font-size-16">{priceFormat(orderData.totalAmount)}</span></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            <CustomModal title={"Modificar cliente"} size="lg" showFooter={false} isOpen={openCustomerModal} onClose={onCloseModal}>
                <OrderCustomer showAsModal={true}
                               onCloseModal={onCloseModal}
                               onAcceptModal={onAcceptModal}
                />
            </CustomModal>

            <CustomModal title={"Modificar opciones de envio"} size="lg" showFooter={false} isOpen={openDeliveryModal} onClose={onCloseDeliveryModal}>
                <OrderDeliveryOptions customer={orderData.customer}
                                      showAsModal={true}
                                      onCloseModal={onCloseDeliveryModal}
                                      onAcceptModal={onAcceptDeliveryModal}
                />
            </CustomModal>

            <CustomModal title={"Modificar productos"} size="lg" showFooter={false} isOpen={openProductsModal} onClose={onCloseProductsModal}>
                <Row>
                    <Col md={12}>
                        <OrderProducts/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12}>
                        <OrderCar/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12} className="text-right">
                        <button type="button" className="btn btn-light" onClick={() => onCloseProductsModal()}>Cancelar</button>
                        <Button color="primary" type="button" onClick={() => onAcceptProductsModal()}>Guardar</Button>
                    </Col>
                </Row>
            </CustomModal>

        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, car, order, loading} = state.Order;
    return {error, car, order, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
    onUpdateOrder: (id, payload) => dispatch(updateOrder(id, payload)),
    onUpdateCar: (data) => dispatch(updateCard(data)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)

OrderDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}