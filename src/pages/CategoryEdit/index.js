import React, {useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getCategory, registerCategory, updateCategory} from "../../store/category/actions";
import {FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const CategoryEdit = (props) => {
    const {getCategory, category} = props;
    const [categoryData, setCategory] = useState({_status:STATUS.ACTIVE});
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getCategory) {
            getCategory(props.match.params.id);
        }
    }, [getCategory]);

    //cargar la información del cliente
    useEffect(() => {
        if (category.id && isEdit) {
            setCategory({...category, _status:category.status});
        }
    }, [category]);

    const handleValidSubmit = (event, values) => {
        const data = {...values, status:values._status};
        delete data._status;
        if (!isEdit) {
            props.registerCategory(data, props.history)
        } else {
            props.updateCategory(props.match.params.id, data, props.history)
        }
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/categories" title={categoryData.name} item={"Categoria"}/>

                    <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
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
                                                        <FieldSwitch defaultValue={categoryData._status} name={"_status"} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="8">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_name">Nombre <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_name"}
                                                        name={"name"}
                                                        value={categoryData.name}
                                                        minLength={3}
                                                        maxLength={255}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="field_prefix">Prefijo <span className="text-danger">*</span></Label>
                                                    <FieldText
                                                        id={"field_prefix"}
                                                        name={"prefix"}
                                                        value={categoryData.prefix}
                                                        minLength={1}
                                                        maxLength={5}
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

const mapStateToProps = state => {
    const {error, category, loading} = state.Category
    return {error, category, loading}
}

export default withRouter(
    connect(mapStateToProps, {apiError, registerCategory, updateCategory, getCategory})(CategoryEdit)
)

CategoryEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

