import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {formatDate} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {getCustomer} from "../../store/customer/actions";
import OrderCardList from "../Orders/OrderCardList";
import {STATUS_COLORS, StatusField} from "../../components/StatusField";
import {ConverterCustomerStatus} from "../Customer/customer_status";
import CustomerObservations from "./CustomerObservations";
import {hasCustomerOpenOrders} from "../../helpers/service";

const CustomerDetail = (props) => {

    const {onGetCustomer, customer} = props;
    const [customerData, setCustomerData] = useState({});
    const [hasPendingOrders, setHasPendingOrders] = useState(false);

    useEffect(() => {
        onGetCustomer(props.match.params.id);
        hasCustomerOpenOrders(customer.id).then(resp => setHasPendingOrders(resp && resp.data && resp.data.length > 0));
    }, [onGetCustomer]);

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
        }
    }, [customer]);

    return customerData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid className="pb-3">
                    <Breadcrumb hasBack path="/customers" title={customerData.name} item={"Cliente"}/>
                    <Row>
                        <Col md={7}>
                            <Card id={'details'} className="mb-3 p-3">

                                <Row>
                                    <Col xs={10}>
                                        <h4 className="card-title text-info">Descripción del cliente</h4>
                                    </Col>
                                    <Col md={2} className="text-right">
                                        <li className="list-inline-item">
                                            <Link to={`/customer/${customerData.id}`} className="px-2 text-primary">
                                                <i className="uil uil-pen font-size-18"> </i>
                                            </Link>
                                        </li>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <label>Nombre: </label>
                                        <span className="p-1">{customerData.name}</span>
                                        {customerData.isMayorist === true && (
                                            <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                                                <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                                            </Tooltip>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <label>Documento: </label>
                                        <span className="p-1">{customerData.document}</span>
                                    </Col>

                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs={12}>
                                        <h4 className="card-title text-info">Datos de contacto</h4>
                                    </Col>
                                    <Col md={6}>
                                        <label>Email: </label>
                                        <span className="p-1">{customerData.email}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Teléfono Celular: </label>
                                        <span className="p-1">{customerData.cellphone}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Teléfono Residencial: </label>
                                        <span className="p-1">{customerData.phone}</span>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs={12}>
                                        <h4 className="card-title text-info">Localidad</h4>
                                    </Col>
                                    <Col md={6}>
                                        <label>Departamento: </label>
                                        <span className="p-1">{customerData.state?.name}</span>
                                    </Col>
                                    <Col md={6}>
                                        <label>Municipio: </label>
                                        <span className="p-1">{customerData.municipality?.name}</span>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs={12} className="footer-details">
                                        {customerData.hasNotification && (
                                            <Tooltip placement="bottom" title="Recibe notificaciones" aria-label="add">
                                                <span className="badge rounded-pill bg-info font-size-12 p-2"><i className="fa fa-envelope"> </i></span>
                                            </Tooltip>
                                        )}
                                        <Tooltip placement="bottom" title="Estado" aria-label="add">
                                            <StatusField color={customerData.status === true ? STATUS_COLORS.SUCCESS : STATUS_COLORS.DANGER}>
                                                {ConverterCustomerStatus(customerData.status)}
                                            </StatusField>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="Fecha creación" aria-label="add">
                                            <small className="badge rounded-pill bg-light p-2">{formatDate(customerData.createdAt)}</small>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                {hasPendingOrders && (
                                    <Row>
                                        <Col>
                                            <div className="alert alert-warning mb-0 mt-3"><i className="uil uil-exclamation-triangle"> </i> Este cliente tiene pedidos por completar.</div>
                                        </Col>
                                    </Row>
                                )}
                            </Card>
                            <CustomerObservations customerId={customerData.id}/>
                        </Col>
                        <Col md={5}>
                            <Card id={'orders'} className="p-3">
                                <OrderCardList customerId={customerData.id}/>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, customer, loading} = state.Customer
    const {fieldOptions} = state.FieldOption
    return {error, customer, fieldOptions, loading}
}

const mapDispatchToProps = dispatch => ({
    hasCustomerOpenOrders,
    onGetCustomer: (id) => dispatch(getCustomer(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)
)

CustomerDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}