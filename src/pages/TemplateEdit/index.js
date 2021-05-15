import React, {useTemplate, useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row, Spinner} from "reactstrap"
import {AvForm, AvField} from "availity-reactstrap-validation"
import {Button, Card} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getTemplate, registersTemplate, updateTemplate} from "../../store/template/actions";
import {FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const TemplateEdit = (props) => {
    const {getTemplate, template} = props;
    const [templateData, setTemplateData] = useState({_status:STATUS.ACTIVE});
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getTemplate) {
            getTemplate(props.match.params.id);
        }
    }, [getTemplate]);

    //cargar la información de plantilla
    useEffect(() => {
        if (template.id && isEdit) {
            setTemplateData({...template, _status:template.status});
        }
    }, [template]);

    const handleValidSubmit = (event, values) => {
        const data = Object.assign({},values, {status:values._status});
        delete data._status;
        if (!isEdit) {
            props.registersTemplate(data, props.history)
        } else {
            props.updateTemplate(props.match.params.id, data, props.history)
        }
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/templates" title={templateData.reference} item={"Plantilla"}/>

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
                                                        <FieldSwitch defaultValue={templateData._status} name={"_status"} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Referencia <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_reference"}
                                                        name={"reference"}
                                                        value={templateData.reference}
                                                        minLength={3}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Descripción <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_description"}
                                                        name={"description"}
                                                        value={templateData.description}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Contenido <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_template"}
                                                        name={"template"}
                                                        type={"textarea"}
                                                        value={templateData.template}
                                                        minLength={3}
                                                        maxLength={10000}
                                                        required
                                                    />
                                                </div>
                                            </Col>
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

const mapTemplateToProps = state => {
    const {error, loading, template} = state.Template
    return {error, template, loading}
}

export default withRouter(
    connect(mapTemplateToProps, {apiError, registersTemplate, updateTemplate, getTemplate})(TemplateEdit)
)

TemplateEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

