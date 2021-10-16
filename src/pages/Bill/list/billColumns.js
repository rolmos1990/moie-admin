import React from "react"
import {Link} from "react-router-dom"
import {StatusField} from "../../../components/StatusField";
import {buildOptions} from "../../../common/converters";
import {
    ORDER_STATUS, ORDER_STATUS_LIST,
} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {DATE_FORMAT, formatDate} from "../../../common/utils";
import {CUSTOMER} from "../../../helpers/url_helper";
import {Tooltip} from "@material-ui/core";

const statusOptions = buildOptions(ORDER_STATUS_LIST);

/**
 *
 * createdAt: "2021-08-29T04:20:38.018Z"
 id: 1
 legalNumber: 1
 order: {id: 5, createdAt: "2021-08-28T22:10:10.565Z", status: 1}
 createdAt: "2021-08-28T22:10:10.565Z"
 id: 5
 status: 1
 status: "PENDING"


 */
const municipalityColumns = (onDelete = false) => [
    {
        text: "#",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <>
                <Link to={`/bill/detail/${item.id}`} className="text-body">
                    <b className="text-info">{item.id}</b>
                </Link>
            </>
        ),
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Fecha",
        dataField: "createdAt",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>{formatDate(item.createdAt, DATE_FORMAT.ONLY_DATE)}</div>
        ),
    },
    {
        text: "Num. Legal",
        dataField: "legalNumber",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Estado",
        dataField: "status",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Impuesto",
        dataField: "tax",
        sort: true,
        filter: true,
        filterType: "number"
    },
    {
        /** TODO -- hacer que filtre por nota de Credito */
        text: "Nota de Crédito",
        dataField: "creditMemo",
        sort: true,
        filter: false,
        filterType: "voyed",
        filterOptions: [
            { label: "No", value: false },
            { label: "Si", value: true }
        ],
        formatter: (cellContent, item) => (
            <>
                {item?.creditNote?.id ? "Si" : "No"}
            </>
        ),
    },
    {
        text: "# Pedido",
        dataField: "order.id",
        sort: true,
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Cliente",
        dataField: "customer",
        sort: true,
        filter: false,
        filterType: "asyncSelect",
        urlStr: CUSTOMER,
        formatter: (cellContent, item) => (
            <>
                {item.order.customer.name}
                {item.order.customer.isMayorist === true && (
                    <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                        <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                    </Tooltip>
                )}
            </>
        ),
    },
    {
        text: "Estado del pedido",
        dataField: "order.status",
        sort: true,
        filter: true,
        filterType: "select",
        filterOptions: statusOptions,
        filterDefaultOption: statusOptions[0],
        formatter: (cellContent, item) => (
            <StatusField color={ORDER_STATUS[item.order.status].color}>
                {ORDER_STATUS[item.order.status].name}
            </StatusField>
        ),
    },
]

export default municipalityColumns;
