import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {ConverterStatus, getEmptyOptions} from "../../../common/converters";
import {
    DELIVERY_METHODS_LIST,
    DELIVERY_TYPES, DELIVERY_TYPES_LIST,
    OFFICE_STATUS,
    OFFICE_STATUS_LIST,
    STATUS
} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {DATE_FORMAT, formatDate, STATUS_OPTIONS} from "../../../common/utils";

const statusOptions = OFFICE_STATUS_LIST;
statusOptions.unshift(getEmptyOptions);

const deliveryMethodsOptions = DELIVERY_METHODS_LIST;
deliveryMethodsOptions.unshift(getEmptyOptions);

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
        text: "Nombre",
        dataField: "name",
        sort: true,
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Fecha",
        dataField: "batchDate",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>{formatDate(item.batchDate, DATE_FORMAT.ONLY_DATE)}</div>
        ),
    },
    {
        text: "Tipo",
        dataField: "type",
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
        text: "Método de Envio",
        dataField: "deliveryMethod",
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
        text: "Descripción",
        dataField: "description",
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
                    <Link to={`/office/${item.id}`} className="px-2 text-primary">
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
