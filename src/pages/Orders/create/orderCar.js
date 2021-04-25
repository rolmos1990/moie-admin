import React, {useState, useEffect} from "react"
import {CardBody, Col, Label, Row, Spinner} from "reactstrap"
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {FieldAsyncSelect, FieldNumber, FieldSelect} from "../../../components/Fields";
import {GET_PRODUCT} from "../../../helpers/url_helper";
import {getProduct} from "../../../store/product/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {Button, Tooltip} from "@material-ui/core";
import {map} from "lodash";
import Images from "../../../components/Common/Image";
import {getImageByQuality, priceFormat} from "../../../common/utils";
import ButtonSubmit from "../../../components/Common/ButtonSubmit";
import Conditionals from "../../../common/conditionals";
import {HtmlTooltip} from "../../../components/Common/HtmlTooltip";

const OrderCar = (props) => {
    const {products, delivery} = props;
    const [summary, setSummary] = useState({quantity: 0, totalDiscount: 0, totalWithoutDiscount: 0, totalWithDiscount: 0, delivery: 0, totalWithDelivery: 0, weight: 0});

    useEffect(() => {
        const s = {quantity: 0, totalDiscount: 0, totalWithoutDiscount: 0, totalWithDiscount: 0, delivery: 0, totalWithDelivery: 0, weight: 0};
        products.forEach(product => {
            s.quantity += product.quantity;
            s.weight += product.origin.weight || 0;
            s.totalDiscount += product.discount;
            s.totalWithoutDiscount += product.origin.price * product.quantity;
            s.totalWithDiscount += product.total;
        });
        s.totalWithDelivery = s.totalWithDiscount + delivery;
        setSummary(s);
    }, [products])

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h5 className="text-info">Pedido</h5>
                </Col>
                <Col md={12}>
                    <table className="table table-sm table-striped table-bordered table-centered table-nowrap">
                        <thead>
                        <tr>
                            <th className="text-center">Código</th>
                            <th className="text-center">Color</th>
                            <th className="text-center">Talla</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-center">Precio Unit.</th>
                            <th className="text-center">Descuento</th>
                            <th className="text-center">SubTotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {map(products, (product, key) => (
                            <tr key={key}>
                                <td>
                                    <HtmlTooltip
                                        title={
                                            <React.Fragment>
                                                <Images src={`${getImageByQuality(product.origin.productImage.length > 0 ? product.origin.productImage[0] : {}, 'medium')}`}
                                                        alt={product.origin.reference}
                                                        className="img-fluid mx-auto d-block tab-img rounded"/>
                                            </React.Fragment>
                                        }>
                                        <div className="text-info">{product.origin.reference}</div>
                                    </HtmlTooltip>

                                </td>
                                <td className="text-center">{product.color}</td>
                                <td className="text-center">{product.size}</td>
                                <td className="text-center">{product.quantity}</td>
                                <td className="text-end">{priceFormat(product.origin.price)}</td>
                                <td className="text-center">{product.discount}%</td>
                                <td className="text-end">{priceFormat(product.total)}</td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-muted">Pedido vacio</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 6, order: 1, offset: 6}}>
                    <div className="card border shadow-none">
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table table-sm mb-0">
                                    <tbody>
                                    <tr>
                                        <td>Piezas:</td>
                                        <td className="text-end">{summary.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td>Peso:</td>
                                        <td className="text-end">{summary.weight}</td>
                                    </tr>
                                    <tr>
                                        <td>Total sin descuento:</td>
                                        <td className="text-end">{priceFormat(summary.totalWithoutDiscount)}</td>
                                    </tr>
                                    <tr>
                                        <td>Descuento:</td>
                                        <td className="text-end">- {priceFormat(summary.totalDiscount)}</td>
                                    </tr>
                                    <tr>
                                        <td>Total con descuento:</td>
                                        <td className="text-end">{priceFormat(summary.totalWithDiscount)}</td>
                                    </tr>
                                    <tr>
                                        <td>Envio:</td>
                                        <td className="text-end">{priceFormat(summary.delivery)}</td>
                                    </tr>
                                    <tr className="bg-light">
                                        <th>Total :</th>
                                        <td className="text-end"><span className="fw-bold">{priceFormat(summary.totalWithDelivery)}</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
        </React.Fragment>
    )
}

OrderCar.propTypes = {
    products: PropTypes.array.isRequired,
    delivery: PropTypes.number.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => {
    const {product, error, loading} = state.Product
    return {product, error, loading};
}

export default withRouter(connect(mapStateToProps, {apiError, getProduct})(OrderCar))
