import React, {useState, useEffect} from "react"
import {Col, Label, Row} from "reactstrap"
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {FieldAsyncSelect} from "../../../components/Fields";
import {GET_CUSTOMER} from "../../../helpers/url_helper";
import {getCustomer} from "../../../store/customer/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {Tooltip} from "@material-ui/core";
import Conditionals from "../../../common/conditionals";
import CustomModal from "../../../components/Modal/CommosModal";
import CustomerForm from "../../CustomerEdit/CustomerForm";

const OrderCustomer = (props) => {
    const {onSelect, customer, getCustomer} = props;
    const [editCustomer, setEditCustomer] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [customerDefault, setCustomerDefault] = useState(getEmptyOptions());
    const [customerDocumentDefault, setCustomerDocumentDefault] = useState(getEmptyOptions());

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
            onSelect(customer);
        } else {
            resetData();
            onSelect({});
        }
    }, [customer]);

    const toggleModal = () => {
        setOpenCustomerModal(!openCustomerModal);
    }

    const resetData = () => {
        setCustomerDefault(getEmptyOptions());
        setCustomerDocumentDefault(getEmptyOptions());
        setCustomerData({})
    }

    const onCloseModal = () => {
        toggleModal();
        setEditCustomer(false);
    }

    const onAcceptModal = () => {
        toggleModal();
        setCustomerDefault(getEmptyOptions());
        setCustomerDocumentDefault(getEmptyOptions());
        if(editCustomer){
            getCustomer(customer.id);
        }
        setEditCustomer(false);
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h5 className="text-info">Datos del cliente</h5>
                </Col>
            </Row>
            <AvForm className="needs-validation" autoComplete="off">
                <Row>
                    <Col md={3}>
                        <Label htmlFor="product">Buscar por Documento</Label>
                        <FieldAsyncSelect
                            name={"product"}
                            urlStr={GET_CUSTOMER}
                            placeholder="Buscar por documento"
                            defaultValue={customerDocumentDefault}
                            conditionalOptions={{fieldName: 'document', operator: Conditionals.OPERATORS.EQUAL}}
                            onChange={(c) => {
                                getCustomer(c.value);
                                setCustomerDefault(getEmptyOptions());
                            }}
                        />
                    </Col>
                    <Col md={7}>
                        <Label htmlFor="customer">Buscar por Nombre</Label>
                        <FieldAsyncSelect
                            name={"customer"}
                            urlStr={GET_CUSTOMER}
                            placeholder="Buscar por nombre"
                            defaultValue={customerDefault}
                            onChange={(c) => {
                                getCustomer(c.value);
                                setCustomerDocumentDefault(getEmptyOptions());
                            }}
                        />
                    </Col>
                    <Col md={2} style={{display: 'flex', 'alignItems': 'flex-end'}}>
                        <button type="button" className="btn btn-primary btn-block waves-effect waves-light mt-2 me-1 w-100" onClick={() => toggleModal()}>
                            <i className="mdi mdi-plus"> </i> Nuevo Cliente
                        </button>
                    </Col>
                </Row>
            </AvForm>
            {customerData.id && (
                <Row className="mt-3">
                    <Col md={11}>
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
                            <Col md={6}>
                                <label>Documento: </label>
                                <span className="p-1">{customerData.document}</span>
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
                    </Col>
                    <Col md={1} className="text-right">
                        <button type="button"
                                title="Editar cliente"
                                size="small"
                                className="btn btn-sm text-primary"
                                onClick={() => {
                                    toggleModal();
                                    setEditCustomer(true);
                                }}>
                            <i className="uil uil-pen font-size-18"> </i>
                        </button>
                    </Col>
                </Row>
            )}
            <CustomModal title={editCustomer ? "Modificar cliente":"Nuevo cliente"} showFooter={false} isOpen={openCustomerModal} onClose={onCloseModal}>
                <CustomerForm customer={customerData}
                              showAsModal={true}
                              onCloseModal={onCloseModal}
                              onAcceptModal={onAcceptModal}
                />
            </CustomModal>
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
