import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "reactstrap"
import {Button, Card, Tooltip} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getImageByQuality, priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";

import {getOrder, nextStatusOrder, updateCard, updateOrder} from "../../store/order/actions";
import CustomModal from "../../components/Modal/CommosModal";
import OrderDeliveryOptions from "./create/orderDeliveryOptions";
import {DELIVERY_METHODS_PAYMENT_TYPES, DELIVERY_TYPES, PAYMENT_TYPES} from "../../common/constants";
import {map} from "lodash";
import Images from "../../components/Common/Image";
import OrderCustomer from "./create/orderCustomer";
import OrderProducts from "./create/orderProducts";
import OrderCar from "./create/orderCar";
import {getProductsByIds} from "../../store/product/actions";
import {HtmlTooltip} from "../../components/Common/HtmlTooltip";

import * as htmlToImage from 'html-to-image';
// import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';


const OrderDetail = (props) => {

    const {onGetOrder, onUpdateCar, onUpdateOrder, onGetProducts, onNextStatusOrder, order, car, products} = props;
    const [orderData, setOrderData] = useState({});
    const [downloadingPhoto, setDownloadingPhoto] = useState(false);

    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [openDeliveryModal, setOpenDeliveryModal] = useState(false);
    const [openProductsModal, setOpenProductsModal] = useState(false);

    const productSummaryRef = React.createRef();

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
                isEdit: true
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
                        id: prod.id,
                        origin: {...prod.product, id: prod.id, price: prod.price},
                        color: prod.color,
                        size: prod.size,
                        sizeId: prod.productSize?.id || 0,
                        quantity: prod.quantity,
                        quantityAvailable: prod.productSize?.quantity || 0,
                        discountPercentage: prod.discountPercent,
                        discount: prod.discount,
                    });
                })
            }
            // onGetProducts(newCar.products.map(prod => prod.origin.id))
            onUpdateCar(newCar)
            setOrderData(order);
        }
        //console.log(order);
    }, [order]);

    const toggleModal = () => {
        setOpenCustomerModal(!openCustomerModal);
    }
    const onCloseModal = () => {
        toggleModal();
        onUpdateCar({...car, customer: {}});
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

            if (DELIVERY_METHODS_PAYMENT_TYPES.includes(deliveryData.deliveryMethod)) {
                deliveryData.piecesForChanges = parseInt(car.deliveryOptions.pieces);
                deliveryData.paymentMode = car.deliveryOptions.paymentType === PAYMENT_TYPES.CASH ? 1 : 2;
            }
            onUpdateOrder(orderData.id, deliveryData);
        }
    }

    const toggleProductsModal = () => {
        setOpenProductsModal(!openProductsModal);
    }
    const onCloseProductsModal = () => {
        toggleProductsModal();
    }
    const onAcceptProductsModal = () => {
        toggleProductsModal();
        if (car.products) {
            const order = {
                products: car.products.map(prod => ({
                    id: prod.origin.id,
                    productSize: prod.sizeId,
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
        if (!order.paymentMode) return '';
        return order.paymentMode === 1 ? PAYMENT_TYPES.CASH : PAYMENT_TYPES.TRANSFER;
    }

    const colorThreeDots = (product) => {
        if (product.color.length > 20) {
            return product.color.substr(0, 22) + "...";
        }
        return product.color;
    }

    const imageAsStyle = (imgSrc) => {
        // /logo512.png
        return {
            backgroundImage: `url(${imgSrc})`,
            backgroundColor: '#ffffff',
            height: '83px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            margin: 'auto',
            backgroundPosition: 'center',
            borderRadius: '20px 0 0 20px',
        };
    }

    const takePhoto = () => {
        setDownloadingPhoto(true);
        htmlToImage.toPng(productSummaryRef.current)
            .then(function (dataUrl) {
                // var img = new Image();
                // img.src = dataUrl;
                // document.body.appendChild(img);

                setDownloadingPhoto(false);

                console.log('paso 2')
                var link = document.createElement('a');
                link.download = `pedido_${order.id}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
                setDownloadingPhoto(false);
            })

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
                                                <h4 className="card-title text-info"><i className="uil-users-alt me-2"> </i> Datos del cliente</h4>
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
                                                <h4 className="card-title text-info"><i className="uil-archive me-2"> </i> Datos de envio</h4>
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
                            <Row className="row mb-2">
                                <Col md={12}>
                                    <div className="mb-3 float-md-end">
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-delete"}> </i> Anular
                                        </Button>
                                        {(order && order.status === 1) && (
                                            <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light" onClick={() => onNextStatusOrder(order.id)}>
                                                <i className={"mdi mdi-check"}> </i> Confirmar
                                            </Button>
                                        )}
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-printer"}> </i> Imprimir
                                        </Button>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-content-copy"}> </i> Copiar resumen
                                        </Button>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light" onClick={() => takePhoto()}>
                                            <i className={"mdi mdi-camera"}> </i> {downloadingPhoto ? 'Descargando...' : 'Descargar foto'}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <div id={"products-summary"} ref={productSummaryRef}>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Card id={'products'} className="p-3">
                                            <Row>
                                                <Col md={11}>
                                                    <h4 className="card-title text-info"><i className="uil-box me-2"> </i> Productos</h4>
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
                                                                <Col md={2} className="text-center" style={{padding: '2px 0 2px 8px'}}>
                                                                    <HtmlTooltip
                                                                        placement={'right-end'}
                                                                        title={
                                                                            <React.Fragment>
                                                                                <Images src={`${getImageByQuality(product.product.productImage.length > 0 ? product.product.productImage[0] : {}, 'medium')}`}
                                                                                        alt={product.product.reference}
                                                                                        height={120}
                                                                                        className="img-fluid mx-auto d-block tab-img rounded"/>
                                                                            </React.Fragment>
                                                                        }>
                                                                        <div className={`border-1`} id={`product-${k}`} role="tabpanel">
                                                                            {/*<div style={imageAsStyle(getImageByQuality(product.product.productImage[0], 'medium'))}></div>*/}
                                                                            <Images src={`${getImageByQuality(product.product.productImage[0], 'medium')}`}
                                                                                    alt={product.product.productImage[0].filename}
                                                                                    height={80}
                                                                                    className="img-fluid mx-auto d-block"
                                                                                    data-zoom={`${product.product.productImage[0].path}`}
                                                                                    styles={{height: '83px', borderRadius: '8px'}}
                                                                            />
                                                                        </div>
                                                                    </HtmlTooltip>
                                                                </Col>
                                                                <Col md={5} className="p-1">
                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <b className="text-info">{product.product.reference}</b>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <Tooltip placement="bottom" title={product.color} aria-label="add">
                                                                                <small> {colorThreeDots(product)}</small>
                                                                            </Tooltip>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <small><span className="font-weight-600">Cantidad:</span> {product.quantity}</small>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <small className="badge rounded-pill bg-soft-info">Talla: {product.size}</small>
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
                                                    <h4 className="card-title text-info"><i className="uil-dollar-alt me-2"> </i> Totales</h4>
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
                            </div>
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
                        <button type="button" className="btn btn-light" onClick={onCloseProductsModal}>Cancelar</button>
                        <Button color="primary" type="button" onClick={onAcceptProductsModal}>Guardar</Button>
                    </Col>
                </Row>
            </CustomModal>

        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {products} = state.Product
    const {error, car, order, loading} = state.Order;
    return {error, car, order, products, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
    onUpdateOrder: (id, payload) => dispatch(updateOrder(id, payload)),
    onUpdateCar: (data) => dispatch(updateCard(data)),
    onGetProducts: (ids = []) => dispatch(getProductsByIds(ids)),
    onNextStatusOrder: (id = []) => dispatch(nextStatusOrder({order: id})),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)

OrderDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}