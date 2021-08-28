import React, {useEffect, useState} from "react"
import {Col, Row} from "reactstrap"
import {Button, Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {copyToClipboard, getImageByQuality, priceFormat, printPartOfPage, threeDots} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";

import {getOrder, nextStatusOrder, printOrder, resumeOrder, updateCard, updateOrder} from "../../store/order/actions";
import CustomModal from "../../components/Modal/CommosModal";
import OrderDeliveryOptions from "./create/orderDeliveryOptions";
import {COMMENT_ENTITIES, DELIVERY_METHODS_PAYMENT_TYPES, DELIVERY_TYPES, GROUPS, ORDER_STATUS, PAYMENT_TYPES} from "../../common/constants";
import {map} from "lodash";
import Images from "../../components/Common/Image";
import OrderCustomer from "./create/orderCustomer";
import OrderProducts from "./create/orderProducts";
import OrderCar from "./create/orderCar";
import {getProductsByIds} from "../../store/product/actions";
import {HtmlTooltip} from "../../components/Common/HtmlTooltip";

import {StatusField} from "../../components/StatusField";
import * as htmlToImage from 'html-to-image';
import Observations from "../../components/Common/Observations";
import {isMobile} from "react-device-detect";

// import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';


const OrderEdit = (props) => {

    const {orderId, onGetOrder, onUpdateCar, onUpdateOrder, onCloseOverlay, onNextStatusOrder, onResumeOrder, onPrintOrder, print, resume, order, car, refresh, showOrderOverlay = false} = props;
    const [orderData, setOrderData] = useState({});
    const [orderResume, setOrderResume] = useState('');
    const [showAsTable, setShowAsTable] = useState(false);
    const [orderPrint, setOrderPrint] = useState('');
    const [downloadingPhoto, setDownloadingPhoto] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [openPrintConfirmModal, setOpenPrintConfirmModal] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [openDeliveryModal, setOpenDeliveryModal] = useState(false);
    const [openProductsModal, setOpenProductsModal] = useState(false);

    const productSummaryRef = React.createRef();

    useEffect(() => {
        if (orderId) {
            onGetOrder(orderId);
        }
    }, [orderId, refresh]);

    useEffect(() => {
        if (order && order.id) {
            onResumeOrder(order.id);
            onPrintOrder(order.id);

            const orderDelivery = order.orderDelivery;

            let newCar = {
                ...car,
                orderId: order.id,
                customer: {id: order.customer.id},
                deliveryOptions: {
                    origin: order.origen,
                    type: orderDelivery.deliveryType,
                    method: order.deliveryMethod.name,
                    cost: parseFloat(orderDelivery.deliveryCost) || 0,
                    paymentType: order.paymentMode,
                    pieces: order.piecesForChanges || 0,
                    tracking: orderDelivery.tracking || '',
                    deliveryLocality: orderDelivery.deliveryLocality.id || null
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

            //setShowAsTable(order.orderDetails.length > 8);
            setShowAsTable(isMobile);

        }
        //console.log(order);
    }, [order]);

    useEffect(() => {
        if (resume) {
            setOrderResume(resume);
        }
    }, [resume]);

    useEffect(() => {
        if (print) {
            setOrderPrint(print);
        }
    }, [print]);

    const copyResume = () => {
        copyToClipboard(resume);
    }

    const printOrder = () => {
        printPartOfPage(orderPrint);
        setTimeout(() => setOpenPrintConfirmModal(true), 3000);
    }

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
                tracking: car.deliveryOptions.tracking,
                deliveryLocality: car.deliveryOptions.deliveryLocality,
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

    const takePhoto = () => {
        setDownloadingPhoto(true);
        htmlToImage.toPng(productSummaryRef.current)
            .then(function (dataUrl) {
                setDownloadingPhoto(false);
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

    const onConfirmPrintOrder = () => {
        setOpenPrintConfirmModal(false);
        onNextStatusOrder(order.id);
    }

    const getDeliveryAddress = (orderDelivery) => {
        let address = null;
        if (orderDelivery.deliveryState) {
            address = orderDelivery.deliveryState;
        }
        if (orderDelivery.deliveryMunicipality) {
            address = (address ? address + '/' : '') + orderDelivery.deliveryMunicipality;
        }
        return address ? address : '';
    }

    return orderData.id ? (
        <div className={showOrderOverlay ? 'orderDetail-overlay pt-2' : ''}>
            <Row className="mb-2">
                <Col md={12}>
                    <div className={"mb-3 float-md-start"}>
                        {showOrderOverlay && (
                            <>
                                <Tooltip placement="bottom" title="Ocultar" aria-label="add">
                                    <button className="btn btn-outline-default mr-5" onClick={() => onCloseOverlay()}>
                                        <i className="uil uil-arrow-to-right font-size-16"> </i>
                                    </button>
                                </Tooltip>
                                <small className="badge rounded-pill bg-info font-size-14 mr-5 p-2">Pedido# {order.id}</small>
                            </>
                        )}
                        <StatusField color={ORDER_STATUS[order.status].color} className={"font-size-14 mr-5"}>
                            {ORDER_STATUS[order.status].name}
                        </StatusField>
                        <small className="badge rounded-pill bg-soft-info font-size-14 mr-5 p-2">Operador: {order.user?.name}</small>
                    </div>
                    <div className={"mb-3 float-md-end"}>
                        <div className="button-items">
                            {(order && (order.status === 1 || order.status === 2)) && (
                                <Tooltip placement="bottom" title="Anular" aria-label="add">
                                    <button type="button" color="primary" className="btn-sm btn btn-outline-danger waves-effect waves-light">
                                        <i className={"mdi mdi-delete"}> </i>
                                    </button>
                                </Tooltip>
                            )}
                            {(order && order.status === 1) && (
                                <Tooltip placement="bottom" title="Confirmar" aria-label="add">
                                    <button type="button" color="primary" className="btn-sm btn btn-outline-success waves-effect waves-light" onClick={() => onNextStatusOrder(order.id)}>
                                        <i className={"mdi mdi-check"}> </i>
                                    </button>
                                </Tooltip>
                            )}
                            {(order && order.status === 3) && (
                                <Tooltip placement="bottom" title="Confirmar envio" aria-label="add">
                                    <button type="button" color="primary" className="btn-sm btn btn-outline-success waves-effect waves-light" onClick={() => onNextStatusOrder(order.id)}>
                                        <i className={"mdi mdi-check"}> </i>
                                    </button>
                                </Tooltip>
                            )}
                            {(order && order.status < 5) && (
                                <Tooltip placement="bottom" title="Imprimir" aria-label="add">
                                    <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => printOrder()}>
                                        <i className={"mdi mdi-printer"}> </i>
                                    </button>
                                </Tooltip>

                            )}
                            <Tooltip placement="bottom" title="Copiar resumen" aria-label="add">
                                <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => copyResume()}>
                                    <i className={"mdi mdi-content-copy"}> </i>
                                </button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Descargar foto" aria-label="add">
                                <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => takePhoto()}>
                                    <i className={"mdi mdi-camera"}> </i> {downloadingPhoto ? 'Descargando...' : ''}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={showOrderOverlay ? 12 : 4}>
                    <Row>
                        <Col md={showOrderOverlay ? 6 : 12} className="mb-3">
                            <Card id={'customer-detail'} className="p-3">
                                <Row>
                                    <Col xs={10}>
                                        <h4 className="card-title text-info"><i className="uil-users-alt me-2"> </i> Datos del cliente</h4>
                                    </Col>
                                    <Col xs={2} className="text-right">
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
                        <Col md={showOrderOverlay ? 6 : 12} className="mb-3">
                            <Card id={'delivery-options'} className="p-3">
                                <Row>
                                    <Col xs={10}>
                                        <h4 className="card-title text-info"><i className="uil uil-truck"> </i> Datos de envio</h4>
                                    </Col>
                                    <Col xs={2} className="text-right">
                                        <Tooltip placement="bottom" title="Editar envio" aria-label="add">
                                            <button type="button"
                                                    size="small"
                                                    className="btn btn-sm text-primary"
                                                    onClick={toggleDeliveryModal}>
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
                                        <span className="p-1">{getDeliveryType(orderData?.orderDelivery?.deliveryType)}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Metodo de envio: </label>
                                        <span className="p-1">{orderData.deliveryMethod.name}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Costo del envio: </label>
                                        <span className="p-1">{orderData?.orderDelivery?.deliveryCost}</span>
                                    </Col>
                                    {DELIVERY_METHODS_PAYMENT_TYPES.includes(orderData.deliveryMethod.name) && (
                                        <>
                                            <Col md={12}>
                                                <label>Forma de pago: </label>
                                                <span className="p-1">{getPaymentType()}</span>
                                            </Col>
                                            <Col md={12}>
                                                <label>Prendas para cambio: </label>
                                                <span className="p-1">{orderData.piecesForChanges || 0}</span>
                                            </Col>
                                        </>
                                    )}
                                    <Col md={12}>
                                        <label>Dirección del envio: </label>
                                        <span className="p-1">{orderData.orderDelivery?.deliveryLocality?.name}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={showOrderOverlay ? 12 : 8}>
                    <div id={"products-summary"} ref={productSummaryRef}>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Card id={'products'} className="p-3">
                                    <Row className="mb-2">
                                        <Col xs={6}>
                                            <h4 className="card-title text-info"><i className="uil-box me-2"> </i> Productos</h4>
                                        </Col>
                                        <Col xs={6} className="text-right">
                                            {!isMobile && (
                                                <>
                                                    <Tooltip placement="bottom" title="Mostar como tabla" aria-label="add">
                                                        <button type="button"
                                                                size="small"
                                                                className="btn btn-sm text-primary"
                                                                onClick={() => {
                                                                    setShowAsTable(true);
                                                                }}>
                                                            <i className="fa fa-list font-size-18"> </i>
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip placement="bottom" title="Mostrar como tarjetas" aria-label="add">
                                                        <button type="button"
                                                                size="small"
                                                                className="btn btn-sm text-primary"
                                                                onClick={() => {
                                                                    setShowAsTable(false);
                                                                }}>
                                                            <i className="fa fa-th font-size-18"> </i>
                                                        </button>
                                                    </Tooltip>
                                                </>
                                            )}
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
                                    {!showAsTable && (
                                        <Row>
                                            {map(orderData.orderDetails, (product, k) => (
                                                <div key={k} className="col-md-6 mb-2">
                                                    <div className="prod-box">
                                                        <Row>
                                                            <Col xs={2} className="text-center" style={{padding: '2px 0 2px 8px'}}>
                                                                <div className={`border-1`} id={`product-${k}`} role="tabpanel">
                                                                    <Images src={`${getImageByQuality(product.product.productImage[0], 'medium')}`}
                                                                            alt={""}
                                                                            height={80}
                                                                            className="img-fluid d-block"
                                                                            styles={{height: '83px', width: '53px', borderRadius: '8px', 'margin-left': '4px'}}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col xs={5} className="p-1">
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <HtmlTooltip
                                                                            placement={'right-end'}
                                                                            title={
                                                                                <React.Fragment>
                                                                                    <Images src={`${getImageByQuality(product.product.productImage.length > 0 ? product.product.productImage[0] : {}, 'medium')}`}
                                                                                            alt={""}
                                                                                            height={120}
                                                                                            className="img-fluid mx-auto d-block tab-img rounded"/>
                                                                                </React.Fragment>
                                                                            }>
                                                                            <b className="text-info">{product.product.reference}</b>
                                                                        </HtmlTooltip>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <Tooltip placement="bottom" title={product.color} aria-label="add">
                                                                            <small> {threeDots(product.color, 22)}</small>
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
                                                            <Col xs={5} className="p-1">
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <small><span className="font-weight-600">Precio:</span> {priceFormat(product.price)}</small>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <small><span className="font-weight-600">Desc.:</span> <span
                                                                            className="text-danger">-{priceFormat(product.discount)} ({product.discountPercentage}%)</span></small>
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
                                    )}
                                    {showAsTable && (
                                        <Row>
                                            <Col md={12}>
                                                <table className="table table-sm table-striped table-bordered table-centered table-nowrap font-size-11">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center">Código</th>
                                                        <th className="text-center">Color</th>
                                                        <th className="text-center">Talla</th>
                                                        <th className="text-center">Cantidad</th>
                                                        <th className="text-center">Precio Unit.</th>
                                                        <th className="text-center">% Desc.</th>
                                                        <th className="text-center">Total Desc.</th>
                                                        <th className="text-center">SubTotal</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {map(orderData.orderDetails, (product, key) => (
                                                        <tr key={key}>
                                                            <td style={{width: '10%'}}>
                                                                <HtmlTooltip
                                                                    title={
                                                                        <React.Fragment>
                                                                            <Images src={`${getImageByQuality(product.product.productImage.length > 0 ? product.product.productImage[0] : {}, 'medium')}`}
                                                                                    alt={product.product.reference}
                                                                                    height={100}
                                                                                    className="img-fluid mx-auto d-block tab-img rounded"/>
                                                                        </React.Fragment>
                                                                    }>
                                                                    <div className="text-info">{product.product.reference}</div>
                                                                </HtmlTooltip>
                                                            </td>
                                                            <td style={{width: '25%'}} className="text-start">{product.color}</td>
                                                            <td style={{width: '15%'}} className="text-center">{product.size}</td>
                                                            <td style={{width: '10%'}} className="text-center">{product.quantity}</td>
                                                            <td style={{width: '10%'}} className="text-end">{priceFormat(product.price)}</td>
                                                            <td style={{width: '10%'}} className="text-center">{product.discountPercentage || 0}%</td>
                                                            <td style={{width: '10%'}} className="text-end">{priceFormat(product.discount)}</td>
                                                            <td style={{width: '15%'}} className="text-end">{priceFormat(product.total)}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card id={'summary-detail'} className="p-3">
                                    <Row>
                                        <Col md={12}>
                                            <h4 className="card-title text-info"><i className="uil uil-bill"> </i> Totales</h4>
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
                                                        <td className="text-end">{priceFormat(orderData.orderDelivery.deliveryCost)}</td>
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

            <Row className="mb-3">
                <Col md={12}>
                    <Card id={'order-tabs'} className="p-3">
                        <ul className="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="false" onClick={() => setActiveTab(1)}>
                                    <span className="d-block d-sm-none"><i className="fas fa-home"> </i></span>
                                    <span className="d-none d-sm-block">Historial</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false" onClick={() => setActiveTab(2)}>
                                    <span className="d-block d-sm-none"><i className="far fa-user"> </i></span>
                                    <span className="d-none d-sm-block">Observaciones del pedido</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 3 ? 'active' : ''}`} data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false" onClick={() => setActiveTab(3)}>
                                    <span className="d-block d-sm-none"><i className="far fa-user"> </i></span>
                                    <span className="d-none d-sm-block">Observaciones del cliente</span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content p-3 text-muted">
                            <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} id="tab1" role="tabpanel">
                                <p className="mb-0">
                                    <table className="table table-sm table-striped table-bordered table-centered table-nowrap">
                                        <thead>
                                        <tr>
                                            <th className="text-center">Estado</th>
                                            <th className="text-center">Usuario</th>
                                            <th className="text-center">Fecha</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan={3}>
                                                No se encontraron datos.
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </p>
                            </div>
                            <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} id="tab2" role="tabpanel">
                                <Observations
                                    entitySuggested={GROUPS.ORDER_OBSERVATIONS}
                                    entity={COMMENT_ENTITIES.ORDER}
                                    entityId={orderData.id}/>
                            </div>
                            <div className={`tab-pane ${activeTab === 3 ? 'active' : ''}`} id="tab2" role="tabpanel">
                                <Observations
                                    entitySuggested={GROUPS.CUSTOMER_OBSERVATIONS}
                                    entity={COMMENT_ENTITIES.CUSTOMER}
                                    entityId={orderData.customer?.id}/>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <CustomModal title={"Confirmar"} showFooter={false} isOpen={order.status === 2 && openPrintConfirmModal} onClose={() => setOpenPrintConfirmModal(false)}>
                <Row>
                    <Col md={12}>
                        ¿Logró imprimir el pedido?
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12} className="text-right">
                        <button type="button" className="btn btn-light" onClick={() => setOpenPrintConfirmModal(false)}>NO</button>
                        <Button color="primary" type="button" onClick={onConfirmPrintOrder}>SI</Button>
                    </Col>
                </Row>
            </CustomModal>

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

        </div>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {products} = state.Product
    const {error, car, order, loading, custom, refresh} = state.Order;
    const print = custom.data && custom.data.print ? custom.data.print : null;
    const resume = custom.data && custom.data.resume ? custom.data.resume : null;
    return {error, car, order, products, print, resume, loading, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetOrder: (id) => dispatch(getOrder(id)),
    onUpdateOrder: (id, payload) => dispatch(updateOrder(id, payload)),
    onUpdateCar: (data) => dispatch(updateCard(data)),
    onGetProducts: (ids = []) => dispatch(getProductsByIds(ids)),
    onNextStatusOrder: (id = []) => dispatch(nextStatusOrder({order: id})),
    onResumeOrder: (id = []) => dispatch(resumeOrder(id)),
    onPrintOrder: (id = []) => dispatch(printOrder(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderEdit)
)

OrderEdit.propTypes = {
    orderId: PropTypes.number.isRequired,
    showOrderOverlay: PropTypes.bool,
    onCloseOverlay: PropTypes.func,
    error: PropTypes.any,
    history: PropTypes.object
}
