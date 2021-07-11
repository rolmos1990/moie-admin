import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar5 from "../../../assets/images/users/avatar-5.jpg";

//i18n
import {connect} from "react-redux";
import {countUsersOrders} from "../../../helpers/service";
import {priceFormat} from "../../../common/utils";

const UsersSalesDropdown = ({data}) => {

  const [menu, setMenu] = useState(false)
  const [users, setUsers] = useState([])
  const [mainUser, setMainUser] = useState({})

  useEffect(() => {
    findData();
  }, [data])

  const findData = () => {
    countUsersOrders().then(resp => {
      //console.log('countUsersOrders', resp)
      if(resp && resp.data && resp.data.length > 0){
        let u = [];
        resp.data.forEach(o => u.push({name: o.user.name, sales: o.origen, amount: priceFormat(o.totalAmount), image: avatar5}))
        u = u.sort((a, b) => a.sales === b.sales ? 0: (a.sales > b.sales) ? -1: 1);
        setUsers(u);
        setMainUser(u[0]);
      }
    });
  }

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
          <img className="rounded-circle header-profile-user" src={mainUser.image} alt="Header Avatar" />
          <span className="badge bg-info rounded-pill">{mainUser.sales}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="m-0 font-size-16"> Ventas por usuarios</h6>
              </Col>
              <Col md={4} className="text-right">
                <button size="small" className="btn btn-sm text-primary" onClick={() => findData()}>
                  <i className="uil uil-refresh"> </i>
                </button>
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
