import React, {useState, useEffect} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvForm, AvField} from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getState, registerState, updateState} from "../../store/location/actions";
import {FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";

const StateEdit = (props) => {
    const {getState, estado} = props;
    const [estadoData, setEstadoData] = useState({_status:STATUS.ACTIVE});
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getState) {
            getState(props.match.params.id);
        }
    }, [getState]);

    //cargar la información del cliente
    useEffect(() => {
        if (estado.id && isEdit) {
            setEstadoData(estado);
        }
    }, [estado]);

    const handleValidSubmit = (event, values) => {
        const data = Object.assign({},values, {status:values._status});
        delete data._status;
        if (!isEdit) {
            props.registerState(data, props.history)
        } else {
            props.updateState(props.match.params.id, data, props.history)
        }
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/states" title={estadoData.name} breadcrumbItem={"Estado"}/>

                    <AvForm className="needs-validation" autoComplete="off"
                            onValidSubmit={(e, v) => {
                                handleValidSubmit(e, v)
                            }}>
                        <Row>
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
                                                        <FieldSwitch defaultValue={estadoData._status} name={"_status"} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Nombre <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_name"}
                                                        name={"name"}
                                                        value={estadoData.name}
                                                        minLength={3}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Código DIAN <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_dianCode"}
                                                        name={"dianCode"}
                                                        value={estadoData.dianCode}
                                                        minLength={3}
                                                        maxLength={10}
                                                        required
                                                        />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Código ISO <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_isoCode"}
                                                        name={"isoCode"}
                                                        value={estadoData.isoCode}
                                                        minLength={3}
                                                        maxLength={5}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            {props.loading && <Spinner size="sm" className="m-1" color="primary"/>}
                                            Guardar
                                        </Button>
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
    const {error, loading} = state.Location
    return {error, estado: state.Location.state, loading}
}

export default withRouter(
    connect(mapStateToProps, {apiError, registerState, updateState, getState})(StateEdit)
)

StateEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

