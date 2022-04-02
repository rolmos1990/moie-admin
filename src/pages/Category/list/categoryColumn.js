import React from "react"
import {Link} from "react-router-dom"
import {STATUS_COLORS, StatusField} from "../../../components/StatusField";
import {ConverterStatus} from "../../../common/converters";
import {STATUS} from "../../../common/constants";
import Conditionals from "../../../common/conditionals";
import {formatDate, STATUS_OPTIONS} from "../../../common/utils";
import {PERMISSIONS} from "../../../helpers/security_rol";
import HasPermissions from "../../../components/HasPermissions";

const categoryColumns = (onDelete = false) => [
    {
        text: "Nombre",
        dataField: "name",
        sort: true,
        formatter: (cellContent, item) => (
            <HasPermissions permission={PERMISSIONS.CATEGORY_SHOW}>
                <Link to={`/category/${item.id}`} className="text-body">
                    {item.name}
                </Link>
            </HasPermissions>
        ),
        filter: true,
        filterType: "text",
        filterCondition: Conditionals.OPERATORS.LIKE,
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
                    <HasPermissions permission={PERMISSIONS.CATEGORY_EDIT}>
                        <Link to={`/category/${item.id}`} className="px-2 text-primary">
                            <i className="uil uil-pen font-size-18"> </i>
                        </Link>
                    </HasPermissions>
                </li>
                {/*{onDelete && (
                    <li className="list-inline-item">
                        <button size="small" className="btn btn-sm text-danger" onClick={() => onDelete(item.id)}>
                            <i className="uil uil-trash-alt font-size-18"> </i>
                        </button>
                    </li>
                )}*/}
            </ul>
        ),
    },
]

export default categoryColumns;
