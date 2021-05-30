import React from "react"
import {Link} from "react-router-dom"
import {StatusField} from "../../components/StatusField";
import {getEmptyOptions} from "../../common/converters";
import {DELIVERY_METHODS_LIST, ORDER_STATUS, ORDER_STATUS_LIST} from "../../common/constants";
import Conditionals from "../../common/conditionals";
import {formatDate} from "../../common/utils";
import {Tooltip} from "@material-ui/core";
import {CUSTOMER} from "../../helpers/url_helper";

const statusOptions = ORDER_STATUS_LIST;
statusOptions.unshift(getEmptyOptions);

const deliveryMethodsOptions = DELIVERY_METHODS_LIST;
deliveryMethodsOptions.unshift(getEmptyOptions);

const orderColumns = (onSelectedOrder) => [
    {
        text: "Pedido #",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => {
            if(onSelectedOrder){
                return (
                    <button className="btn btn-outline-default" onClick={() => onSelectedOrder(item.id)}>
                        <b className="text-info">{item.id}</b>
                    </button>
                );
            }
            return  (
                <Link to={`/order/${item.id}`} className="text-body">
                    <b className="text-info">{item.id}</b>
                </Link>
            );
        },
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.EQUAL,
    },
    {
        text: "Cliente",
        dataField: "customer",
        sort: true,
        filter: true,
        filterType: "asyncSelect",
        urlStr: CUSTOMER,
        formatter: (cellContent, item) => (
            <Link to={`/customer/detail/${item.customer.id}`} className="text-body">
                {item.customer.name}
                {item.customer.isMayorist === true && (
                    <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                        <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                    </Tooltip>
                )}
            </Link>
        ),
    },
    {
        text: "Fecha",
        dataField: "createdAt",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>{formatDate(item.createdAt)}</div>
        ),
    },
    {
        text: "Metodo de envio",
        dataField: "deliveryMethod",
        sort: true,
        filter: true,
        filterType: "select",
        filterOptions: deliveryMethodsOptions,
        filterDefaultOption: deliveryMethodsOptions[0],
        formatter: (cellContent, item) => (
            <>
                <div>{item.deliveryMethod.name}</div>
                <small>{item.tracking}</small>
            </>
        ),
    },
    {
        text: "Piezas",
        dataField: "quantity",
        sort: false,
        filter: false,
    },
    {
        text: "Estado",
        dataField: "status",
        sort: true,
        filter: true,
        filterType: "select",
        filterOptions: statusOptions,
        filterDefaultOption: statusOptions[0],
        formatter: (cellContent, item) => (
            <StatusField color={ORDER_STATUS[item.status].color}>
                {ORDER_STATUS[item.status].name}
            </StatusField>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "Acción",
        formatter: (cellContent, item) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={`/order/${item.id}`} className="px-2 text-primary">
                        <i className="uil uil-pen font-size-18"> </i>
                    </Link>
                </li>
            </ul>
        ),
    },
]

export default orderColumns;
