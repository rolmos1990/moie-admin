import React from "react"
import {Link} from "react-router-dom"
import {ConverterCustomerStatus} from "../customer_status";
import {Button, Tooltip} from "@material-ui/core";
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {formatDate, STATUS_OPTIONS, YES_NO_OPTIONS} from "../../../common/utils";

const customerListColumns = (onDelete = false) => [
    {
        text: "Nombre",
        dataField: "name",
        sort: true,
        filter: true,
        filterType: "text",
        formatter: (cellContent, item) => (
            <>
                {!item.img ? (
                    <div className="avatar-xs d-inline-block me-2">
                        <div className="avatar-title bg-soft-primary rounded-circle text-primary">
                            <i className="mdi mdi-account-circle m-0"></i>
                        </div>
                    </div>
                ) : (
                    <img
                        className="avatar-xs rounded-circle me-2"
                        src={item.img}
                        alt={item.name}
                    />
                )}
                <Link to={`/customer/detail/${item.id}`} className="text-body">
                    {item.name}
                    {item.isMayorist === true && (
                        <Tooltip placement="bottom" title="Cliente mayorista" aria-label="add">
                            <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>
                        </Tooltip>
                    )}
                </Link>
            </>
        ),
    },
    {
        text: "Email",
        dataField: "email",
        sort: true,
        filter: true,
        filterType: "text",
    },
    {
        text: "Télefonos",
        dataField: "phone",
        sort: false,
        formatter: (cellContent, item) => (
            <>
                <div>Cel.: {item.phone && item.phone.length > 3 ? item.phone : ''}</div>
                <div>Res.: {item.cellphone && item.cellphone.length > 3 ? item.cellphone : ''}</div>
            </>
        ),
    },
    {
        text: "Fecha creación",
        dataField: "createdAt",
        sort: true,
        filter: true,
        filterType: "dateRange",
        formatter: (cellContent, item) => (
            <div>
                {formatDate(item.createdAt)}
            </div>
        ),
    },
    {
        text: "¿Es Mayorista?",
        dataField: "isMayorist",
        sort: true,
        hidden: true,
        filter: true,
        filterType: "select",
        filterOptions: YES_NO_OPTIONS,
        filterDefaultOption: STATUS_OPTIONS[0],
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
    {
        dataField: "menu",
        isDummyField: true,
        text: "Acción",
        formatter: (cellContent, item) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={`/customer/${item.id}`} className="px-2 text-primary"><i className="uil uil-pen font-size-18"></i></Link>
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

export default customerListColumns
