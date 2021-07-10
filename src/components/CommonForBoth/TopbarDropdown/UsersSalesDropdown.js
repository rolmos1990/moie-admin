import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar5 from "../../../assets/images/users/avatar-5.jpg";

//i18n

import {connect} from "react-redux";
import {countUsersOrders} from "../../../helpers/service";

const UsersSalesDropdown = ({data}) => {

  const [menu, setMenu] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // countUsersOrders();
    const u = [];
    u.push({name: 'Lina Battaglia', sales: 8, image: avatar5});
    u.push({name: 'Juan Favaro', sales: 5, image: avatar3});
    setUsers(u);

  }, [data])

  return (
    <>
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
          <img className="rounded-circle header-profile-user" src={avatar5} alt="Header Avatar" />
          <span className="badge bg-info rounded-pill">!</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 font-size-16"> Ventas por usuarios</h6>
              </Col>
            </Row>
          </div>
          <SimpleBar style={{ height: "260px" }}>
            {users.map((user, k) => (
                <Link to="" key={k} className="text-reset notification-item">
                  <div className="d-flex">
                    <img
                        src={user.image}
                        className="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                    />
                    <div className="flex-1">
                      <h6 className="mt-0 mb-1">{user.name}</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          Pedidos completados {user.sales}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
            ))}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
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
