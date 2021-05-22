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
import Observations from "./Observations";
import {deleteFieldOption, getFieldOptionByGroup, registerFieldOption, updateFieldOption} from "../../store/fieldOptions/actions";
import {GROUPS} from "../../common/constants";

const CustomerDetail = (props) => {

    const {onGetCustomer, onGetByGroup, customer, fieldOptions} = props;
    const [customerData, setCustomerData] = useState({});
    const [observationsSuggested, setObservationsSuggested] = useState([]);

    useEffect(() => {
        onGetCustomer(props.match.params.id);
        onGetByGroup(GROUPS.CUSTOMER_OBSERVATIONS);
    }, [onGetCustomer]);

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
        }
    }, [customer]);

    useEffect(() => {
        if (fieldOptions && fieldOptions.length > 0) {
            setObservationsSuggested(fieldOptions.filter(item => item.groups === GROUPS.CUSTOMER_OBSERVATIONS).map(item => item.value))
        }
        console.log(fieldOptions)
    }, [fieldOptions])

    const onDeleteObservation = (observation) => {
        console.log('onDeleteObservation', observation);
    }

    const onAddObservation = (observation) => {
        console.log('onAddObservation', observation);
    }

    return customerData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid className="pb-3">
                    <Breadcrumb hasBack path="/customers" title={customerData.name} item={"Cliente"}/>
                    <Row>
                        <Col md={7}>
                            <Card id={'details'} className="mb-3 p-3">
                                <Row>
                                    <Col md={12}>
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
                            </Card>
                            <Observations
                                observations={[]}
                                onAddObservation={onAddObservation}
                                onDeleteObservation={onDeleteObservation}
                                observationsSuggested={observationsSuggested}/>
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
    return {error, customer,fieldOptions, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetCustomer: (id) => dispatch(getCustomer(id)),
    onGetByGroup: (group) => dispatch(getFieldOptionByGroup(group, 500, 0)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)
)

CustomerDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}