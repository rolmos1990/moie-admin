import React, { useState, useEffect } from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getCustomer, registerCustomer, updateCustomer} from "../../store/customer/actions";
import {getMunicipalities, getStates} from "../../store/location/actions";
import Conditionals from "../../common/conditionals";
import { FieldSwitch, FieldText, FieldEmail, FieldSelect } from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";

const CustomerEdit = (props) => {
    const {getCustomer, customer } = props;
    const [ customerData, setCustomerData ] = useState({});

    // definición de localidades
    const { getStates, states } = props;
    const { getMunicipalities,municipalities } = props;
    const [ state, setState ] = useState(null);
    const [ municipality, setMunicipality ] = useState(null);

    const [ statesOptions, setStates ] = useState([]);
    const [ municipalitiesOptions, setMunicipalities ] = useState([]);
    const isEdit = props.match.params.id;


    //carga inicial
    useEffect(() => {
        if(isEdit && getCustomer){
            getCustomer(props.match.params.id);
        }
        getStates();
    },[getCustomer]);

    //cargar la información del cliente
    useEffect(() => {
        if(customer.id && isEdit) {
            setCustomerData(customer);

            //definir estado por defecto
            const defaultState = customer.state?.id || null;
            setState(defaultState);

            //definir municipalidad por defecto
            const defaultMunicipality = customer.municipality?.id || null;
            setMunicipality(defaultMunicipality);

        }
    },[customer]);

    //cargar estados
    useEffect(() => {
        if(states && states.length > 0) {
            const itemsConverter = item => ({
                label: item.name,
                value: item.id
            });
            setStates(states.map(itemsConverter));
        } else {
            setStates([]);
        }
    },[states]);

    //cargar municipios
    useEffect(() => {
        if(municipalities && municipalities.length > 0) {
            const itemsConverter = item => ({
                label: item.name,
                value: item.id
            });
            setMunicipalities(municipalities.map(itemsConverter));
        } else {
            setMunicipalities([]);
        }
    },[municipalities]);

    useEffect(() => {
        if(state != null) {
            const conditions = new Conditionals.Condition;
            conditions.add('state', state);
            getMunicipalities(conditions.all());
        }
    },[state]);

    const handleValidSubmit = (event, values) => {
            values = filteredValues(values);
            if(!isEdit) {
                props.registerCustomer(values, props.history)
            } else {
                props.updateCustomer(props.match.params.id, values, props.history)
            }
    }

    const filteredValues = (values) => {
        values.state = values.state?.value;
        values.municipality = values.municipality?.value;
        values.status = values._status;
        delete values._status;
        return values;
    }

    function handleSelectDepartment(option) {
        getMunicipalities(option.value);
        setState(option.value);
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/customers" title={customerData.name} breadcrumbItem={"Cliente"} />

                    <AvForm className="needs-validation" autoComplete="off"
                            onValidSubmit={(e, v) => {
                                handleValidSubmit(e, v)
                            }}>
                    <Row>
                        <Col xl="8">
                            <Card>
                                <CardBody>
                                    <div className={"mt-1 mb-5"} style={{ position: "relative" }}>
                                        <div className={"float-end"}>
                                            <Row>
                                                <Col>
                                                    ¿Activo?
                                                </Col>
                                                <Col>
                                                <FieldSwitch
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
                                    <Label htmlFor="field_name">Nombre</Label>
                                    <FieldText name={"name"} value={customerData.name} required id={"field_name"}/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom02">Email</Label>
                                    <FieldEmail
                                    name={"email"}
                                    value={customerData.email}
                                    required />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom05">Teléfono Residencial</Label>
                                    <AvField
                                        name="phone"
                                        value={customerData.phone}
                                        placeholder=""
                                        type="text"
                                        errorMessage="Ingrese un número valido (Ejemplo: 00000000)"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom05"
                                    />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom05">Teléfono Celular</Label>
                                    <AvField
                                        name="celphone"
                                        value={customerData.celphone}
                                        placeholder=""
                                        type="text"
                                        errorMessage="Ingrese un número valido (Ejemplo: 00000000)"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom06"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom04">Departamento</Label>
                                    <FieldSelect
                                        defaultValue={state}
                                        name={"state"}
                                        placeholder={"Indique un departamento"}
                                        options={statesOptions}
                                        required
                                        onChange={handleSelectDepartment}
                                        isSearchable
                                    />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom03">Municipio</Label>
                                    <FieldSelect
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
                        <div className="mb-3">
                            <AvField
                                checked={customerData.hasNotification ? true : false}
                                className="form-check-input"
                                type="checkbox"
                                name="hasNotification"
                                label="Recibe notificaciones" />
                        </div>
                        <Button color="primary" type="submit">
                            {props.loading && <Spinner size="sm" className="m-1" color="primary" />}
                            Guardar
                        </Button>
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
    const { error, customer,loading } = state.Customer
    const { states, municipalities } = state.Location
    return { error, customer, states, municipalities, loading }
}

export default withRouter(
    connect(mapStateToProps, { apiError, registerCustomer, updateCustomer, getCustomer, getStates, getMunicipalities})(CustomerEdit)
)

CustomerEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

