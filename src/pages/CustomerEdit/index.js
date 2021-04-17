import React, {useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getCustomer, registerCustomer, updateCustomer} from "../../store/customer/actions";
import {getMunicipalities, getStates} from "../../store/location/actions";
import Conditionals from "../../common/conditionals";
import {FieldEmail, FieldPhone, FieldSelect, FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const CustomerEdit = (props) => {
    const {getCustomer, customer} = props;
    const [customerData, setCustomerData] = useState({_status: STATUS.ACTIVE});

    // definición de localidades
    const {getStates, states} = props;
    const {getMunicipalities, municipalities} = props;
    const [state, setState] = useState(null);
    const [municipality, setMunicipality] = useState(null);

    const [statesOptions, setStates] = useState([]);
    const [municipalitiesOptions, setMunicipalities] = useState([]);
    const isEdit = props.match.params.id;


    //carga inicial
    useEffect(() => {
        if (isEdit && getCustomer) {
            getCustomer(props.match.params.id);
        }
        getStates();
    }, [getCustomer]);

    //cargar la información del cliente
    useEffect(() => {
        if (customer.id && isEdit) {
            setCustomerData(customer);

            //definir estado por defecto
            const defaultState = customer.state?.id || null;
            setState(defaultState);

            //definir municipalidad por defecto
            const defaultMunicipality = customer.municipality?.id || null;
            setMunicipality(defaultMunicipality);

        }
    }, [customer]);

    //cargar estados
    useEffect(() => {
        if (states && states.length > 0) {
            const itemsConverter = item => ({
                label: item.name,
                value: item.id
            });
            setStates(states.map(itemsConverter));
        } else {
            setStates([]);
        }
    }, [states]);

    //cargar municipios
    useEffect(() => {
        if (municipalities && municipalities.length > 0) {
            const itemsConverter = item => ({
                label: item.name,
                value: item.id
            });
            setMunicipalities(municipalities.map(itemsConverter));
        } else {
            setMunicipalities([]);
        }
    }, [municipalities]);

    useEffect(() => {
        if (state != null) {
            const conditions = new Conditionals.Condition;
            conditions.add('state', state);
            getMunicipalities(conditions.all());
        }
    }, [state]);

    const handleValidSubmit = (event, values) => {
        const data = filteredValues(values);
        console.log(data, values)
        if (!isEdit) {
            props.registerCustomer(data, props.history)
        } else {
            props.updateCustomer(props.match.params.id, data, props.history)
        }
    }

    const filteredValues = (values) => {
        const data = {...values};
        data.state = values.state?.value;
        data.municipality = values.municipality?.value;
        data.status = values._status;
        data.cellphone = values.cellphone ? values.cellphone.replace(/\s/g, '') : '';
        data.phone = values.phone ? values.phone.replace(/\s/g, '') : '';
        delete data._status;
        return data;
    }

    function handleSelectDepartment(option) {
        getMunicipalities(option.value);
        setState(option.value);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/customers" title={customerData.name} item={"Cliente"}/>

                    <AvForm className="needs-validation" autoComplete="off"
                            onValidSubmit={(e, v) => {
                                handleValidSubmit(e, v)
                            }}>
                        <Row>
                            <Col xl="8">
                                <Card>
                                    <CardBody>
                                        <div className={"mt-1 mb-5"} style={{position: "relative"}}>
                                            <div className={"float-end"}>
                                                <Row>
                                                    <Col>
                                                        ¿Activo?
                                                    </Col>
                                                    <Col>
                                                        <FieldSwitch
                                                            value={customerData.status}
                                                            defaultValue={customerData.status}
                                                            name={"_status"}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Nombre</Label>
                                                    <FieldText
                                                        id={"name"}
                                                        name={"name"}
                                                        value={customerData.name}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="validationCustom02">Email</Label>
                                                    <FieldEmail
                                                        name={"email"}
                                                        value={customerData.email}
                                                        required/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="document">Documento</Label>
                                                    <FieldText
                                                        id='document'
                                                        name={"document"}
                                                        value={customerData.document}
                                                        required/>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="phone">Teléfono Residencial</Label>
                                                    <FieldPhone
                                                        id="phone"
                                                        name="phone"
                                                        value={customerData.phone}
                                                        placeholder=""
                                                        type="text"
                                                        errorMessage="Ingrese un número valido (Ejemplo: 00000000)"
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        onChange={(value) => setCustomerData({...customerData, phone: value})}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="cellphone">Teléfono Celular</Label>
                                                    <FieldPhone
                                                        id="cellphone"
                                                        name="cellphone"
                                                        value={customerData.cellphone}
                                                        placeholder=""
                                                        type="text"
                                                        errorMessage="Ingrese un número valido (Ejemplo: 00000000)"
                                                        className="form-control"
                                                        validate={{required: {value: true}}}
                                                        onChange={(value) => setCustomerData({...customerData, cellphone: value})}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="state">Departamento</Label>
                                                    <FieldSelect
                                                        id="state"
                                                        defaultValue={state}
                                                        name={"state"}
                                                        placeholder={"Indique un departamento"}
                                                        options={statesOptions}
                                                        onChange={handleSelectDepartment}
                                                        required
                                                        isSearchable
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="validationCustom03">Municipio</Label>
                                                    <FieldSelect
                                                        id="municipality"
                                                        defaultValue={municipality}
                                                        name={"municipality"}
                                                        placeholder={"Indique un municipio"}
                                                        options={municipalitiesOptions}
                                                        required
                                                        isSearchable
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr/>
                                        {customerData.temporalAddress && (
                                            <Row>
                                                <p className="alert alert-warning">Este cliente tiene una dirección de una versión anterior, es recomendable que por favor agregue la dirección en la parte superior.</p>
                                                <Col md="12">
                                                    <div className="mb-3">
                                                        <h4>Dirección temporal</h4>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationCustom04">Departamento temporal</Label>
                                                        <div className="form-control">
                                                            {customerData.temporalAddress.state}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationCustom04">Municipio temporal</Label>
                                                        <div className="form-control">
                                                            {customerData.temporalAddress.municipality}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row>
                                            <Col>
                                                <div className="mb-3">
                                                    <AvField
                                                        checked={customerData.hasNotification ? true : false}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="hasNotification"
                                                        label="Recibe notificaciones"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} className="text-right">
                                                <ButtonSubmit loading={props.loading}/>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </AvForm>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {error, customer, loading} = state.Customer
    const {states, municipalities} = state.Location
    return {error, customer, states, municipalities, loading}
}

export default withRouter(
    connect(mapStateToProps, {apiError, registerCustomer, updateCustomer, getCustomer, getStates, getMunicipalities})(CustomerEdit)
)

CustomerEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

