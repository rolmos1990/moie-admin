import React, {useEffect, useState} from "react"
import {CardBody, Col, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FieldAsyncSelect, FieldSelect} from "../../components/Fields";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import {ORDERS} from "../../helpers/url_helper";
import {getEmptyOptions} from "../../common/converters";
import {confirmConciliation, getOrder, restartOrder} from "../../store/order/actions";
import Conditionals from "../../common/conditionals";
import {priceFormat} from "../../common/utils";

const searchByOptions = [{label: "Pedido", value: "ID"}, {label: "Guia", value: "GUIA"}];
const emptyOption = getEmptyOptions();

const OrderConciliationForm = ({onGetOrder, onCloseModal, order, loading, success, error, onRestartOrder, onConfirmConciliate}) => {

    const [orderId, setOrderId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [searchBy, setSearchBy] = useState(searchByOptions[0].value);
    const [defaultOption, setDefaultOption] = useState(emptyOption);

    useEffect(() => {
        if (order) {
            const list = [...orders];
            if (!list.some(o => o.id === order.id)) {
                list.push(order);
                setOrders(list);
            }
        } else {
            setOrders([]);
        }
    }, [order]);

    useEffect(() => {
        if (onRestartOrder) {
            onRestartOrder();
        }
    }, [onRestartOrder]);

    useEffect(() => {
        if (success && !error) {
            onCloseModal(true);
        }
    }, [success]);

    const addOrder = () => {
        console.log('addOrder', orderId);
        onGetOrder(orderId);
        setDefaultOption(getEmptyOptions());
        setOrderId(null);
    }

    const removeOrder = (orderId) => {
        console.log('removeOrder', orderId);
        const list = [...orders];
        const orderToRemove = list.find(o => o.id === order.id);
        list.splice(list.indexOf(orderToRemove), 1);
        setOrders(list);
    }

    const doConciliation = (e) => {
        onConfirmConciliate(orders.map(o => o.id));
    }

    return (
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => doConciliation(e, v)}>
                <Card>
                    <CardBody>
                        <Row className="mb-3">
                            <Col md={4}>
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
                            {searchBy === "ID" && (
                                <Col md={6}>
                                    <Label htmlFor="product">Pedido # </Label>
                                    <FieldAsyncSelect
                                        name={"product"}
                                        urlStr={ORDERS}
                                        placeholder="Buscar por Pedido"
                                        defaultValue={defaultOption}
                                        conditionalOptions={{fieldName: 'id', operator: Conditionals.OPERATORS.EQUAL}}
                                        onChange={(c) => {
                                            setOrderId(c.value);
                                        }}
                                    />
                                </Col>
                            )}
                            {searchBy === "GUIA" && (
                                <Col md={6}>
                                    <Label htmlFor="customer">Guia</Label>
                                    <FieldAsyncSelect
                                        name={"customer"}
                                        urlStr={ORDERS}
                                        placeholder="Buscar por Guia"
                                        defaultValue={defaultOption}
                                        conditionalOptions={{fieldName: 'orderDelivery.tracking', operator: Conditionals.OPERATORS.LIKE}}
                                        onChange={(c) => {
                                            setOrderId(c.value);
                                        }}
                                    />
                                </Col>
                            )}
                            <Col md={2} style={{display: 'flex', 'alignItems': 'flex-end'}}>
                                <Tooltip placement="bottom" title="Aceptar" aria-label="add">
                                    <button type="button"
                                            className="btn btn-primary btn-block waves-effect waves-light mt-2 me-1 w-100"
                                            disabled={!orderId || loading}
                                            onClick={() => addOrder()}>
                                        {loading && <i className="fa fa-spinner fa-spin"> </i>}
                                        {!loading && <i className="mdi mdi-plus"> </i>}
                                    </button>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <table className="table table-condensed table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Pedido</th>
                                        <th>Guia</th>
                                        <th>Cliente</th>
                                        <th>Monto</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map(o => (
                                        <tr>
                                            <td>{o.id}</td>
                                            <td>{o.orderDelivery?.tracking}</td>
                                            <td>{o.customer?.name}</td>
                                            <td className="text-end">{priceFormat(o.totalAmount)}</td>
                                            <td className="text-center">
                                                <button size="small" className="btn btn-sm text-danger" onClick={() => removeOrder(o.id)}>
                                                    <i className="uil uil-trash-alt font-size-16"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Col>
                            <Col>
                                Total pedidos: {orders.length}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-right">
                                <ButtonSubmit loading={loading} disabled={loading || orders.length === 0}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </AvForm>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {order, loading} = state.Order;
    return {order, loading}
}

const mapDispatchToProps = dispatch => ({
    onConfirmConciliate: (orders) => dispatch(confirmConciliation(orders)),
    onRestartOrder: () => dispatch(restartOrder()),
    onGetOrder: (id) => dispatch(getOrder(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderConciliationForm)
)

OrderConciliationForm.propTypes = {
    error: PropTypes.any,
    onCloseModal: PropTypes.func
}

