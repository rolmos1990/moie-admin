import React, {useEffect, useState} from "react"
import {Col, Label, Row} from "reactstrap"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FieldNumber, FieldSelect} from "../../../components/Fields";
import {getProduct} from "../../../store/product/actions";
import {AvForm} from "availity-reactstrap-validation";
import {getFieldOptionByGroup} from "../../../store/fieldOptions/actions";
import {DELIVERY_METHODS_PAYMENT_TYPES, DELIVERY_TYPES, GROUPS, PAYMENT_TYPES} from "../../../common/constants";
import {getDeliveryMethods, getDeliveryQuote, updateCard} from "../../../store/order/actions";
import {getEmptyOptions} from "../../../common/converters";
import {Button} from "@material-ui/core";

const OrderDeliveryOptions = (props) => {
    const {onUpdateCar, car, fieldOptions, onGetFieldOptions, onGetDeliveryMethods, onGetDeliveryQuote, deliveryMethods, deliveryQuote,
        showAsModal, onCloseModal, onAcceptModal, pOriginOrder} = props;

    const [initComponent, setInitComponent] = useState(true);
    const [deliveryMethodList, setDeliveryMethodList] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [originOrders, setOriginOrders] = useState([]);
    const [originOrder, setOriginOrder] = useState(pOriginOrder || null);
    const [orderTypes, setOrderTypes] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [paymentTypes, setPaymentTypes] = useState(null);
    const [paymentType, setPaymentType] = useState(null);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [pieceToChange, setPieceToChange] = useState(0);
    const [showPaymentType, setShowPaymentType] = useState(false);
    const [productQty, setProductQty] = useState(0);

    //Carga inicial
    useEffect(() => {
        setOrderTypes([getEmptyOptions(), ...Object.keys(DELIVERY_TYPES).map(k => ({label: DELIVERY_TYPES[k].label, value: DELIVERY_TYPES[k].id}))]);
        setPaymentTypes([getEmptyOptions(), ...Object.keys(PAYMENT_TYPES).map(k => ({label: PAYMENT_TYPES[k], value: PAYMENT_TYPES[k]}))]);
        onGetFieldOptions();
        onGetDeliveryMethods();
        if(car.reset){
            setDeliveryMethod(null);
            setOriginOrder(null);
            setOrderType(null);
            setPaymentType(null);
            setDeliveryCost(0);
            setPieceToChange(0);
            setShowPaymentType(false);
            setProductQty(0);
        }
    }, [onGetFieldOptions, car.reset]);

    useEffect(() => {
        const list = fieldOptions || [];
        setOriginOrders([getEmptyOptions(), ...list.filter(op => (op.groups === GROUPS.ORDERS_ORIGIN)).map(op => ({label: op.name, value: op.name}))]);
    }, [fieldOptions]);

    useEffect(() => {
        const list = deliveryMethods || [];
        const ot = orderType +'';
        setDeliveryMethodList([getEmptyOptions(), ...list.filter(op => (op.settings.includes(ot))).map(op => ({label: op.name, value: op.code}))]);
        onChangeDeliveryOptions();
    }, [orderType]);

    useEffect(() => {
        if (deliveryMethod) {
            setShowPaymentType(DELIVERY_METHODS_PAYMENT_TYPES.includes(deliveryMethod));
            getQuote();
            onChangeDeliveryOptions();
        }
    }, [deliveryMethod]);

    useEffect(() => {
        if (deliveryMethod && deliveryQuote) {
            setDeliveryCost(parseFloat(deliveryQuote.amount || 0));
            onChangeDeliveryOptions();
        }
    }, [deliveryQuote]);

    useEffect(() => {
        onChangeDeliveryOptions();
    }, [deliveryCost]);

    useEffect(() => {
        getQuote();
    }, [car.products]);

    useEffect(() => {
        if(car.deliveryOptions && car.deliveryOptions.origin && initComponent){
            setInitComponent(false);

            setDeliveryMethod(car.deliveryOptions.method);
            setOriginOrder(car.deliveryOptions.origin);
            setOrderType(car.deliveryOptions.method);
            setPaymentType(car.deliveryOptions.paymentType);
            setDeliveryCost(car.deliveryOptions.cost);
            setPieceToChange(car.deliveryOptions.pieces);
            setShowPaymentType(DELIVERY_METHODS_PAYMENT_TYPES.includes(car.deliveryOptions.method));
            //getQuote()
        }
    }, [car.deliveryOptions]);

    const getQuote = () => {
        let qty = 0;
        car.products.forEach(prod => (qty += prod.quantity));
        if (qty > 0 && deliveryMethod && (qty !== productQty || car.deliveryOptions.method !== deliveryMethod)) {
            setProductQty(qty);
            let products = car.products.map(prod => ({id: prod.origin.id, qty: prod.quantity}));
            onGetDeliveryQuote({deliveryType: orderType, deliveryMethodCode: deliveryMethod, products});
        }
    }

    const onChangeDeliveryOptions = () => {
        let deliveryOps = {origin: originOrder, type: orderType, method: deliveryMethod, cost: parseFloat(deliveryCost) || 0, paymentType: paymentType, pieces: pieceToChange};
        onUpdateCar({...car, deliveryOptions: deliveryOps});
    }

    const acceptModal = () => {
        onAcceptModal(car);
    }

    return (
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off">
                <Row>
                    <Col>
                        <h5 className="text-info"><i className="uil-shopping-cart-alt me-2"> </i> Opciones de envio</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Label htmlFor="weight">Origen del pedido</Label>
                        <FieldSelect
                            id={"originOrder"}
                            name={"originOrder"}
                            options={originOrders}
                            defaultValue={originOrder}
                            onChange={(item => setOriginOrder(item.value))}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Label htmlFor="weight">Tipo de pedido</Label>
                        <FieldSelect
                            id={"orderType"}
                            name={"orderType"}
                            options={orderTypes}
                            defaultValue={orderType}
                            onChange={(item => setOrderType(item.value))}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Label htmlFor="weight">Metodo de envio</Label>
                        <FieldSelect
                            id={"deliveryMethod"}
                            name={"deliveryMethod"}
                            options={deliveryMethodList}
                            defaultValue={deliveryMethod}
                            onChange={(item => setDeliveryMethod(item.value))}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Label htmlFor="weight">Costo del envio</Label>
                        <FieldNumber
                            id={"deliveryCost"}
                            name={"deliveryCost"}
                            value={deliveryCost}
                            disabled={deliveryQuote.hasCharge}
                            onChange={(item => setDeliveryCost(item.target.value))}
                            required/>
                    </Col>
                    {showPaymentType && (
                        <>
                            <Col md={6}>
                                <Label htmlFor="weight">Forma de pago</Label>
                                <FieldSelect
                                    id={"paymentType"}
                                    name={"paymentType"}
                                    options={paymentTypes}
                                    defaultValue={paymentType}
                                    onChange={(item => setPaymentType(item.value))}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <Label htmlFor="weight">Piezas para cambio</Label>
                                <FieldNumber
                                    id={"pieceToChange"}
                                    name={"pieceToChange"}
                                    value={pieceToChange}
                                    onChange={(item => setPieceToChange(item.target.value))}
                                    required/>
                            </Col>
                        </>
                    )}

                </Row>
            </AvForm>
            {showAsModal  && (
                <Row>
                    <Col md={12} className="text-right">
                        {onCloseModal && (
                            <button type="button" className="btn btn-light" onClick={() => props.onCloseModal()}>Cancelar</button>
                        )}
                        {onAcceptModal && (
                            <Button color="primary" type="button" onClick={() => acceptModal()}>Guardar</Button>
                        )}
                    </Col>
                </Row>
            )}

        </React.Fragment>
    )
}

OrderDeliveryOptions.propTypes = {
    history: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
    onGetProduct: (id) => dispatch(getProduct(id)),
    onGetFieldOptions: (conditional = null, limit = 500, page) => dispatch(getFieldOptionByGroup([GROUPS.ORDERS_ORIGIN], limit, page)),
    onGetDeliveryMethods: (conditional = null, limit = 50, page) => dispatch(getDeliveryMethods(conditional, limit, page)),
    onGetDeliveryQuote: (request) => dispatch(getDeliveryQuote(request)),
    onUpdateCar: (data) => dispatch(updateCard(data)),
})

const mapStateToProps = state => {
    const {fieldOptions, refresh} = state.FieldOption
    const {car, deliveryMethods, deliveryQuote} = state.Order
    return {car, deliveryMethods: deliveryMethods.data, deliveryQuote: deliveryQuote.data, fieldOptions};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDeliveryOptions))
