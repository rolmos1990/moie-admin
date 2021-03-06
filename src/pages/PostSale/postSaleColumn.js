import React from "react"
import {Link} from "react-router-dom"
import {StatusField} from "../../components/StatusField";
import {buildOptions} from "../../common/converters";
import {DELIVERY_METHODS_LIST, ORDER_STATUS, ORDER_STATUS_LIST} from "../../common/constants";
import Conditionals from "../../common/conditionals";
import {formatDate} from "../../common/utils";
import {Tooltip} from "@material-ui/core";
import {CUSTOMER} from "../../helpers/url_helper";

const postSaleColumns = () => {
    const statusOptions = buildOptions(ORDER_STATUS_LIST);
    const deliveryMethodsOptions = buildOptions(DELIVERY_METHODS_LIST);

    return [
        {
            text: "Pedido #",
            dataField: "id",
            sort: true,
            formatter: (cellContent, item) => {
                return (
                    <Link to={`/postSales/detail/${item.id}`} className="text-body">
                        <b className="text-info">{item.id}</b>
                    </Link>
                );
            },
            filter: true,
            filterType: "text",
            filterCondition: Conditionals.OPERATORS.EQUAL,
        },
        {
            text: "Fecha del pedido",
            dataField: "createdAt",
            sort: true,
            filter: true,
            filterType: "dateRange",
            formatter: (cellContent, item) => (
                <div>{formatDate(item.createdAt)}</div>
            ),
        },
        {
            text: "Estado del Pedido",
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
            text: "Metodo de env??o",
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
            text: "Gu??a",
            dataField: "orderDelivery.tracking",
            sort: true,
            filter: true,
            filterType: "text",
            formatter: (cellContent, item) => (
                <div className="badge p-2 bg-soft-info">{item.orderDelivery.tracking}</div>
            ),
        },
        {
            text: "Estado del env??o",
            dataField: "orderDelivery.deliveryStatus",
            sort: true,
            filter: true,
            filterType: "text",
            formatter: (cellContent, item) => {
                if (item.orderDelivery.deliveryStatus) {
                    return <small className="text-muted">{item.orderDelivery.deliveryStatus}</small>;
                }
                return '';
            },
        },
        {
            text: "Fecha de env??o",
            // dataField: "orderDelivery.deliveryDate",//TODO cambiar cuando se agregue
            dataField: "createdAt",
            sort: true,
            filter: true,
            filterType: "dateRange",
            formatter: (cellContent, item) => {
                return <div>{formatDate(item.createdAt)}</div>
                /*if(item.orderDelivery.deliveryDate){
                    console.log(item.orderDelivery.deliveryDate)
                 return <div>{formatDate(item.orderDelivery.deliveryDate)}</div>;
                }
                return '';*/
            },
        },
    ];
}

export default postSaleColumns;
