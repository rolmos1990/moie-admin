import React, {useEffect, useState} from "react"
import {Col, Row} from "reactstrap"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getProduct} from "../../../store/product/actions";
import {map} from "lodash";
import Images from "../../../components/Common/Image";
import {getImageByQuality, priceFormat, buildNumericOptions} from "../../../common/utils";
import {FieldSelect, FieldSelectBasic} from "../../../components/Fields";
import {HtmlTooltip} from "../../../components/Common/HtmlTooltip";
import {AvForm} from "availity-reactstrap-validation";

const modelSummary = () => ({quantity: 0, totalDiscount: 0, totalWithoutDiscount: 0, totalWithDiscount: 0, delivery: 0, totalWithDelivery: 0, weight: 0});

const OrderCar = (props) => {
    const {productSelected, delivery} = props;
    const [summary, setSummary] = useState(modelSummary());
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if(productSelected && productSelected.origin){
            const list = [...productList, productSelected];
            setProductList(getProductListWithTotals(list));
        }
    }, [productSelected])

    useEffect(() => {
        const s = modelSummary();
        productList.forEach(prod => {
            s.quantity += parseInt(prod.quantity);
            s.weight += prod.origin.weight || 0;
            s.totalDiscount += prod.discount;
            s.totalWithoutDiscount += prod.origin.price * prod.quantity;
            s.totalWithDiscount += prod.total;
        });
        s.totalWithDelivery = s.totalWithDiscount + delivery;
        setSummary(s);
    }, [productList])

    const getProductListWithTotals = (list) => {
        var map = {};
        list
            .map((prod) => {
                const discountPercentage = 0;
                let total = prod.origin.price * prod.quantity;
                const discount = total * (discountPercentage / 100);

                total = total - discount;

                return {
                    ...prod,
                    quantity: parseInt(prod.quantity),
                    discountPercentage: discountPercentage,
                    discount: discount,
                    total: total,
                };
            })
            .forEach((prod) => {
                const key = prod.origin.id + '_' + prod.color + '_' + prod.sizeId;
                if (map[key]) {
                    map[key].quantity += prod.quantity;
                    map[key].total += prod.total;
                } else {
                    map[key] = prod;
                }
            });
        return Object.keys(map).map((key) => (map[key]));
    }

    const removeProduct = (prod) => {
        const list = [...productList];
        list.splice(list.indexOf(prod), 1);
        setProductList(list);
    }

    const onChangeQuantity = (quantity, p) => {
        const list = [...productList];

        if (quantity === 0) {
            removeProduct(p);
        } else {
            list.forEach((prod) => {
                if (prod.origin.id === p.origin.id) {
                    prod.quantity = parseInt(quantity);
                }
            });
            setProductList(getProductListWithTotals(list));
        }
    }

    const onCancelOrder = () => {

    }

    const onCreateOrder = () => {

    }

    return (
        <React.Fragment>
            <Row>
                <Col md={12}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <h5 className="text-info">Resumen del pedido</h5>
                        </Col>
                        <Col md={6} className="text-right">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light text-danger" onClick={() => onCancelOrder()}>
                                    <i className="uil uil-trash-alt font-size-18"> </i> Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" disabled={!productList || productList.length === 0} onClick={() => onCreateOrder()}>
                                    <i className="uil uil-shopping-cart-alt me-2"> </i> Crear pedido
                                </button>
                            </div>
                        </Col>
                    </Row>
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
                            <th className="text-center"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {map(productList, (product, key) => (
                            <tr key={key}>
                                <td style={{width: '10%'}}>
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
                                <td style={{width: '25%'}} className="text-center">{product.color}</td>
                                <td style={{width: '15%'}} className="text-center">{product.size}</td>
                                <td style={{width: '15%'}}>
                                    <AvForm className="needs-validation" autoComplete="off">
                                        <FieldSelect
                                            id={"quantity"}
                                            name={"quantity"}
                                            options={buildNumericOptions(100)}
                                            defaultValue={product.quantity}
                                            onChange={(item => onChangeQuantity(item.value, product))}
                                            required
                                        />
                                    </AvForm>
                                </td>
                                <td style={{width: '10%'}} className="text-end">{priceFormat(product.origin.price)}</td>
                                <td style={{width: '10%'}} className="text-center">{product.discount}%</td>
                                <td style={{width: '10%'}} className="text-end">{priceFormat(product.total)}</td>
                                <td style={{width: '5%'}} className="text-end">
                                    <button size="small" className="btn btn-sm text-danger" onClick={() => removeProduct(product)}>
                                        <i className="uil uil-trash-alt font-size-18"> </i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {productList.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center text-muted">Pedido vacio</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                {/*<Col md={{size: 6, order: 1, offset: 6}}>*/}
                <Col md={6}>
                    <div className="card border shadow-none">
                        <div className="card-body p-2">
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
                <Col md={6}>

                </Col>
            </Row>
        </React.Fragment>
    )
}

OrderCar.propTypes = {
    productSelected: PropTypes.object.isRequired,
    delivery: PropTypes.number.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => {
    const {product, error, loading} = state.Product
    return {product, error, loading};
}

export default withRouter(connect(mapStateToProps, {apiError, getProduct})(OrderCar))
