import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Media,
    Button,
} from "reactstrap"

// availity-reactstrap-validation
import {AvForm, AvField} from "availity-reactstrap-validation"

// Redux
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import {editProfile, resetProfileFlag} from "../../store/actions"
import user4 from "../../assets/images/users/avatar-7.jpg";

const UserProfile = props => {
    const {user} = props;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb title="Mi perfil" item={`${user.name} ${user.lastname}`}/>


                    <div className="row mb-4">
                        <div className="col-md-offset-4 col-md-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="text-center">
                                        <div>
                                            <img src={user4} alt="" className="avatar-lg rounded-circle img-thumbnail" />
                                        </div>
                                        <h5 className="mt-3 mb-1">{`${user.name} ${user.lastname}`}</h5>
                                        <p className="text-muted">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="col-xl-8">
                            <div className="card mb-0">
                                <ul className="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-bs-toggle="tab" role="tab">
                                            <i className="uil-shopping-cart-alt me-2 font-size-20"> </i>
                                            <span className="d-none d-sm-block">Mis Pedidos</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#tasks" role="tab">
                                            <i className="uil uil-clipboard-notes font-size-20"></i>
                                            <span className="d-none d-sm-block">Tasks</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#messages" role="tab">
                                            <i className="uil uil-envelope-alt font-size-20"></i>
                                            <span className="d-none d-sm-block">Messages</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content p-4">
                                    <div className="tab-pane active" id="orders" role="tabpanel">
                                        Lista de pedidos
                                    </div>
                                    <div className="tab-pane" id="tasks" role="tabpanel">
                                        <div>
                                            task
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="messages" role="tabpanel">
                                        messages
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>

                </Container>
            </div>
        </React.Fragment>
    )
}

UserProfile.propTypes = {
    editProfile: PropTypes.func,
    error: PropTypes.any,
    success: PropTypes.any
}

const mapStatetoProps = state => {
    const {error, success} = state.Profile
    const {user} = state.Login
    return {user, error, success}
}

export default withRouter(
    connect(mapStatetoProps, {editProfile, resetProfileFlag})(UserProfile)
)
