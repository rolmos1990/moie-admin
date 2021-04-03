import React, {useEffect, useState} from "react";
import {Col, Collapse, Container, Label, Media, Row, Spinner} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProduct, registerProduct, updateProduct} from "../../store/product/actions";
import {AvForm} from "availity-reactstrap-validation";
import {FieldSelect, FieldSwitch, FieldText, FieldNumber} from '../../components/Fields';
import {Button, Card} from "@material-ui/core";
import Dropzone from "react-dropzone"
import {getCategories} from "../../store/category/actions";
import {getSizes} from "../../store/sizes/actions";
import {arrayToOptions} from "../../common/converters";
import {STATUS} from "../../common/constants";
import SizeTemplateProduct from "./SizeTemplateProduct";

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

    const {getProduct, registerProduct, updateProduct, product, getCategories, categories, getSizes, sizes} = props;
    const [productData, setProductData] = useState({_status: STATUS.ACTIVE, sizeModelList: []});

    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryDefault, setCategoryDefault] = useState({});

    const [materialsList, setMaterialsList] = useState([{value: 1, label: 'Terciopelo'}, {value: 2, label: 'Seda'}, {value: 2, label: 'Algodon'}, {value: 3, label: 'Polyester'}]);
    const [materialDefault, setMaterialDefault] = useState({});

    const [sizesList, setSizesList] = useState([]);
    const [sizeDefault, setSizeDefault] = useState({});
    const [sizeSelected, setSizeSelected] = useState(null);

    const isEdit = props.match.params.id;

    //Carga inicial
    useEffect(() => {
        if (isEdit && getProduct) {
            getProduct(props.match.params.id);
        }else{
            getCategories();
            getSizes();
        }
    }, [getProduct]);

    //cargar info relacionada al prod
    useEffect(() => {
        if (product.id && isEdit) {
            setProductData({...product, _status: product.status});
            const defaultCategory = product.category?.id || null;
            setCategoryDefault(defaultCategory);

            const defaultMaterial = materialsList.filter(m => m.label === product.material)[0];
            if(defaultMaterial) setMaterialDefault(defaultMaterial.id);

            getCategories();
            getSizes();
        }
    }, [product]);

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoriesList(arrayToOptions(categories));
        } else {
            setCategoriesList([]);
        }
    }, [categories])

    useEffect(() => {
        if (sizes && sizes.length > 0) {
            const sizeList = arrayToOptions(sizes);
            if(product.size && product.size.id){
                const defaultSize = sizeList.filter(m => m.value === product.size.id)[0];
                setSizeDefault(defaultSize.value);
            }
            setSizesList(sizeList);
        } else {
            setSizesList([]);
        }
    }, [sizes])


    const handleValidSubmit = (event, values) => {
        const data = {
            ...values,
            category: values.category.value,
            material: values.material.label,
            size: values.size.value,
            status: 1,
            price: Number.parseFloat(values.price),
            cost: Number.parseFloat(values.cost),
        };

        if (!isEdit) {
            registerProduct(data, props.history)
        } else {
            updateProduct(props.match.params.id, data, props.history)
        }
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
                    <Breadcrumb hasBack path="/products" title={productData.name} breadcrumbItem={"Producto"}/>
                    <Row>
                        <Col md={12}>
                            <Card id={'main-data'}>
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
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"> </i>
                                        </Media>
                                    </div>
                                </Link>
                                <Collapse isOpen={isOpen}>
                                    <AvForm className="needs-validation" autoComplete="off"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                            }}>
                                        <div className="p-4 border-top">
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_name">Nombre de Producto <span className="text-danger">*</span></Label>
                                                        <FieldText
                                                            id={"field_name"}
                                                            name={"name"}
                                                            value={productData.name}
                                                            minLength={3}
                                                            maxLength={255}
                                                            required/>
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_provider">Proveedor</Label>
                                                        <FieldText
                                                            id={"field_provider"}
                                                            name={"provider"}
                                                            value={productData.provider}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_preference">Marca de Producto</Label>
                                                        <FieldText
                                                            id={"field_preference"}
                                                            name={"reference"}
                                                            value={productData.reference}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="cost">Costo <span className="text-danger">*</span></Label>
                                                        <FieldNumber
                                                            id={"field_cost"}
                                                            name={"cost"}
                                                            type="number"
                                                            value={productData.cost}
                                                            required/>
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3">
                                                        <Label htmlFor="price">Precio <span className="text-danger">*</span></Label>
                                                        <FieldNumber
                                                            id={"field_price"}
                                                            name={"price"}
                                                            value={productData.price}
                                                            required/>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="control-label">Categoria <span className="text-danger">*</span></Label>
                                                        <FieldSelect
                                                            id={"field_category"}
                                                            name={"category"}
                                                            options={categoriesList}
                                                            defaultValue={categoryDefault}
                                                            required
                                                            isSearchable
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="control-label">Material</Label>
                                                        <FieldSelect
                                                            id={"field_material"}
                                                            name={"material"}
                                                            options={materialsList}
                                                            defaultValue={materialDefault}
                                                            isSearchable
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <div className="mb-0">
                                                        <Label className="control-label">Tallas</Label>
                                                        <FieldSelect
                                                            id={"field_sizes"}
                                                            name={"size"}
                                                            options={sizesList}
                                                            defaultValue={sizeDefault}
                                                            onChange={(e) => {
                                                                setSizeSelected(sizes.find(s => s.id === e.value));
                                                            }}
                                                            isSearchable
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="mb-0">
                                                        <Label htmlFor="description">Descripción</Label>
                                                        <FieldText
                                                            id={"field_description"}
                                                            name={"description"}
                                                            value={productData.description}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <div className={"float-start m-3"}>
                                                    <Button color="primary" type="submit">
                                                        {props.loading && <Spinner size="sm" className="m-1" color="primary"/>}
                                                        Guardar
                                                    </Button>
                                                </div>
                                            </Row>
                                        </div>
                                    </AvForm>

                                </Collapse>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card id={'images'} className="mt-2">
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
                                            {({getRootProps, getInputProps}) => (
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
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card id={'publication'} className="mt-2">
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
                                    <AvForm className="needs-validation" autoComplete="off"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                            }}>
                                        <div className="p-4 border-top">
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="productname">Publicación Activa</Label>
                                                        <FieldSwitch name={"publish"}/>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="productname">Descuento especial</Label>
                                                        <FieldText name={"discount"}/>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </AvForm>
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mt-2">
                            <Card id={'inventory'}>
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
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"> < /i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpenInventary}>
                                    <div className="p-4 border-top">
                                        {productData.id && (
                                            <div className={"table-responsive"}>
                                                <h4>{productData.size ? productData.size.name : ''}</h4>
                                                <p>Ingrese color y tallas para el producto.</p>
                                                <SizeTemplateProduct template={productData.size} product={productData}/>
                                            </div>
                                        )}
                                    </div>
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {error, product, loading} = state.Product
    const {categories} = state.Category
    const {sizes} = state.Sizes
    return {error, product, categories, sizes, loading}
}

export default withRouter(
    connect(mapStateToProps, {getProduct, registerProduct, updateProduct, getCategories, getSizes})(ProductEdit)
)

ProductEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}
