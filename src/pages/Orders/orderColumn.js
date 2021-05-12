import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../components/StatusField";
import {ConverterStatus, getEmptyOptions} from "../../common/converters";
import {ORDER_STATUS, ORDER_STATUS_LIST, STATUS} from "../../common/constants";
import Conditionals from "../../common/conditionals";
import {formatDate, isValidOption, STATUS_OPTIONS} from "../../common/utils";
import {Tooltip} from "@material-ui/core";
import {CATEGORY, GET_CUSTOMER} from "../../helpers/url_helper";

const statusOptions = ORDER_STATUS_LIST;
statusOptions.unshift(getEmptyOptions);

const orderColumns = () => [
    {
        text: "# Pedido",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <Link to={`/order/${item.id}`} className="text-body">
               <b className="text-info">{item.id}</b>
            </Link>
        ),
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
        urlStr: GET_CUSTOMER,
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
        filterType: "text",
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
