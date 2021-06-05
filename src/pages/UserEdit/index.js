import React, {useState, useEffect} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvForm, AvField} from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {registerUser, updateUser, getUser} from "../../store/user/actions";
import {FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const UserEdit = (props) => {
    const {registerUser, updateUser, getUser, user} = props;
    const [userData, setUserData] = useState({_status:STATUS.ACTIVE});
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getUser) {
            getUser(props.match.params.id);
        }
    }, [getUser]);

    useEffect(() => {
        if (user.id && isEdit) {
            setUserData({...user, _status:user.status});
        }
    }, [user]);

    const handleValidSubmit = (event, values) => {
        const data = {...values, status:values._status};
        delete data._status;
        if (!isEdit) {
            registerUser(data, props.history)
        } else {
            updateUser(props.match.params.id, data, props.history)
        }
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/users" title={userData.name} item={"Usuario"}/>

                    <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                        <Row className="mb-5">
                            <Col xl="8">
                                <Card>
                                    <CardBody>
                                        <div className={"mt-1 mb-5"} style={{position: "relative"}}>
                                            <div className={"float-end"}>
                                                <Row>
                                                    <Col>
                                                        ¿Activo?
                                                    </Col>
                                                    <Col>
                                                        <FieldSwitch defaultValue={userData._status} name={"_status"} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="name">Nombre <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"name"}
                                                        name={"name"}
                                                        value={userData.name}
                                                        minLength={1}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="lastname">Apellido <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"lastname"}
                                                        name={"lastname"}
                                                        value={userData.lastname}
                                                        minLength={1}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="email">Correo</Label>
                                                    <FieldText
                                                        id={"email"}
                                                        name={"email"}
                                                        value={userData.email}
                                                        maxLength={300}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="lastname">Usuario <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"username"}
                                                        name={"username"}
                                                        value={userData.username}
                                                        minLength={1}
                                                        maxLength={45}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {!userData.id && (
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="password">Clave</Label>
                                                        <FieldText
                                                            id={"password"}
                                                            name={"password"}
                                                            type="password"
                                                            value={userData.password}
                                                            maxLength={50}
                                                        />
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            <Col md={12} className="text-right">
                                                <ButtonSubmit loading={props.loading} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </AvForm>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {error, user, loading} = state.User
    return {error, user, loading}
}

export default withRouter(
    connect(mapStateToProps, {apiError, registerUser, updateUser, getUser})(UserEdit)
)

UserEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

