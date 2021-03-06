import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import userImage from "../../../assets/images/users/user.png"

//i18n
import {connect} from "react-redux";
import {countUsersOrders} from "../../../helpers/service";
import {priceFormat} from "../../../common/utils";
import {Tooltip} from "@material-ui/core";

const UsersSalesDropdown = ({data}) => {

    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState(false)
    const [users, setUsers] = useState([])
    const [mainUser, setMainUser] = useState({})

    useEffect(() => {
        findData();
    }, [data])

    const findData = () => {
        setLoading(true);
        countUsersOrders().then(resp => {
            setLoading(false);
            if (resp && resp.data && resp.data.length > 0) {
                let u = [];
                resp.data.filter(o => o.user && o.user.id).forEach(o => u.push({name: o.user.name, sales: o.origen, amount: priceFormat(o.totalAmount), image: avatar3}))
                u = u.sort((a, b) => a.sales === b.sales ? 0 : (a.sales > b.sales) ? -1 : 1);
                if(u.length > 6){
                    u.splice(6);
                }
                setUsers(u);
                setMainUser(u[0]);
            }
        });
    }

    return (
        <>
            {/* > 1832px */}
            <div className="user-sales-list">
                <Card>
                    <CardBody className="p-2">
                        <Row className="align-items-center">
                            <Col xs={10}>
                                <h6 className="m-0 font-size-16"> Ventas por usuarios</h6>
                            </Col>
                            <Col xs={2} className="text-right">
                                <button size="small" className="btn btn-sm text-primary" onClick={() => findData()}>
                                    {!loading && <i className="uil uil-refresh"> </i>}
                                    {loading && <i className="fa fa-spinner fa-spin"> </i>}
                                </button>
                            </Col>
                        </Row>
                        <div style={{height: "284px", overflowY: "auto"}}>
                            {users.map((user, k) => (
                                <div key={k} className="text-reset notification-item">
                                    <div className="d-flex p-1">
                                        <img src={user.image} className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                        <div className="flex-1">
                                            <h6 className="mt-0 mb-1">{k === 0 && <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>}{user.name}</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="m-0">Pedidos: <b>{user.sales}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* < 1832px */}
            <div className="user-sales-dropdown-menu">
                <Dropdown
                    isOpen={menu}
                    toggle={() => setMenu(!menu)}
                    className="dropdown d-inline-block"
                    tag="li"
                >
                    <DropdownToggle
                        className="btn header-item noti-icon waves-effect"
                        tag="button"
                        id="page-header-notifications-dropdown"
                    >
                        <img className="rounded-circle header-profile-user" src={mainUser.image || userImage} alt="Header Avatar"/>
                        <span className="badge rounded-pill"><i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i></span>
                    </DropdownToggle>

                    <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                        <div className="p-3">
                            <Row className="align-items-center">
                                <Col xs={10}>
                                    <h6 className="m-0 font-size-16"> Ventas por usuarios</h6>
                                </Col>
                                <Col xs={2} className="text-right">
                                    <Tooltip placement="bottom" title="Refrescar" aria-label="add">
                                        <button size="small" className="btn btn-sm text-primary" onClick={() => findData()}>
                                            {!loading && <i className="uil uil-refresh"> </i>}
                                            {loading && <i className="fa fa-spinner fa-spin"> </i>}
                                        </button>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </div>
                        <SimpleBar style={{height: "284px"}}>
                            {users.map((user, k) => (
                                <Link to="" key={k} className="text-reset notification-item">
                                    <div className="d-flex p-1">
                                        <img  src={user.image} className="me-3 rounded-circle avatar-xs" alt="user-pic"/>
                                        <div className="flex-1">
                                            <h6 className="mt-0 mb-1">{k === 0 && <i className={"mdi mdi-crown font-size-18 mr-1 text-warning"}> </i>}{user.name}</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1">
                                                    Pedidos completados {user.sales}
                                                </p>
                                                <p className="mb-0">
                                                    <i className="fa fa-dollar-sign"/>{" "} {user.amount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </SimpleBar>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => ({
    countUsersOrders,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersSalesDropdown)

UsersSalesDropdown.propTypes = {
    t: PropTypes.any
}
