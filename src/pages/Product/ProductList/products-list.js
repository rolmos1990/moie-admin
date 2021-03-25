import CardProduct from './cardProduct';
import { map } from "lodash"
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {deleteCustomer, getCustomers} from "../../../store/customer/actions";
import {connect} from "react-redux";
import {getProducts} from "../../../store/product/actions";
import {useEffect} from "react";
const ProductList = props => {

    const { refresh, onGetProducts } = props;

    useEffect(() => {
        onGetProducts();
    }, [refresh])

    const cardProducts = [
        {
            id: 1,
            color: "primary",
            name: "RUANA",
            reference: '123456',
            material: 'Algodon',
            category: 'Deportiva',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 2,
            color: "primary",
            name: "RUANA",
            reference: '22323123',
            material: 'POLYESTER',
            category: 'Blusas',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 3,
            color: "primary",
            name: "RUANA",
            reference: '2321322',
            material: 'POLYESTER',
            category: 'Pijamas',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 4,
            color: "primary",
            name: "RUANA",
            reference: '75647373',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 5,
            color: "primary",
            name: "RUANA",
            reference: '65663773',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 6,
            color: "primary",
            name: "RUANA",
            reference: '74783833',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 7,
            color: "primary",
            name: "RUANA",
            reference: '774883993',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 8,
            color: "primary",
            name: "RUANA",
            reference: '6648838383',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
        {
            id: 9,
            color: "primary",
            name: "RUANA",
            reference: '66273672362',
            material: 'POLYESTER',
            category: 'Vestidos',
            price: 100.00,
            total: 11,
            available: 10,
            reserved: 1,
            smallImg: '/test.png'
        },
    ];


    return (<Row>
        <Row className="mb-2">
            <Col md={6}>
                <div className="mb-3">
                    <Link to="/product" className="btn btn-primary waves-effect waves-light"><i className="mdi mdi-plus me-2"></i> Nuevo Producto</Link>
                </div>
            </Col>

            <Col md={6}>
                <div className="form-inline float-md-end mb-3">
                    <div className="search-box ml-2">
                        <div className="position-relative">
                            <input type="text" className="form-control rounded border-0" placeholder="Buscar producto..." />
                            <i className="mdi mdi-magnify search-icon"></i>
                        </div>
                    </div>

                </div>
            </Col>

        </Row>
        {map(cardProducts, (product, key) => (
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
