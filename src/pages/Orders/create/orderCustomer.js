import React, {useState, useEffect} from "react"
import {Col, Label, Row} from "reactstrap"
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {FieldAsyncSelect} from "../../../components/Fields";
import {GET_CUSTOMER} from "../../../helpers/url_helper";
import {formatDate} from "../../../common/utils";
import {getCustomer} from "../../../store/customer/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {Tooltip} from "@material-ui/core";

const OrderCustomer = (props) => {
    const {onSelect, customer, getCustomer} = props;
    const [customerData, setCustomerData] = useState({});
    const [customerDefault, setCustomerDefault] = useState(getEmptyOptions());

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
        }
    }, [customer]);

    const handleValidSubmit = (e, d) => {
        console.log(d);


    }

    const onChange = (e) => {
        getCustomer(e.value);
        onSelect(e);
        setCustomerDefault(getEmptyOptions());
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h5 className="text-info">Clientes</h5>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                        <Label htmlFor="customer">Nombre</Label>
                        <FieldAsyncSelect
                            name={"customer"}
                            urlStr={GET_CUSTOMER}
                            placeholder="Buscar cliente"
                            defaultValue={customerDefault}
                            onChange={onChange}
                        />
                    </AvForm>
                </Col>
            </Row>
            {customerData.id && (
                <Row className="mt-3">
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
                        <label>Email: </label>
                        <span className="p-1">{customerData.email}</span>
                    </Col>
                    <Col md={6}>
                        <label>Departamento: </label>
                        <span className="p-1">{customerData.state?.name}</span>
                    </Col>
                    <Col md={6}>
                        <label>Municipio: </label>
                        <span className="p-1">{customerData.municipality?.name}</span>
                    </Col>
                    <Col md={4}>
                        <label>Documento: </label>
                        <span className="p-1">{customerData.document}</span>
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
            )}
        </React.Fragment>
    )
}

OrderCustomer.propTypes = {
    onSelect: PropTypes.func.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => {
    const {customer, error, loading} = state.Customer
    return {customer, error, loading};
}

export default withRouter(connect(mapStateToProps, {apiError, getCustomer})(OrderCustomer))
