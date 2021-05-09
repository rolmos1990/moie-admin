import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../components/StatusField";
import {ConverterStatus} from "../../common/converters";
import {ORDER_STATUS, STATUS} from "../../common/constants";
import Conditionals from "../../common/conditionals";
import {formatDate, isValidOption, STATUS_OPTIONS} from "../../common/utils";
import {Tooltip} from "@material-ui/core";

const orderColumns = (onDelete = false) => [
    {
        text: "# Pedido",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <Link to={`/order/${item.id}`} className="text-body">
                {item.id}
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
        filterType: "text",
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
        text: "Tracking",
        dataField: "tracking",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Piezas",
        dataField: "quantity",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Estado",
        dataField: "status",
        sort: true,
        filter: true,
        filterType: "select",
        filterOptions: STATUS_OPTIONS,
        filterDefaultOption: STATUS_OPTIONS[0],
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
