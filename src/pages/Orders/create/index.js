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

const CreateOrder = (props) => {
    const {onResetOrder} = props;
    const [initComponent, setInitComponent] = useState(true);
    const [product, setProduct] = useState({});
    const [customer, setCustomer] = useState({});
    const [delivery, setDelivery] = useState(0);

    useEffect(() => {
        if (initComponent) {
            resetData();
            setInitComponent(false);
        }

    }, [initComponent]);

    const resetData = () => {
        setCustomer({});
        setDelivery(0);
        setProduct({});
        onResetOrder();
    }

    const onSelectCustomer = (c) => {
        console.log('onSelectCustomer', c)
        setCustomer(c);
    }
    const onSelectProduct = (prod) => {
        console.log('onSelectProduct', prod)
        setProduct(prod);
    }
    const onSelectDeliveryOptions = (deliveryOptions) => {
        console.log('onSelectDeliveryOptions', deliveryOptions)
        setDelivery(0);
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
                                    <OrderCustomer onSelect={onSelectCustomer}/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12}>
                                    <OrderDeliveryOptions onChange={onSelectDeliveryOptions}/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12}>
                                    <OrderProducts onSelect={onSelectProduct}/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12}>
                                    <OrderCar productSelected={product} delivery={delivery} onCancel={() => resetData()}/>
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
    const {error, loading} = state.Location
    return {error, loading}
}

const mapDispatchToProps = dispatch => ({
    onResetOrder: () => {
        dispatch(resetCustomer());
        dispatch(resetProduct());
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

