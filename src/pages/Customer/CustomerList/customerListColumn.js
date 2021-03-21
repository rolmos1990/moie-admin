import React from "react"
import { Link } from "react-router-dom"
import {ConverterCustomerStatus} from "../customer_status";
import {Button, Tooltip} from "@material-ui/core";
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";

const customerListColumns = (onDelete = false) => [
    {
        text: "Nombre",
        dataField: "name",
        sort: true,
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
                        alt=""
                    />
                )}
                <Link to="#" className="text-body">
                    {item.name} {item.isMayorist == true ?
                    <Tooltip
                        placement="bottom"
                        title="Cliente mayorista" aria-label="add"
                    >
                        <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}></i>
                    </Tooltip>
                 : ""}
                </Link>
            </>
        ),
    },
    {
        text: "Email",
        dataField: "email",
        sort: true
    },
    {
        text: "Estado",
        dataField: "status",
        sort: true,
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
                            <i className="uil uil-trash-alt font-size-18"></i>
                        </button>
                    </li>
                )}
            </ul>
        ),
    },
]

export default customerListColumns
