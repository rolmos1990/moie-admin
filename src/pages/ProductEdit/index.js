import React, {useEffect, useState} from "react";
import {Col, Collapse, Container, Label, Media, Row, Spinner} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProduct, registerProduct, updateProduct} from "../../store/product/actions";
import {AvForm} from "availity-reactstrap-validation";
import {FieldNumber, FieldSelect, FieldSwitch, FieldText} from '../../components/Fields';
import {Button, Card} from "@material-ui/core";
import {getCategories} from "../../store/category/actions";
import {getSizes} from "../../store/sizes/actions";
import {arrayToOptions} from "../../common/converters";
import {STATUS} from "../../common/constants";
import ProductSize from "./ProductSize";
import ProductImage from "./ProductImage";
import ProductPublish from "./ProductPublish";

const ProductEdit = (props) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const [isOpenDropImages, setIsOpenDropImages] = useState(false);
    const toggleDropImages = () => setIsOpenDropImages(!isOpenDropImages);

    const [isOpenWebConfig, setIsOpenWebConfig] = useState(false);
    const toggleWebConfig = () => setIsOpenWebConfig(!isOpenWebConfig);

    const [isOpenInventary, setIsOpenInventary] = useState(false);
    const toggleInventary = () => setIsOpenInventary(!isOpenInventary);



    const {getProduct, registerProduct, updateProduct, product, getCategories, categories, getSizes, sizes} = props;
    const [productData, setProductData] = useState({_status: STATUS.ACTIVE, sizeModelList: []});

    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryDefault, setCategoryDefault] = useState({});

    const [materialsList, setMaterialsList] = useState([{value: 1, label: 'Terciopelo'}, {value: 2, label: 'Seda'}, {value: 2, label: 'Algodon'}, {value: 3, label: 'Polyester'}]);
    const [materialDefault, setMaterialDefault] = useState({});
    const [publication, setPublication] = useState({_status: "true"});

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
            // material: values.material.label,
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
                                                <Col lg="12">
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
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_preference">Referencia</Label>
                                                        <FieldText
                                                            id={"field_preference"}
                                                            name={"reference"}
                                                            value={productData.reference}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="field_brand">Marca de Producto</Label>
                                                        <FieldText
                                                            id={"field_brand"}
                                                            name={"brand"}
                                                            value={productData.brand}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                    </div>
                                                </Col>

                                                <Col lg="3">
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

                                                <Col lg="3">
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
                                                <Col md="4">
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
                                                <Col md="4">
                                                    <div className="mb-3">
                                                        <Label className="control-label">Material</Label>
                                                        <FieldText
                                                            id={"field_material"}
                                                            name={"material"}
                                                            value={productData.material}
                                                            minLength={3}
                                                            maxLength={255}
                                                        />
                                                        {/*//TODO descomentar cuando este colgado del servicio
                                                        <FieldSelect
                                                            id={"field_material"}
                                                            name={"material"}
                                                            options={materialsList}
                                                            defaultValue={materialDefault}
                                                            isSearchable
                                                        />*/}
                                                    </div>
                                                </Col>
                                                <Col md="4">
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
                                            </Row>
                                            <Row>
                                                <Col md="12">
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
                            <Card id={'images'} className="mt-2 disabled">
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
                                    <ProductImage product={product}/>
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
                                            <i className="mdi mdi-chevron-up accor-down-icon font-size-24"> </i>
                                        </Media>

                                    </div>
                                </Link>
                                <Collapse isOpen={isOpenWebConfig}>
                                    {productData.id && (
                                        <ProductPublish product={product} />
                                    )}

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
                                        {(productData.id && productData.size) && (
                                            <>
                                                <h4>{productData.size ? productData.size.name : ''}</h4>
                                                <p>Ingrese color y tallas para el producto.</p>
                                                <ProductSize template={productData.size} product={productData}/>
                                            </>
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
