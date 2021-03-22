import React, {useState} from "react";
import {CardBody, Col, Collapse, Container, Form, Label, Media, Row, Spinner} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProducts} from "../../store/product/actions";
import {AvForm} from "availity-reactstrap-validation";
import {FieldText, FieldSelect, FieldSwitch} from '../../components/Fields';
import {Button, Card} from "@material-ui/core";
import Dropzone from "react-dropzone"

const ProductEdit = (props) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const [isOpenDropImages, setIsOpenDropImages] = useState(false);
    const toggleDropImages = () => setIsOpenDropImages(!isOpenDropImages);

    const [isOpenWebConfig, setIsOpenWebConfig] = useState(false);
    const toggleWebConfig = () => setIsOpenWebConfig(!isOpenWebConfig);

    const [isOpenInventary, setIsOpenInventary] = useState(false);
    const toggleInventary = () => setIsOpenInventary(!isOpenInventary);

    const [selectedFiles, setselectedFiles] = useState([])

    const {getProducts, product } = props;
    const [ productData, setProductData ] = useState({});

    const isEdit = props.match.params.id;

    const handleValidSubmit = (event, values) => {

    }

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size)
            })
        )

        setselectedFiles(files)
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/products" title={productData.name} breadcrumbItem={"Producto"} />
                    <Row>
                    <Col md={8}>
                    <Row>
                        <AvForm className="needs-validation"
                                onValidSubmit={(e, v) => {
                                    handleValidSubmit(e, v)
                                }}>
                        <Col lg="12">
                            <Card>
                                <Link to="#" onClick={toggle} className="text-dark">
                                    <div className="p-4">

                                        <Media className="d-flex align-items-center">
                                            <div className="me-3">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        01
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <h5 className="font-size-16 mb-1">General</h5>
                                                <p className="text-muted text-truncate mb-0">Datos principales del producto</p>
                                            </div>
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpen}>
                                    <div className="p-4 border-top">
                                            <Row>
                                                <Col lg="6">
                                                <div className="mb-3">
                                                    <Label htmlFor="productname">Nombre de Producto</Label>
                                                    <FieldText name={"name"} />
                                                </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="manufacturername">
                                                            Proveedor
                                                        </Label>
                                                        <FieldText name={"name"} />
                                                    </div>
                                                </Col>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="manufacturerbrand">
                                                            Marca de Producto
                                                        </Label>
                                                        <FieldText name={"name"} />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="price">Costo</Label>
                                                        <FieldText name={"name"} />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="price">Precio</Label>
                                                        <FieldText name={"name"} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="control-label">Categoria</Label>
                                                        <FieldSelect name={"category"} options={[]} />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="control-label">Material</Label>
                                                        <FieldSelect name={"specifications"} options={[]} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="mb-0">
                                                <Label htmlFor="productdesc">
                                                    Product Description
                                                </Label>
                                                <FieldText name={"description"} />
                                                {/*<textarea
                                                    className="form-control"
                                                    id="productdesc"
                                                    rows="4"
                                                />*/}
                                            </div>
                                    </div>
                                </Collapse>
                            </Card>
                            <Card>
                                <Link to="#" className="text-dark collapsed" onClick={toggleDropImages}>
                                    <div className="p-4">

                                        <Media className="d-flex align-items-center">
                                            <div className="me-3">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        02
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <h5 className="font-size-16 mb-1">Imagenes</h5>
                                                <p className="text-muted text-truncate mb-0">Agrega las imagenes a su producto.</p>
                                            </div>
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpenDropImages}>
                                    <div className="p-4 border-top">
                                            <Dropzone
                                                onDrop={acceptedFiles => {
                                                    handleAcceptedFiles(acceptedFiles)
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className="dropzone">
                                                        <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="dz-message needsclick">
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted uil uil-cloud-upload"></i>
                                                                </div>
                                                                <h4>Suelta los archivos aquí para subirlos.</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    )
                                                })}
                                            </div>
                                    </div>
                                </Collapse>
                            </Card>

                            <Card>
                                <Link to="#" className="text-dark collapsed" onClick={toggleWebConfig}>
                                    <div className="p-4">

                                        <Media className="d-flex align-items-center">
                                            <div className="me-3">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        03
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <h5 className="font-size-16 mb-1">Publicación</h5>
                                                <p className="text-muted text-truncate mb-0">Configuraciones para la publicación en la Página Web.</p>
                                            </div>
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpenWebConfig}>
                                    <div className="p-4 border-top">
                                            <Row>
                                                <Col lg={6}>
                                            <div className="mb-3">
                                                <Label htmlFor="productname">Publicación Activa</Label>
                                                <FieldSwitch name={"publish"} />
                                            </div>
                                                </Col>
                                                <Col lg={6}>
                                            <div className="mb-3">
                                                <Label htmlFor="productname">Descuento especial</Label>
                                                <FieldText name={"discount"} />
                                            </div>
                                                </Col>
                                            </Row>
                                    </div>
                                </Collapse>
                            </Card>

                            <Card>
                                <Link to="#" className="text-dark collapsed" onClick={toggleInventary}>
                                    <div className="p-4">

                                        <Media className="d-flex align-items-center">
                                            <div className="me-3">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                        03
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <h5 className="font-size-16 mb-1">Inventario</h5>
                                                <p className="text-muted text-truncate mb-0">Agregue existencia a su producto.</p>
                                            </div>
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpenInventary}>
                                    <div className="p-4 border-top">
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label className="control-label">Tallas</Label>
                                                    <FieldSelect name={"category"} options={[]} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <p>Ingrese color y tallas para el producto.</p>
                                        <div className={"table-responsive"}>
                                            <table>
                                                <tr>
                                                    <th>Ingrese Color</th>
                                                    <th>S</th>
                                                    <th>M</th>
                                                    <th>L</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type={"text"} />
                                                    </td>
                                                    <td><select>
                                                        <option>1</option>
                                                        </select>
                                                    </td>
                                                    <td><select>
                                                        <option>2</option>
                                                    </select>
                                                    </td>
                                                    <td><select>
                                                        <option>3</option>
                                                    </select>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </Collapse>
                            </Card>

                            <Row>
                                <div className={"float-start m-3"}>
                                    <Button color="primary" type="submit">
                                        {props.loading && <Spinner size="sm" className="m-1" color="primary" />}
                                        Guardar
                                    </Button>
                                </div>
                            </Row>
                        </Col>
                        </AvForm>
                    </Row>
                    </Col>
                    </Row>
                    </Container>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const { error, product,loading } = state.Product
    return { error, product, loading }
}

export default withRouter(
    connect(mapStateToProps, { getProducts})(ProductEdit)
)

ProductEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}
