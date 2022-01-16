import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {buildOptions} from "../../../common/converters";
import Conditionals from "../../../common/conditionals";
import {DATE_FORMAT, formatDate, STATUS_OPTIONS} from "../../../common/utils";
import {ConverterCustomerStatus} from "../../Customer/customer_status";

//const statusOptions = buildOptions(STATUS_OPTIONS);


const billConfigColumns = (onDelete = false) => [
    {
        text: "#",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <>
                <Link to={`/billConfig/${item.id}`} className="text-body">
                    <b className="text-info">{item.id}</b>
                </Link>
            </>
        ),
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Resolución",
        dataField: "number",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Num. Inicial",
        dataField: "startNumber",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Num. Final",
        dataField: "finalNumber",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Prefijo",
        dataField: "prefix",
        sort: true,
        filter: true,
        filterType: "text"
    },
    {
        text: "Fecha de resolución",
        dataField: "resolution_date",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>{formatDate(item.createdAt, DATE_FORMAT.ONLY_DATE)}</div>
        ),
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
            <StatusField color={item.status === true ? STATUS_COLORS.SUCCESS : STATUS_COLORS.DANGER}>
                {ConverterCustomerStatus(item.status)}
            </StatusField>
        ),
    },
]

export default billConfigColumns;