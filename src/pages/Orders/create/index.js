import React, {useState, useEffect} from "react"
import {CardBody, Col, Container, Row} from "reactstrap"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import OrderCustomer from "./orderCustomer";
import OrderProducts from "./orderProducts";
import OrderCar from "./orderCar";
import OrderDeliveryOptions from "./orderDeliveryOptions";
import {resetCustomer} from "../../../store/customer/actions";
import {resetProduct} from "../../../store/product/actions";
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import OrderSummary from "./orderSummary";
import {resetCar} from "../../../store/order/actions";

const CreateOrder = (props) => {
    const {onResetOrder, car, history} = props;
    const [initComponent, setInitComponent] = useState(true);
    const [isValidOrder, setIsValidOrder] = useState(false);

    useEffect(() => {
        if (initComponent) {
            onResetOrder();
            setInitComponent(false);
        }
    }, [initComponent]);

    useEffect(() => {
        if (car) {
            const isValidCustomer = !!car.customer.id;
            const isValidProducts = car.products.length > 0;
            const isValidDeliveryOptions = car.deliveryOptions && car.deliveryOptions.origin && car.deliveryOptions.type && car.deliveryOptions.method;
            setIsValidOrder(isValidCustomer && isValidProducts && isValidDeliveryOptions);
        }
    }, [car]);

    const onCancelOrder = () => {
        ConfirmationModalAction({
            title: 'Confirmación',
            description: '¿Seguro desea cancelar el pedido?',
            id: '_OrderModal',
            onConfirm: () => {
                onResetOrder();
            }
        });
    }

    const onCreateOrder = () => {
        console.log('onCreateOrder car', car);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/orders" title="Crear pedido" item={"Pedido"}/>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <OrderCustomer/>
                                </Col>
                            </Row>
                            <hr/>
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
                                <Col md={12}>
                                    <OrderDeliveryOptions/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12}>
                                    <OrderSummary />
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12} className="text-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-light text-danger" onClick={() => onCancelOrder()}>
                                            Cancelar
                                        </button>
                                        <button type="button" className="btn btn-primary" disabled={!isValidOrder} onClick={() => onCreateOrder()}>
                                            <i className="uil uil-shopping-cart-alt me-2"> </i> Crear pedido
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {car, loading} = state.Order
    return {car, loading}
}

const mapDispatchToProps = dispatch => ({
    onResetOrder: () => {
        dispatch(resetCustomer());
        dispatch(resetProduct());
        dispatch(resetCar());
    }
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
)

CreateOrder.propTypes = {
    onResetOrder: PropTypes.func,
    error: PropTypes.any,
    history: PropTypes.object
}