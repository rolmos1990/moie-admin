import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {HtmlTooltip} from "../../../components/Common/HtmlTooltip";
import {ConverterStatus} from "../../../common/converters";
import {STATUS} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {getImageByQuality, priceFormat, STATUS_OPTIONS, YES_NO_OPTIONS} from "../../../common/utils";
import {CATEGORY, SIZE} from "../../../helpers/url_helper";
import { Tooltip} from "@material-ui/core";
import Images from "../../../components/Common/Image";

const badgeStyles = {minWidth: '30px', margin: '2px'}

const productColumns = (onDelete = false) => [
    {
        text: "Código",
        dataField: "reference",
        sort: false,
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.EQUAL,
        formatter: (cellContent, item) => (
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Images src={`${getImageByQuality(item.productImage.length > 0 ? item.productImage[0] : {}, 'medium')}`}
                                alt={item.reference}
                                height={100}
                                className="img-fluid mx-auto d-block tab-img rounded"/>
                    </React.Fragment>
                }>
                <Link to={`/product/detail/${item.id}`} className="text-body">
                    <span className="text-info">{item.reference} </span>
                </Link>
            </HtmlTooltip>
        ),
    },
    {
        text: "Nombre",
        dataField: "name",
        sort: true,
        formatter: (cellContent, item) => (
            <div className="field-br" style={{width: '350px'}}>
                <small>{item.name} </small>
                {item.published === false && (
                    <Tooltip placement="bottom" title="Producto no publicado" aria-label="add">
                        <i className={"mdi mdi-alert-octagram-outline font-size-18 mr-1 text-warning"}> </i>
                    </Tooltip>
                )}
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
            <div className="field-br" style={{width: '230px'}}>
                {!item.category ? '': (
                    <Link to={`/category/${item.category.id}`} className="text-body">
                        {item.category.name}
                    </Link>
                )}
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
        text: "Talla",
        dataField: "size",
        sort: true,
        hidden: true,
        filter: true,
        filterType: "asyncSelect",
        urlStr: SIZE,
    },
    {
        text: "Publicado",
        dataField: "published",
        sort: true,
        hidden: true,
        filter: true,
        filterType: "select",
        filterOptions: YES_NO_OPTIONS,
        filterDefaultOption: YES_NO_OPTIONS[0]
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
                {/*<li className="list-inline-item">
                    <button size="small" className="btn btn-sm text-danger" onClick={() => onDelete(item.id)}>
                        <i className="uil uil-trash-alt font-size-18"> </i>
                    </button>
                </li>*/}
            </ul>
        ),
    },
]

export default productColumns;
