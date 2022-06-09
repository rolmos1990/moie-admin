import PropTypes from "prop-types"
import React, {useEffect, useState} from "react"
import {Collapse} from "reactstrap"
import {Link, withRouter} from "react-router-dom"
import classname from "classnames"

//i18n
import {withTranslation} from "react-i18next"

import {connect} from "react-redux"
import {PERMISSIONS} from "../../helpers/security_rol";
import HasPermissions from "../HasPermissions";

const Navbar = props => {
    const [ui, setui] = useState(false)
    const [app, setapp] = useState(false)
    const [email, setemail] = useState(false)
    const [ecommerce, setecommerce] = useState(false)
    const [contact, setcontact] = useState(false)
    const [component, setcomponent] = useState(false)
    const [form, setform] = useState(false)
    const [table, settable] = useState(false)
    const [chart, setchart] = useState(false)
    const [icon, seticon] = useState(false)
    const [map, setmap] = useState(false)
    const [extra, setextra] = useState(false)
    const [invoice, setinvoice] = useState(false)
    const [auth, setauth] = useState(false)
    const [utility, setutility] = useState(false)

    useEffect(() => {
        var matchingMenuItem = null
        var ul = document.getElementById("navigation")
        var items = ul.getElementsByTagName("a")
        for (var i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i]
                break
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem)
        }
    })

    function renderMenuNoAccess(name, to, className){
        return <li className="nav-item">
            <Link className="nav-link disabled" to={to}>
                <i className={className}></i>
                {" "}{props.t(name)}
            </Link>
        </li>
    }

    function activateParentDropdown(item) {
        item.classList.add("active")
        const parent = item.parentElement
        if (parent) {
            parent.classList.add("active") // li
            const parent2 = parent.parentElement
            parent2.classList.add("active") // li
            const parent3 = parent2.parentElement
            if (parent3) {
                parent3.classList.add("active") // li
                const parent4 = parent3.parentElement
                if (parent4) {
                    parent4.classList.add("active") // li
                    const parent5 = parent4.parentElement
                    if (parent5) {
                        parent5.classList.add("active") // li
                        const parent6 = parent5.parentElement
                        if (parent6) {
                            parent6.classList.add("active") // li
                        }
                    }
                }
            }
        }
        return false
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="topnav">
                    <nav
                        className="navbar navbar-light navbar-expand-lg topnav-menu"
                        id="navigation"
                    >
                        <Collapse
                            isOpen={props.leftMenu}
                            className="navbar-collapse"
                            id="topnav-menu-content"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        <i className="uil-home-alt me-2"></i>
                                        {" "}{props.t("Dashboard")}
                                    </Link>
                                </li>

                                <HasPermissions permission={PERMISSIONS.PRODUCT_SHOW} renderNoAccess={() => renderMenuNoAccess("Productos", "/products", "uil-box me-2")}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products">
                                            <i className="uil-box me-2"></i>
                                            {" "} {props.t("Productos")}
                                        </Link>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permission={PERMISSIONS.CATEGORY_SHOW}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/categories" renderNoAccess={() => renderMenuNoAccess("Categorias", "/categories", "uil-box me-2")}>
                                            <i className="uil-box me-2"></i>
                                            {" "}{props.t("Categorias")}
                                        </Link>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permission={PERMISSIONS.CUSTOMER_SHOW} renderNoAccess={() => renderMenuNoAccess("Cliente", "/customers", "uil-users-alt me-2")}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/customers">
                                            <i className="uil-users-alt me-2"></i>
                                            {" "}{props.t("Clientes")}
                                        </Link>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permission={PERMISSIONS.ORDER_SHOW} renderNoAccess={() => renderMenuNoAccess("Pedidos", "/orders", "uil-shopping-cart-alt me-2")}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/orders">
                                            <i className="uil-shopping-cart-alt me-2"></i>
                                            {" "}{props.t("Pedidos")}
                                        </Link>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permissions={[PERMISSIONS.OFFICE_SHOW, PERMISSIONS.BILL_SHOW, PERMISSIONS.POSTSALE_SHOW, PERMISSIONS.PAYMENT_SHOW]} renderNoAccess={() => renderMenuNoAccess("Servicios", "#", "uil-cog me-2")}>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" to="#" onClick={e => {e.preventDefault()}}>
                                            <i className="uil-cog me-2"></i>{props.t("Servicios")}
                                            <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", {show: extra})}>
                                            <HasPermissions permission={PERMISSIONS.OFFICE_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/offices" className="dropdown-item">
                                                        <i className="uil-truck me-2"></i>
                                                        {props.t("Despachos")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.BILL_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/bills" className="dropdown-item">
                                                        <i className="uil-bill me-2"></i>
                                                        {props.t("Facturación")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.POSTSALE_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/postSales" className="dropdown-item">
                                                        <i className="uil-shopping-cart-alt me-2"></i>
                                                        {props.t("Post Venta")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.PAYMENT_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/payments" className="dropdown-item">
                                                        <i className="uil-money-bill me-2"></i>
                                                        {props.t("Pagos")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                        </div>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permission={PERMISSIONS.REPORT_SHOW}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/reports">
                                            <i className="uil-graph-bar me-2"></i>
                                            {" "}{props.t("Reportes")}
                                        </Link>
                                    </li>
                                </HasPermissions>

                                <HasPermissions permissions={[PERMISSIONS.SECURITY_SHOW, PERMISSIONS.USER_SHOW, PERMISSIONS.LOCALITY_SHOW, PERMISSIONS.TEMPLATE_SHOW, PERMISSIONS.RESOLUTION_SHOW, PERMISSIONS.CONFIG_SHOW]} renderNoAccess={() => renderMenuNoAccess("Sistema", "#", "uil-cog me-2")}>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" to="#" onClick={e => {
                                            e.preventDefault()
                                        }}>
                                            <i className="uil-cog me-2"></i>
                                            {props.t("Sistema")}
                                            <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", {show: extra})}>
                                            <HasPermissions permissions={[PERMISSIONS.SECURITY_SHOW, PERMISSIONS.USER_SHOW]}>
                                                <div className="dropdown">
                                                    <Link to="/#" className="dropdown-item dropdown-toggle arrow-none" onClick={e => {
                                                        e.preventDefault();
                                                        setauth(!auth);
                                                    }}>
                                                        {props.t("Autenticación")}{" "}
                                                        <div className="arrow-down"></div>
                                                    </Link>
                                                    <div className={classname("dropdown-menu", {show: auth})}>
                                                        <HasPermissions permission={PERMISSIONS.USER_SHOW}>
                                                            <Link to="/users" className="dropdown-item">
                                                                {props.t("Usuarios")}
                                                            </Link>
                                                        </HasPermissions>
                                                        <HasPermissions permission={PERMISSIONS.SECURITY_SHOW}>
                                                            <Link to="/Security" className="dropdown-item">
                                                                {props.t("Seguridad")}
                                                            </Link>
                                                        </HasPermissions>
                                                    </div>
                                                </div>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.LOCALITY_SHOW}>
                                                <div className="dropdown">
                                                    <Link className="dropdown-item dropdown-toggle arrow-none" to="#" onClick={e => {
                                                        e.preventDefault();
                                                        setutility(!utility)
                                                    }}>
                                                        {props.t("Localidades")}
                                                        <div className="arrow-down"></div>
                                                    </Link>
                                                    <div className={classname("dropdown-menu", {show: utility})}>
                                                        <Link to="/states" className="dropdown-item">
                                                            {props.t("Estados")}
                                                        </Link>
                                                        <Link to="/municipalities" className="dropdown-item">
                                                            {props.t("Municipios")}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.TEMPLATE_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/templates" className="dropdown-item">
                                                        {props.t("Plantillas")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.RESOLUTION_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/billConfigs" className="dropdown-item">
                                                        {props.t("Conf. Resoluciones")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                            <HasPermissions permission={PERMISSIONS.CONFIG_SHOW}>
                                                <li className="nav-item">
                                                    <Link to="/configs" className="dropdown-item">
                                                        {props.t("Configuraciones")}
                                                    </Link>
                                                </li>
                                            </HasPermissions>
                                        </div>
                                    </li>
                                </HasPermissions>

                            </ul>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    )
}

Navbar.propTypes = {
    leftMenu: PropTypes.any,
    location: PropTypes.any,
    menuOpen: PropTypes.any,
    t: PropTypes.any,
}

const mapStateToProps = state => {
    const {leftMenu} = state.Layout
    return {leftMenu}
}

export default withRouter(
    connect(mapStateToProps, {})(withTranslation()(Navbar))
)
