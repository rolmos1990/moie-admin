import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {ConverterStatus} from "../../../common/converters";
import {STATUS} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {priceFormat, STATUS_OPTIONS} from "../../../common/utils";
import {CATEGORY} from "../../../helpers/url_helper";
import {Tooltip} from "@material-ui/core";

const badgeStyles = {minWidth: '30px', margin: '2px'}

const productColumns = (onDelete = false) => [
    {
        text: "Referencia",
        dataField: "reference",
        sort: false,
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Nombre",
        dataField: "name",
        sort: true,
        formatter: (cellContent, item) => (
            <div className="field-br" style={{width:'350px'}}>
                <Link to={`/product/detail/${item.id}`} className="text-body">
                    <small>{item.name} </small>
                    {item.published == false && (
                        <Tooltip placement="bottom" title="Producto no publicado" aria-label="add" >
                            <i className={"mdi mdi-alert-octagram-outline font-size-18 mr-1 text-warning"}> </i>
                        </Tooltip>
                    )}
                </Link>
            </div>
        ),
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
    },
    {
        text: "Precio",
        dataField: "price",
        sort: true,
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        },
        formatter: (cellContent, item) => (
            <div className="text-right">
                {priceFormat(item.price, "", true)}
            </div>
        ),
        filter: true,
        filterType: "number",
    },
    {
        text: "Costo",
        dataField: "cost",
        sort: true,
        filter: true,
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'right'};
        },
        formatter: (cellContent, item) => (
            <div className="text-right">
                {priceFormat(item.cost, "", true)}
            </div>
        ),
        filterType: "number",
    },
    {
        text: "Categoria",
        dataField: "category",
        sort: true,
        formatter: (cellContent, item) => (
            <div className="field-br" style={{width:'230px'}}>
                <Link to={`/category/${item.category?.id}`} className="text-body">
                    {item.category?.name}
                </Link>
            </div>
        ),
        filter: true,
        filterType: "asyncSelect",
        urlStr: CATEGORY,
    },
    {
        text: "Existencia",
        dataField: "summary",
        isDummyField: true,
        formatter: (cellContent, item) => (
            <>
                <span className="mb-0 badge bg-grey p-2" title='Vendidos' style={badgeStyles}>85</span>
                <span className="mb-0 badge bg-danger p-2" title='Apartado' style={badgeStyles}>5</span>
                <span className="mb-0 badge bg-success p-2" title='Disponible' style={badgeStyles}>23</span>
            </>
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
            <StatusField color={item.status === STATUS.ACTIVE ? STATUS_COLORS.SUCCESS : STATUS_COLORS.DANGER}>
                {ConverterStatus(item.status)}
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
                    <Link to={`/product/${item.id}`} className="px-2 text-primary">
                        <i className="uil uil-pen font-size-18"> </i>
                    </Link>
                </li>
                <li className="list-inline-item">
                    <button size="small" className="btn btn-sm text-danger" onClick={() => onDelete(item.id)}>
                        <i className="uil uil-trash-alt font-size-18"> </i>
                    </button>
                </li>
            </ul>
        ),
    },
]

export default productColumns;
