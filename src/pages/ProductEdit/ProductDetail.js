import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProduct} from "../../store/product/actions";
import {Card} from "@material-ui/core";
import {STATUS} from "../../common/constants";
import Images from "../../components/Common/Image";
import {getImageByQuality, priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {map} from "lodash";

const ProductDetail = (props) => {

    const {getProduct, product} = props;
    const [productData, setProductData] = useState({_status: STATUS.ACTIVE});
    const [imgSelected, setImgSelected] = useState(0);

    useEffect(() => {
        getProduct(props.match.params.id);
    }, [getProduct]);

    useEffect(() => {
        if (product.id) {
            setProductData({...product, _status: product.status});
        }
    }, [product]);

    return productData.id ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/products" title={productData.name} breadcrumbItem={"Producto"}/>

                    <Card id={'details'}>

                        <Row>
                            <Col md={4} className="p-3 text-center">
                                <div className="row">
                                    <div className="col-3 image-left-panel">
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
                                    </div>

                                    <div className="col-9">
                                        <div className="tab-content position-relative" id="v-pills-tabContent">
                                            {/*<div className="product-wishlist">
                                                <a href="#">
                                                    <i className="mdi mdi-heart-outline"></i>
                                                </a>
                                            </div>*/}
                                            {map(productData.productImage, (img, key) => (
                                                <div className={`tab-pane fade ${imgSelected === key ? 'show active bg-white border-1' : ''}`} id={`product-${key}`} role="tabpanel">
                                                    <div className="product-img">
                                                        <Images src={`${getImageByQuality(img, 'high')}`}
                                                                alt={img.filename}
                                                                className="img-fluid mx-auto d-block"
                                                                data-zoom={`${img.path}`}/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} className="p-3">
                                <Row>
                                    <Col md={12}>
                                        <Row>
                                            <Col xs={10}>
                                                <h4 className="card-title">Descripción del producto</h4>
                                            </Col>
                                            <Col md={2} className="text-right">
                                                <li className="list-inline-item">
                                                    <Link to={`/product/${productData.id}`} className="px-2 text-primary">
                                                        <i className="uil uil-pen font-size-18"> </i>
                                                    </Link>
                                                </li>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={12}>
                                        <Col md={12}>
                                            <label>Referencia: </label>
                                            <span className="p-1 text-muted">{productData.reference}</span>
                                        </Col>
                                        <Col md={12}>
                                            <label>Nombre: </label>
                                            <span className="p-1">{productData.name}</span>
                                        </Col>
                                        <Col md={12}>
                                            <label>Descripción: </label>
                                            <span className="p-1">{productData.description}</span>
                                        </Col>
                                        <Col md={12}>
                                            <label>Costo: </label>
                                            <span className="p-1">{priceFormat(productData.cost, "", true)}</span>
                                        </Col>
                                        <Col md={12}>
                                            <label>Precio: </label>
                                            <span className="p-1">{priceFormat(productData.price, "", true)}</span>
                                        </Col>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col md={12}>
                                        <h4 className="card-title">Especificaciones</h4>
                                    </Col>
                                    <Col md={12}>
                                        <label>Tipo: </label>
                                        <span className="p-1">{productData.size?.name}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Categoria: </label>
                                        <span className="p-1">{productData.category?.name}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Material: </label>
                                        <span className="p-1">{productData.material}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Peso (g): </label>
                                        <span className="p-1">{productData.weight}</span>
                                    </Col>
                                    <Col md={12}>
                                        <label>Proveedor: </label>
                                        <span className="p-1">{productData.provider}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {error, product, loading} = state.Product
    return {error, product, loading}
}

export default withRouter(
    connect(mapStateToProps, {getProduct})(ProductDetail)
)

ProductDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}
