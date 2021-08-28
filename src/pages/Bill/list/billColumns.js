import React from "react"
import {Link} from "react-router-dom"
import {StatusField} from "../../../components/StatusField";
import {buildOptions} from "../../../common/converters";
import {DELIVERY_METHODS_LIST, DELIVERY_TYPES_LIST, OFFICE_STATUS, OFFICE_STATUS_LIST} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {DATE_FORMAT, formatDate} from "../../../common/utils";

const statusOptions = buildOptions(OFFICE_STATUS_LIST);
const deliveryMethodsOptions = buildOptions(DELIVERY_METHODS_LIST);

const municipalityColumns = (onDelete = false) => [
    {
        text: "#",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <>
                <Link to="#" className="text-body">
                    {item.id}
                </Link>
            </>
        ),
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Pedido",
        dataField: "order",
        sort: true,
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Cliente",
        dataField: "customer",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>{formatDate(item.batchDate, DATE_FORMAT.ONLY_DATE)}</div>
        ),
    },
    {
        text: "Fecha",
        dataField: "createdAt",
        sort: true,
        filter: true,
        filterType: "text",
        formatter: (item) => (
            <>
                <div>{DELIVERY_TYPES_LIST[item - 1].label }</div>
            </>
        ),
    },
    {
        text: "Tipo",
        dataField: "type",
        sort: true,
        filter: true,
        filterType: "select",
        filterOptions: deliveryMethodsOptions,
        filterCondition: Conditionals.OPERATORS.EQUAL,
        formatter: (cellContent, item) => (
            <>
                <div>{item.deliveryMethod.name}</div>
            </>
        ),
    },
    {
        text: "Num. Legal",
        dataField: "numLegal",
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
        text: "Nota de Credito",
        dataField: "note",
        sort: true,
        filter: true,
        filterType: "text"
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
            <StatusField color={OFFICE_STATUS[item.status].color}>
                {OFFICE_STATUS[item.status].name}
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
                    <Link to={`/bill/${item.id}`} className="px-2 text-primary">
                        <i className="uil uil-pen font-size-18"> </i>
                    </Link>
                </li>
                {onDelete && (
                    <li className="list-inline-item">
                        <button size="small" className="btn btn-sm text-danger" onClick={() => onDelete(item.id)}>
                            <i className="uil uil-trash-alt font-size-18"> </i>
                        </button>
                    </li>
                )}
            </ul>
        ),
    },
]

export default municipalityColumns;
