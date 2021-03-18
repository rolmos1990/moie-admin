import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

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
                  <Link
                    className="nav-link"
                    to="/dashboard"
                  >
                    <i className="uil-home-alt me-2"></i>
                    {" "}{props.t("Dashboard")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                      className="nav-link"
                      to="/products"
                  >
                    <i className="uil-box me-2"></i>
                    {" "}{props.t("Products")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                      className="nav-link"
                      to="/customers"
                  >
                    <i className="uil-users-alt me-2"></i>
                    {" "}{props.t("Customers")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                      className="nav-link"
                      to="/orders"
                  >
                    <i className="uil-shopping-cart-alt me-2"></i>
                    {" "}{props.t("Orders")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                      className="nav-link"
                      to="/bills"
                  >
                    <i className="uil-bill me-2"></i>
                    {" "}{props.t("Bills")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                      className="nav-link"
                      to="/reports"
                  >
                    <i className="uil-graph-bar me-2"></i>
                    {" "}{props.t("Reports")}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="#"
                      onClick={e => {
                        e.preventDefault()
                        setextra(!extra)
                      }}
                  >
                    <i className="uil-cog me-2"></i>
                    {props.t("System")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: extra })}>

                    <div className="dropdown">
                      <Link
                          to="/#"
                          className="dropdown-item dropdown-toggle arrow-none"
                          onClick={e => {
                            e.preventDefault()
                            setauth(!auth)
                          }}
                      >
                        {props.t("Authentication")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                          className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Users")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Roles")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                          className="dropdown-item dropdown-toggle arrow-none"
                          to="#"
                          onClick={e => {
                            e.preventDefault()
                            setutility(!utility)
                          }}
                      >
                        {props.t("Localities")} <div className="arrow-down"></div>
                      </Link>
                      <div
                          className={classname("dropdown-menu", {
                            show: utility,
                          })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Delivery Localities")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("States")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Municipalities")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                          className="dropdown-item dropdown-toggle arrow-none"
                          to="#"
                          onClick={e => {
                            e.preventDefault()
                            setutility(!utility)
                          }}
                      >
                        {props.t("Products")} <div className="arrow-down"></div>
                      </Link>
                      <div
                          className={classname("dropdown-menu", {
                            show: utility,
                          })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Categories")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Providers")}
                        </Link>
                      </div>
                    </div>


                  </div>
                </li>
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

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
