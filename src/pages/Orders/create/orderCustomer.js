import React, {useEffect, useState} from "react"
import {Col, Label, Row, Spinner} from "reactstrap"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FieldAsyncSelect, FieldSelect} from "../../../components/Fields";
import {GET_CUSTOMER} from "../../../helpers/url_helper";
import {getCustomer} from "../../../store/customer/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {Button, Tooltip} from "@material-ui/core";
import Conditionals from "../../../common/conditionals";
import CustomModal from "../../../components/Modal/CommosModal";
import CustomerForm from "../../CustomerEdit/CustomerForm";
import {updateCard} from "../../../store/order/actions";

const searchByOptions = [{label:"Documento", value:"doc"},{label:"Nombre", value:"name"},{label:"Correo", value:"email"}];

const OrderCustomer = (props) => {
    const {car, customer, onGetCustomer, onUpdateCar, showAsModal} = props;
    const [initComponent, setInitComponent] = useState(true);
    const [searchBy, setSearchBy] = useState(searchByOptions[0].value);
    const [editCustomer, setEditCustomer] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [customerDefault, setCustomerDefault] = useState(getEmptyOptions());
    const [customerEmailDefault, setCustomerEmailDefault] = useState(getEmptyOptions());
    const [customerDocumentDefault, setCustomerDocumentDefault] = useState(getEmptyOptions());

    useEffect(() => {
        if(showAsModal && car.isEdit && car.customer && car.customer.id && initComponent){
            setInitComponent(false);
            onGetCustomer(car.customer.id);
        }
    }, [showAsModal]);

    useEffect(() => {
        if (customer.id) {
            setCustomerData(customer);
            onUpdateCar({...car, customer})
        } else {
            resetData();
        }
    }, [customer]);

    const toggleModal = () => {
        setOpenCustomerModal(!openCustomerModal);
    }

    const resetData = () => {
        setCustomerDefault(getEmptyOptions());
        setCustomerEmailDefault(getEmptyOptions());
        setCustomerDocumentDefault(getEmptyOptions());
        setCustomerData({})
    }

    const onCloseCustomerModal = () => {
        toggleModal();
        setEditCustomer(false);
    }

    const onAcceptCustomerModal = () => {
        toggleModal();
        setCustomerDefault(getEmptyOptions());
        setCustomerEmailDefault(getEmptyOptions());
        setCustomerDocumentDefault(getEmptyOptions());
        if(editCustomer){
            onGetCustomer(customer.id);
        }
        setEditCustomer(false);
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h4 className="card-title text-info"><i className="uil-users-alt me-2"> </i> Datos del cliente</h4>
                </Col>
            </Row>
            <AvForm className="needs-validation" autoComplete="off">
                <Row>
                    <Col md={2}>
                        <Label htmlFor="product">Buscar por</Label>
                        <FieldSelect
                            id={"searchByOptions"}
                            name={"searchByOptions"}
                            options={searchByOptions}
                            defaultValue={searchBy}
                            onChange={(e) => {
                                setSearchBy(e.value);
                            }}
                        />
                    </Col>
                    {searchBy === "doc" && (
                        <Col md={9}>
                            <Label htmlFor="product">Documento</Label>
                            <FieldAsyncSelect
                                name={"product"}
                                urlStr={GET_CUSTOMER}
                                placeholder="Buscar por documento"
                                defaultValue={customerDocumentDefault}
                                conditionalOptions={{fieldName: 'document', operator: Conditionals.OPERATORS.LIKE}}
                                onChange={(c) => {
                                    onGetCustomer(c.value);
                                    setCustomerDefault(getEmptyOptions());
                                }}
                            />
                        </Col>
                    )}
                    {searchBy === "name" && (
                        <Col md={9}>
                            <Label htmlFor="customer">Nombre</Label>
                            <FieldAsyncSelect
                                name={"customer"}
                                urlStr={GET_CUSTOMER}
                                placeholder="Buscar por nombre"
                                defaultValue={customerDefault}
                                onChange={(c) => {
                                    onGetCustomer(c.value);
                                    setCustomerDocumentDefault(getEmptyOptions());
                                }}
                            />
                        </Col>
                    )}
                    {searchBy === "email" && (
                        <Col md={9}>
                            <Label htmlFor="customer">Correo</Label>
                            <FieldAsyncSelect
                                name={"email"}
                                urlStr={GET_CUSTOMER}
                                placeholder="Buscar por correo"
                                defaultValue={customerEmailDefault}
                                conditionalOptions={{fieldName: 'email', operator: Conditionals.OPERATORS.LIKE}}
                                onChange={(c) => {
                                    onGetCustomer(c.value);
                                    setCustomerEmailDefault(getEmptyOptions());
                                }}
                            />
                        </Col>
                    )}
                    <Col md={1} style={{display: 'flex', 'alignItems': 'flex-end'}}>
                        <Tooltip placement="bottom" title="Agregar nuevo cliente" aria-label="add">
                            <button type="button" className="btn btn-primary btn-block waves-effect waves-light mt-2 me-1 w-100" onClick={() => toggleModal()}>
                                <i className="fa fa-user-plus"> </i>
                            </button>
                        </Tooltip>
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
                                <label>Correo: </label>
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
                        <Tooltip placement="bottom" title="Editar cliente" aria-label="add">
                            <button type="button"
                                    size="small"
                                    className="btn btn-sm text-primary"
                                    onClick={() => {
                                        toggleModal();
                                        setEditCustomer(true);
                                    }}>
                                <i className="uil uil-pen font-size-18"> </i>
                            </button>
                        </Tooltip>

                    </Col>

                    {showAsModal  && (
                       <>
                           <hr/>
                           <Row>
                               <Col md={12} className="text-right">
                                   {props.onCloseModal && (
                                       <button type="button" className="btn btn-light" onClick={() => props.onCloseModal()}>Cancelar</button>
                                   )}
                                   {props.onAcceptModal && (
                                       <Button color="primary" type="button" onClick={() => props.onAcceptModal()}>Guardar</Button>
                                   )}
                               </Col>
                           </Row>
                       </>
                    )}
                </Row>
            )}
            <CustomModal title={editCustomer ? "Modificar cliente":"Nuevo cliente"} size="lg" showFooter={false} isOpen={openCustomerModal} onClose={onCloseCustomerModal}>
                <CustomerForm customer={customerData}
                              showAsModal={true}
                              onCloseModal={onCloseCustomerModal}
                              onAcceptModal={onAcceptCustomerModal}
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
    const {car} = state.Order
    return {car, customer, error, loading};
}

const mapDispatchToProps = dispatch => ({
    onGetCustomer: (id) => dispatch(getCustomer(id)),
    onUpdateCar: (data) => dispatch(updateCard(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderCustomer))
