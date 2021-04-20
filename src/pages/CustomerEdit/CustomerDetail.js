import React, {useState, useEffect} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvForm, AvField} from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getState, registerState, updateState} from "../../store/location/actions";
import {FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import Images from "../../components/Common/Image";
import {formatDate} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {getCustomer} from "../../store/customer/actions";

const CustomerDetail = (props) => {

    const {getCustomer, customer} = props;
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        getCustomer(props.match.params.id);
    }, [getCustomer]);

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
        }
    }, [customer]);

    return customerData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/customers" title={customerData.name} item={"Cliente"}/>
                    <Card id={'details'} className="p-4">
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col xs={10}>
                                        <h4 className="card-title">Descripción del cliente</h4>
                                    </Col>
                                    <Col md={2} className="text-right">
                                        <li className="list-inline-item">
                                            <Link to={`/customer/${customerData.id}`} className="px-2 text-primary">
                                                <i className="uil uil-pen font-size-18"> </i>
                                            </Link>
                                        </li>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <label>Nombre: </label>
                                <span className="p-1">{customerData.name}</span>
                            </Col>
                            <Col md={4}>
                                <label>Documento: </label>
                                <span className="p-1">{customerData.document}</span>
                            </Col>
                            <Col md={4}>
                                <label>¿Es mayorista?: </label>
                                <span className="p-1">{customerData.isMayorist ? 'Si' : 'No'}</span>
                            </Col>
                            <Col md={4}>
                                <label>¿Recibe notificaciones?: </label>
                                <span className="p-1">{customerData.hasNotification ? 'Si' : 'No'}</span>
                            </Col>
                            <Col md={4}>
                                <label>Estatus: </label>
                                <span className="p-1">{customerData.status ? 'Activo' : 'Inactivo'}</span>
                            </Col>
                            <Col md={4}>
                                <label>Fecha creación: </label>
                                <span className="p-1">{formatDate(customerData.createdAt)}</span>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xs={12}>
                                <h4 className="card-title">Datos de contacto</h4>
                            </Col>
                            <Col md={4}>
                                <label>Email: </label>
                                <span className="p-1">{customerData.email}</span>
                            </Col>
                            <Col md={4}>
                                <label>Teléfono Celular: </label>
                                <span className="p-1">{customerData.cellphone}</span>
                            </Col>
                            <Col md={4}>
                                <label>Teléfono Residencial: </label>
                                <span className="p-1">{customerData.phone}</span>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xs={12}>
                                <h4 className="card-title">Localidad</h4>
                            </Col>
                            <Col md={4}>
                                <label>Departamento: </label>
                                <span className="p-1">{customerData.state?.name}</span>
                            </Col>
                            <Col md={4}>
                                <label>Municipio: </label>
                                <span className="p-1">{customerData.municipality?.name}</span>
                            </Col>
                        </Row>
                    </Card>
                </Container>

            </div>
        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, customer, loading} = state.Customer
    return {error, customer, loading}
}

export default withRouter(
    connect(mapStateToProps, {getCustomer})(CustomerDetail)
)

CustomerDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}