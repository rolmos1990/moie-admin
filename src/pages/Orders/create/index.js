import React, {useState, useEffect} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {Button, Card} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import OrderCustomer from "./orderCustomer";
import OrderProducts from "./orderProducts";
import OrderCar from "./orderCar";

const CreateOrder = (props) => {
    const {estado} = props;
    const [products, setProducts] = useState([]);
    const [delivery, setDelivery] = useState(0);

    const onSelectCustomer = (customer) => {
        console.log('onSelectCustomer', customer)
    }
    const onSelectProduct = (product) => {
        console.log('onSelectProduct', product)
        setProducts([...products, product]);
    }
    const onSelectDeliveryOptions = (deliveryOptions) => {
        console.log('onSelectDeliveryOptions', deliveryOptions)
        setDelivery(0);
    }

    const createOrder = (event, values) => {
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
                                    options
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
                                    <OrderCar products={products} delivery={delivery}/>
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

export default withRouter(
    connect(mapStateToProps, {apiError})(CreateOrder)
)

CreateOrder.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

