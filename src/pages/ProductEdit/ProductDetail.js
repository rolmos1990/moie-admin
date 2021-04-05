import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProduct} from "../../store/product/actions";
import {Card} from "@material-ui/core";
import {STATUS} from "../../common/constants";
import Images from "../../components/Common/Image";
import {priceFormat} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";

const ProductDetail = (props) => {

    const {getProduct, product} = props;
    const [productData, setProductData] = useState({_status: STATUS.ACTIVE});

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
                <Breadcrumb hasBack path="/products" title={productData.name} breadcrumbItem={"Producto"}/>

                <Card id={'details'}>

                    <Row>
                        <Col md={4} className="p-3 text-center">
                            <Images className="rounded bg-light"
                                    alt={productData.name}
                                    src={productData.path}
                                    height={300}
                                    width="auto"

                            />
                        </Col>
                        <Col md={8} className="p-3">
                            <Row>
                                <Col md={12}>
                                   <Row>
                                       <Col xs={10}>
                                           <h4>Descripción del producto</h4>
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
                                    <small className="text-muted">{productData.reference}</small>
                                    <br/>
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
                                        <label>Pecio: </label>
                                        <span className="p-1">{priceFormat(productData.price, "", true)}</span>
                                    </Col>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={12}>
                                    <h4>Especificaciones</h4>
                                </Col>
                                <Col md={12}>
                                    <label>Tipo: </label>
                                    <span className="p-1">{productData.size.name}</span>
                                </Col>
                                <Col md={12}>
                                    <label>Categoria: </label>
                                    <span className="p-1">{productData.category.name}</span>
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
