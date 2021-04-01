import CardProduct from './cardProduct';
import { map } from "lodash"
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {connect} from "react-redux";
import {getProducts} from "../../../store/product/actions";
import {useEffect, useState} from "react";
const ProductList = props => {

    const { refresh, onGetProducts, products } = props;
    const [productList, setProductList] = useState([])

    useEffect(() => {
        onGetProducts();
    }, [refresh])

    useEffect(() => {
        onGetProducts()
    }, [onGetProducts])

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (<Row>
        <Row className="mb-2">
            <Col md={6}>
                <div className="mb-3">
                    <Link to="/product" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-plus me-2"> </i> Nuevo Producto</Link>
                </div>
            </Col>

            <Col md={6}>
                <div className="form-inline float-md-end mb-3">
                    <div className="search-box ml-2">
                        <div className="position-relative">
                            <input type="text" className="form-control rounded border-0" placeholder="Buscar producto..." />
                            <i className="mdi mdi-magnify search-icon"> </i>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        {map(productList, (product, key) => (
            <CardProduct product={product} key={"_shop_" + key} />
        ))}
    </Row>)

}

ProductList.propTypes = {
    onGetProducts: PropTypes.func,
    products: PropTypes.array,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    refresh: PropTypes.bool,
}

const mapStateToProps = state => {
    const { products, loading, meta, refresh } = state.Product
    return { products, loading, meta, refresh }
}

const mapDispatchToProps = dispatch => ({
    onGetProducts: (conditional = null, limit= DEFAULT_PAGE_LIMIT, page) => dispatch(getProducts(conditional, limit, page))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
