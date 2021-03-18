import React from "react"
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"
import { Link } from "react-router-dom"
import {ConverterCustomerStatus} from "../customer_status";
import {Tooltip} from "@material-ui/core";

const customerListColumns = () => [
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
            <span className="badge rounded-pill bg-soft-danger font-size-12 p-2">{ConverterCustomerStatus(item.status)}</span>
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
                <li className="list-inline-item">
                    <Link to="#" className="px-2 text-danger"><i className="uil uil-trash-alt font-size-18"></i></Link>
                </li>
            </ul>
        ),
    },
]

export default customerListColumns
