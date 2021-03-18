import React, { useState, useEffect } from "react"
import {CardBody, Col, Container, InputGroupText, Label, Row} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from "react-select"
import {Button, Card} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getCustomer, registerCustomer, updateCustomer} from "../../store/customer/actions";
import {TextField, EmailField} from "../../components/Fields/InputTextField";
import InputSearchField from "../../components/Fields/InputSearchField";
import {getMunicipalities, getStates} from "../../store/location/actions";
import Conditionals from "../../common/conditionals";

const CustomerEdit = (props) => {
    const {getCustomer, customer } = props;
    const [ customerData, setCustomerData ] = useState({});

    // definición de localidades
    const { getStates, states } = props;
    const { getMunicipalities,municipalities } = props;
    const [ state, setState ] = useState(null);

    const [ statesOptions, setStates ] = useState([]);
    const [ municipalitiesOptions, setMunicipalities ] = useState([]);



    //carga inicial
    useEffect(() => {
        if(props.match.params.id && getCustomer){
            getCustomer(props.match.params.id);
        }
        getStates();
    },[getStates, getCustomer]);

    useEffect(() => {
            if(municipalities && municipalities.length > 0) {
                setMunicipalities(municipalities.map(item => ({
                    label: item.name,
                    value: item.id
                })));
            } else {
                setMunicipalities([]);
            }
    },[municipalities]);

    useEffect(() => {
        if(states && states.length > 0) {
            const itemsConverter = item => ({
                label: item.name,
                value: item.id
            });
            setStates(states.map(itemsConverter));
            setState(itemsConverter[0]);
        } else {
            setStates([]);
        }
    },[states]);

    useEffect(() => {
        if(customer.id) {
            setCustomerData(customer);
        }
    },[customer]);

    useEffect(() => {
        if(state != null) {
            const conditions = new Conditionals.Condition;
            conditions.add('state', state.value);
            getMunicipalities(conditions.all());
        }
    },[state]);

    const handleValidSubmit = (event, values) => {
            if(!customerData) {
                props.registerCustomer(values, props.history)
            } else {
                props.updateCustomer(props.match.params.id, values, props.history)
            }
    }

    function handleSelectDepartment(option) {
        getMunicipalities(option.value);
        setState(option);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h3>
                        Cliente
                    </h3>
                    <Row>
                        <Col xl="8">
                            <Card>
                                <CardBody>
                                    <AvForm className="needs-validation"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                             }}>
                        <Row>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="field_name">Nombre</Label>
                                    <TextField name={"name"} value={customerData.name} required id={"field_name"}/>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom02">Email</Label>
                                    <EmailField
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
                                    <InputSearchField
                                        defaultValue={customerData.state}
                                        name={"state"}
                                        placeholder={"Indique un departamento"}
                                        options={statesOptions}
                                        required
                                        onChange={handleSelectDepartment}
                                    />
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="mb-3">
                                    <Label htmlFor="validationCustom03">Municipio</Label>
                                    <InputSearchField
                                        defaultValue={customerData.state}
                                        name={"municipality"}
                                        placeholder={"Indique un municipio"}
                                        options={municipalitiesOptions}
                                        required
                                        dependency={state}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="mb-3">
                            <AvField className="form-check-input" type="checkbox" name="hasNotification" label="Recibe notificaciones" />
                        </div>
                        <Button color="primary" type="submit">
                            Guardar
                        </Button>
                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const { error, customer } = state.Customer
    const { states, municipalities } = state.Location
    return { error, customer, states, municipalities }
}

export default withRouter(
    connect(mapStateToProps, { apiError, registerCustomer,updateCustomer, getCustomer, getStates, getMunicipalities})(CustomerEdit)
)

CustomerEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

