import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {formatDate, getImageByQuality, priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";

import {getOrder, updateOrder} from "../../store/order/actions";
import CustomerForm from "../CustomerEdit/CustomerForm";
import CustomModal from "../../components/Modal/CommosModal";
import {getEmptyOptions} from "../../common/converters";
import OrderDeliveryOptions from "./create/orderDeliveryOptions";
import {DELIVERY_METHODS_PAYMENT_TYPES, DELIVERY_TYPES} from "../../common/constants";
import {map} from "lodash";
import Images from "../../components/Common/Image";

const OrderDetail = (props) => {

    const {onGetOrder, onUpdateOrder, order} = props;
    const [orderData, setOrderData] = useState({});

    const [editCustomer, setEditCustomer] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);

    const [editDelivery, setEditDelivery] = useState(false);
    const [openDeliveryModal, setOpenDeliveryModal] = useState(false);

    useEffect(() => {
        if (props.match.params && props.match.params.id) {
            onGetOrder(props.match.params.id);
        }

    }, [onGetOrder]);

    useEffect(() => {
        if (order && order.id) {
            const o = {...order}
            if(o.orderDetails){
                o.orderDetails.forEach(prod => {
                    const total = prod.quantity * prod.price;
                    prod.discount = total * (prod.discountPercent/100);
                    prod.total = total - prod.discount;
                })
            }
            setOrderData(order);
        }
        console.log(order);
    }, [order]);

    const toggleModal = () => {
        setOpenCustomerModal(!openCustomerModal);
    }

    const onCloseModal = () => {
        toggleModal();
        setEditCustomer(false);
    }

    const onAcceptModal = (id) => {
        toggleModal();
        if (id) {
            onUpdateOrder(orderData.id, {customer: id});
        }
        setEditCustomer(false);
    }

    const toggleDeliveryModal = () => {
        setOpenDeliveryModal(!openDeliveryModal);
    }

    const onCloseDeliveryModal = () => {
        toggleDeliveryModal();
        setEditDelivery(false);
    }

    const onAcceptDeliveryModal = (delivery) => {
        toggleDeliveryModal();
        if (delivery) {
            onUpdateOrder(orderData.id, delivery);
        }
        setEditDelivery(false);
    }

    const getDeliveryType = (deliveryType) => {
        let find = DELIVERY_TYPES.find(dt => dt.id === deliveryType);
        return find ? find.label : '';
    }
    return orderData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col md={6}>
                            <Card id={'customer-detail'} className="p-3">
                                <Row>
                                    <Col md={11}>
                                        <h5 className="text-info">Datos del cliente</h5>
                                    </Col>
                                    <Col md={1} className="text-right">
                                        <Tooltip placement="bottom" title="Editar cliente" aria-label="add">
                                            <button type="button"
                                                    size="small"
                                                    className="btn btn-sm text-primary"
                                                    onClick={() => {
                                                        toggleModal();
                                                        setEditCustomer(true);
                                                    }}>
                                                <i className="uil uil-pen font-size-18"> </i>
                                            </button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <label>Nombre: </label>
                                                <span className="p-1">{orderData.customer.name}</span>
                                                {orderData.customer.isMayorist === true && (
                                                    <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                                                        <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                                                    </Tooltip>
                                                )}
                                            </Col>
                                            <Col md={6}>
                                                <label>Correo: </label>
                                                <span className="p-1">{orderData.customer.email}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Departamento: </label>
                                                <span className="p-1">{orderData.customer.state?.name}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Municipio: </label>
                                                <span className="p-1">{orderData.customer.municipality?.name}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Documento: </label>
                                                <span className="p-1">{orderData.customer.document}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Teléfono Celular: </label>
                                                <span className="p-1">{orderData.customer.cellphone}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Teléfono Residencial: </label>
                                                <span className="p-1">{orderData.customer.phone}</span>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card id={'delivery-options'} className="p-4">
                                <Row>
                                    <Col md={11}>
                                        <h5 className="text-info">Datos de envio</h5>
                                    </Col>
                                    <Col md={1} className="text-right">
                                        <Tooltip placement="bottom" title="Editar envio" aria-label="add">
                                            <button type="button"
                                                    size="small"
                                                    className="btn btn-sm text-primary"
                                                    onClick={() => {
                                                        toggleDeliveryModal();
                                                        setEditDelivery(true);
                                                    }}>
                                                <i className="uil uil-pen font-size-18"> </i>
                                            </button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <label>Origen del pedido: </label>
                                                <span className="p-1">{orderData.origen}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Tipo de pedido: </label>
                                                <span className="p-1">{getDeliveryType(orderData.deliveryType)}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Metodo de envio: </label>
                                                <span className="p-1">{orderData.deliveryMethod.name}</span>
                                            </Col>
                                            <Col md={6}>
                                                <label>Costo del envio: </label>
                                                <span className="p-1">{orderData.deliveryCost}</span>
                                            </Col>
                                            {DELIVERY_METHODS_PAYMENT_TYPES.includes(orderData.deliveryMethod.name) && (
                                                <>
                                                    <Col md={6}>
                                                        <label>Forma de pago: </label>
                                                        <span className="p-1">{orderData.deliveryMethod.name || 'TBD'}</span>
                                                    </Col>
                                                    <Col md={6}>
                                                        <label>Piezas para cambio: </label>
                                                        <span className="p-1">{orderData.deliveryMethod.name || 'TBD'}</span>
                                                    </Col>
                                                </>
                                            )}
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12}>
                            <Card id={'products'} className="p-3">
                                <Row>
                                    <Col md={11}>
                                        <h5 className="text-info">Productos</h5>
                                    </Col>
                                    <Col md={1} className="text-right">
                                        <Tooltip placement="bottom" title="Editar products" aria-label="add">
                                            <button type="button"
                                                    size="small"
                                                    className="btn btn-sm text-primary"
                                                    onClick={() => {
                                                        toggleModal();
                                                        setEditCustomer(true);
                                                    }}>
                                                <i className="uil uil-pen font-size-18"> </i>
                                            </button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                {map(orderData.orderDetails, (product, k) => (
                                   <div  key={k} className="col-md-6">
                                       <Card className="m-1 bg-light">
                                           <Row>
                                               <Col md={2} className="p-3 text-center">
                                                   {map(product.productImage, (img, key) => (
                                                       <div key={key} className={`border-1`} id={`product-${key}`} role="tabpanel">
                                                           <Images src={`${getImageByQuality(img, 'medium')}`}
                                                                   alt={img.filename}
                                                                   height={150}
                                                                   className="img-fluid mx-auto d-block"
                                                                   data-zoom={`${img.path}`}/>
                                                           <br/>
                                                           <b className="text-info font-size-16">{product.reference}</b>
                                                       </div>
                                                   ))}
                                               </Col>
                                               <Col md={6} className="p-3">
                                                   <Row>
                                                       <Col md={12}>
                                                           <small><b>Color:</b> {product.color}</small>
                                                       </Col>
                                                       <Col md={12}>
                                                           <small><b>Size:</b> {product.size}</small>
                                                       </Col>
                                                       <Col md={12}>
                                                          <small> <b>Cantidad:</b> {product.quantity}</small>
                                                       </Col>
                                                   </Row>
                                               </Col>
                                               <Col md={4} className="p-3">
                                                   <Row>
                                                       <Col md={12}>
                                                           <small><b>Precio:</b> {priceFormat(product.price)}</small>
                                                       </Col>
                                                       <Col md={12}>
                                                           <small><b>% Desc.:</b> {product.discountPercent}%</small>
                                                       </Col>
                                                       <Col md={12}>
                                                           <small><b>Descuento:</b> <span className="text-danger">-{priceFormat(product.discount)}</span></small>
                                                       </Col>
                                                       <Col md={12}>
                                                           <div className="font-size-14"><b>Total: {priceFormat(product.total)}</b></div>
                                                       </Col>
                                                   </Row>
                                               </Col>
                                           </Row>
                                       </Card>
                                   </div>
                                ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12}>
                            <Card id={'summary-detail'} className="p-3">
                                <div className="table-responsive">
                                    <table className="table table-sm mb-0">
                                        <tbody>
                                        <tr>
                                            <td>Total sin descuento:</td>
                                            <td className="text-end">{priceFormat(orderData.totalAmount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Descuento:</td>
                                            <td className="text-end text-danger">- {priceFormat(orderData.totalDiscount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Total con descuento:</td>
                                            <td className="text-end">{priceFormat(orderData.totalAmount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Envio:</td>
                                            <td className="text-end">{priceFormat(orderData.deliveryCost)}</td>
                                        </tr>
                                        <tr className="bg-light">
                                            <th className="font-size-16">Total :</th>
                                            <td className="text-end"><span className="fw-bold font-size-16">{priceFormat(orderData.totalWithDelivery)}</span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <CustomModal title={editCustomer ? "Modificar cliente" : "Nuevo cliente"} size="lg" showFooter={false} isOpen={openCustomerModal} onClose={onCloseModal}>
                <CustomerForm customer={orderData.customer}
                              showAsModal={true}
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

        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, order, loading} = state.Order;
    return {error, order, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
    onUpdateOrder: (id, payload) => dispatch(updateOrder(id, payload)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)

OrderDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}