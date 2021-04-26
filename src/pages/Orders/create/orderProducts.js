import React, {useState, useEffect} from "react"
import {Col, Label, Row, Spinner} from "reactstrap"
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {FieldAsyncSelect, FieldNumber, FieldSelect, FieldSelectBasic} from "../../../components/Fields";
import {GET_PRODUCT} from "../../../helpers/url_helper";
import {getProduct} from "../../../store/product/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {map} from "lodash";
import Images from "../../../components/Common/Image";
import {buildNumericOptions, getImageByQuality, priceFormat} from "../../../common/utils";
import Conditionals from "../../../common/conditionals";

const OrderProducts = (props) => {
    const {onSelect, product, getProduct} = props;
    const [productData, setProductData] = useState({});
    const [productDefault, setProductDefault] = useState(getEmptyOptions());
    const [productReferenceDefault, setProductReferenceDefault] = useState(getEmptyOptions());
    const [imgSelected, setImgSelected] = useState(0);
    const [colorsMap, setColorsMap] = useState({});
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState({});
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState({});

    useEffect(() => {
        if (product.id) {
            const productImage = product.productImage.length > 0 ? product.productImage : [{}];
            setProductData({...product, _status: product.status, productImage: productImage});

            const map = {};
            if (product.productSize.length) {
                product.productSize.forEach((s => {
                    if (!map[s.color]) map[s.color] = [];
                    map[s.color].push({label: s.name, value: s.id});
                }))
            }
            setColorsMap(map);

            let productSizeColors = Object.keys(map).map(k => ({label: k, value: k}));
            setColors(productSizeColors);
            if (productSizeColors.length === 1) {
                setColor(productSizeColors[0]);
            }
        } else {
            resetData();
        }
    }, [product]);

    const addToOrder = (e, d) => {
        const prod = {
            origin: productData,
            color: d.color.value,
            size: d.size.label,
            sizeId: d.size.value,
            quantity: d.quantity.value,
        };

        onSelect(prod);
        resetData();
    }

    const resetData = () => {
        setProductDefault(getEmptyOptions());
        setProductReferenceDefault(getEmptyOptions());
        setProductData({})
    }

    return (
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => addToOrder(e, v)}>
                <Row>
                    <Col>
                        <h5 className="text-info">Agregar productos</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Label htmlFor="product">Buscar por Código</Label>
                        <FieldAsyncSelect
                            name={"productCode"}
                            urlStr={GET_PRODUCT}
                            placeholder="Código del producto"
                            defaultValue={productReferenceDefault}
                            conditionalOptions={{fieldName: 'reference', operator: Conditionals.OPERATORS.EQUAL}}
                            onChange={(d) => {
                                getProduct(d.value);
                                setProductDefault(getEmptyOptions());
                            }}
                        />
                    </Col>
                    <Col md={9}>
                        <Label htmlFor="product">Buscar por Nombre</Label>
                        <FieldAsyncSelect
                            name={"productName"}
                            urlStr={GET_PRODUCT}
                            placeholder="Nombre del producto"
                            defaultValue={productDefault}
                            onChange={(d) => {
                                getProduct(d.value);
                                setProductReferenceDefault(getEmptyOptions());
                            }}
                        />
                    </Col>
                </Row>
                {productData.id && (
                    <Row className="mt-3">
                        <Col md={3} className="text-center">
                            <Row className="">
                                <Col md={4} className="image-left-panel" style={{minHeight: '225px'}}>
                                    <div className={`nav flex-column nav-pills`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {map(productData.productImage, (img, key) => (
                                            <div key={key}
                                                 className={`cursor-pointer nav-link ${imgSelected === key ? 'custom-active' : ''}`}
                                                 onClick={() => (setImgSelected(key))}>
                                                <Images src={`${getImageByQuality(img, 'small')}`}
                                                        alt={img.filename}
                                                        className="img-fluid mx-auto d-block tab-img rounded"/>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="tab-content position-relative" id="v-pills-tabContent">
                                        {map(productData.productImage, (img, key) => (
                                            <div key={key} className={`tab-pane fade ${imgSelected === key ? 'show active bg-white border-1' : ''}`} id={`product-${key}`} role="tabpanel">
                                                <div className="product-img panel-bordered">
                                                    <Images src={`${getImageByQuality(img, 'medium')}`}
                                                            alt={img.filename}
                                                            className="img-fluid mx-auto d-block"
                                                            width={200}
                                                            data-zoom={`${img.path}`}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <Col md={12}>
                                            <div className="p-1">
                                                <b className="text-info font-size-16">{productData.reference}</b> - <span>{productData.name}</span>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <label>Categoria: </label>
                                            <span className="p-1">{productData.category?.name}</span>
                                        </Col>
                                        <Col md={12}>
                                            <label>Material: </label>
                                            <span className="p-1">{productData.material}</span>
                                        </Col>
                                        {productData.size && (
                                            <Col md={12}>
                                                <label>Tipo: </label>
                                                <span className="p-1">{productData.size.name}</span>
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Col md={12} className="text-right">
                                            <div className="mt-3">
                                                <p className="text-muted mb-2">Precio</p>
                                                <h5 className="font-size-16">{priceFormat(productData.price)}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={4}>
                                    <Label className="control-label">Color</Label>
                                    <FieldSelect
                                        id={"color"}
                                        name={"color"}
                                        options={colors}
                                        value={color}
                                        onChange={(e) => {
                                            setSizes(colorsMap[e.label]);
                                            setColor(colors.find(s => s.id === e.value));
                                        }}
                                        isSearchable
                                        required
                                    />
                                </Col>
                                <Col md={3}>
                                    <Label className="control-label">Tallas</Label>
                                    <FieldSelect
                                        id={"size"}
                                        name={"size"}
                                        options={sizes}
                                        defaultValue={size}
                                        onChange={(e) => {
                                            setSize(sizes.find(s => s.id === e.value));
                                        }}
                                        isSearchable
                                        required
                                    />
                                </Col>
                                <Col md={3}>
                                    <Label htmlFor="weight">Cantidad</Label>
                                    <FieldSelect
                                        id={"quantity"}
                                        name={"quantity"}
                                        options={buildNumericOptions(100, 1, 1)}
                                        defaultValue={product.quantity}
                                        required
                                    />
                                </Col>
                                <Col md={2} style={{display: 'flex', 'alignItems': 'normal'}}>
                                    <button type="submit" className="btn btn-primary btn-block waves-effect waves-light mt-2 me-1 w-100">
                                        <i className="uil uil-shopping-cart-alt me-2"> </i> Agregar
                                    </button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                )}
            </AvForm>
        </React.Fragment>
    )
}

OrderProducts.propTypes = {
    onSelect: PropTypes.func.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => {
    const {product, error, loading} = state.Product
    return {product, error, loading};
}

export default withRouter(connect(mapStateToProps, {apiError, getProduct})(OrderProducts))
