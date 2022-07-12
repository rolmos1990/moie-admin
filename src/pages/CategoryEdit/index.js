import React, {useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getCategory, registerCategory, updateCategory} from "../../store/category/actions";
import {FieldNumber, FieldSwitch, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import HasPermissions from "../../components/HasPermissions";
import {PERMISSIONS} from "../../helpers/security_rol";
import NoAccess from "../../components/Common/NoAccess";
import DropZoneIcon from "../../components/Common/DropZoneIcon";
import Images from "../../components/Common/Image";
import {getBaseCategoryPath} from "../../common/utils";

const CategoryEdit = (props) => {
    const {getCategory, category} = props;
    const [categoryData, setCategory] = useState({_status: STATUS.ACTIVE});
    const isEdit = !!props.match.params.id;

    const [file, setFile] = useState(null);
    const [fileBanner, setFileBanner] = useState(null);


    //carga inicial
    useEffect(() => {
        if (isEdit && getCategory) {
            setFile(null);
            setFileBanner(null);
            getCategory(props.match.params.id);
        }
    }, [getCategory]);

    //cargar la información del cliente
    useEffect(() => {

        if (category.id && isEdit) {
            //foto portada
            if(!!category.filename){
                const file = {
                    preview: getBaseCategoryPath(category.filename),
                    name: category.id,
                    content: null
                };

                setFile(file);
            }
            //banner
            if(!!category.filenameBanner){
                const fileBanner = {
                    preview: getBaseCategoryPath(category.filenameBanner),
                    name: category.id,
                    content: null
                };

                setFileBanner(fileBanner);
            }

            setCategory({...category, _status:category.status});

        }
    }, [category]);


    const handleValidSubmit = (event, values) => {
        const data = {...values, status:values._status};

        if(file && file.content){
            data.file = file.content;
        }
        if(fileBanner && fileBanner.content){
            data.fileBanner = fileBanner.content;
        }

        delete data._status;

        if (!isEdit) {
            props.registerCategory(data, props.history)
        } else {
            props.updateCategory(props.match.params.id, data, props.history)
        }
    }

    function handleAcceptedFiles(_file, _type) {

        const file = {
            preview: _file.base64,
            name: category.id,
            content: _file.base64
        };

        if(_type == "banner"){
            setFileBanner(file);
        } else {
            setFile(file);
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/categories" title={categoryData.name} item={"Categoria"}/>
                    <HasPermissions permission={PERMISSIONS.CATEGORY_EDIT} renderNoAccess={() => <NoAccess/>}>
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
                                                            <FieldSwitch defaultValue={categoryData._status} name={"_status"}/>
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
                                                            maxLength={150}
                                                            required
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_discount">Descuento<span className="text-danger">*</span></Label>
                                                        <FieldNumber
                                                            id={"field_discount"}
                                                            name={"discountPercent"}
                                                            value={categoryData.discountPercent}
                                                            required/>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br />
                                            <hr />
                                            <Col md={12} className="text-center p-2" style={{height: '400px'}}>
                                                <Label htmlFor="field_discount">Foto de Portada</Label>
                                                <DropZoneIcon
                                                    maxFiles={1}
                                                    mode="block"
                                                    hasImage={file && file.preview}
                                                    onDrop={(files) => {
                                                        handleAcceptedFiles(files, 'portada');
                                                    }}>
                                                    <Images className="img-fluid mx-auto d-block tab-img rounded"
                                                            height={370}
                                                            alt={file && file.name}
                                                            src={file && file.preview}
                                                    />
                                                </DropZoneIcon>
                                            </Col>
                                            <br />
                                            <hr />
                                            <Col md={12} className="text-center p-2" style={{height: '400px'}}>
                                                <Label htmlFor="field_discount">Foto de Banner</Label>
                                                <DropZoneIcon
                                                    maxFiles={1}
                                                    mode="block"
                                                    hasImage={fileBanner && fileBanner.preview}
                                                    onDrop={(files) => {
                                                        handleAcceptedFiles(files, 'banner');
                                                    }}>
                                                    <Images className="img-fluid mx-auto d-block tab-img rounded"
                                                            height={370}
                                                            alt={fileBanner && fileBanner.name}
                                                            src={fileBanner && fileBanner.preview}
                                                    />
                                                </DropZoneIcon>
                                            </Col>
                                            <Row>
                                                <Col md={12} className="text-right">
                                                    <ButtonSubmit loading={props.loading}/>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </AvForm>
                    </HasPermissions>
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

