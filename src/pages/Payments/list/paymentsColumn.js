import React from "react"
import Conditionals from "../../../common/conditionals";
import {priceFormat} from "../../../common/utils";

const paymentsColumns = (onSelected) => [
    {
        text: "ID",
        dataField: "id",
        sort: true,
        formatter: (cellContent, item) => (
            <>
                <button className="btn btn-outline-default" onClick={() => onSelected(item)}>
                    <b className="text-info">{item.id}</b>
                </button>
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
        dataField: "date",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Forma de pago",
        dataField: "paymentForm",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Origen",
        dataField: "originBank",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Destino",
        dataField: "targetBank",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Monto",
        dataField: "consignmentAmount",
        sort: true,
        filter: true,
        filterType: "text",
        formatter: (cellContent, item) => (
            <div className="text-right">
                {priceFormat(item.consignmentAmount, "", true)}
            </div>
        ),
    },
]

export default paymentsColumns;
