import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row} from "reactstrap"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {PERMISSIONS} from "../../helpers/security_rol";
import NoAccess from "../../components/Common/NoAccess";
import HasPermissions from "../../components/HasPermissions";
import Conditionals from "../../common/conditionals";
import {getProducts, reorderProduct, resetProduct} from "../../store/product/actions";
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import Images from "../../components/Common/Image";
import {getImageByQuality, priceFormat} from "../../common/utils";



const SortableItem = SortableElement(({value, index}) => (
    <Col xs={2} className="text-center" style={{padding: '20px', position:"relative"}}>
        <div className={`border-1`} id={`product-${index}`} role="tabpanel">
            <Images src={`${getImageByQuality(value.productImage[0], 'medium')}`}
                    alt={""}
                    height={250}
                    className="img-fluid d-block"
                    styles={{height: '250px', width: '303px', borderRadius: '8px', 'marginLeft': '4px'}}
            />
            <div style={{ position:"absolute", bottom:"20px" }}>
                <span className={"badge rounded-pill p-2  bg-soft-primary m-2"}>{value.reference}</span>
                <span className={"badge rounded-pill p-2  bg-soft-secondary"}>{priceFormat(value.price)}</span>
            </div>
        </div>
    </Col>
));

const SortableList = SortableContainer(({items}) => {
    return (
            <div style={{margin: "80px 30px"}}>
            <Row>
            {items && items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} index={index} value={value} />
            ))}
            </Row>
            </div>
    );
});


const ProductOrderEdit = (props) => {
    const {onGetProducts, products, onReorderProduct} = props;
    const [category, setCategory] = useState(false);
    const [productsList, setProductsList] = useState([]);

    //carga inicial
    useEffect(() => {
        if (onGetProducts) {
            const _category = props.match.params.id;
            setCategory(_category);
            const conditions = new Conditionals.Condition;
            conditions.add('category', _category);
            onGetProducts(conditions.condition, 300, 0);
        }
    }, [onGetProducts]);

    useEffect(() => {
        if (products) {
            products.sort(function(a,b) {
                return a.orden - b.orden;
            })
            setProductsList(products);
        }
    }, [products]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        if(category && (oldIndex !== newIndex)) {
            const productToMove = (products.filter(item => item.orden === (oldIndex + 1)))[0];

            const dataToMove = {
                orden: (newIndex + 1),
                category: category
            };

            onReorderProduct(productToMove.id, dataToMove, props.history);
            setProductsList(arrayMove(productsList, oldIndex, newIndex));
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/categories" title={category} item={"Orden de Producto"}/>

                    <HasPermissions permissions={[PERMISSIONS.PRODUCT_ORDER]} renderNoAccess={() => <NoAccess/>}>
                        <div>
                            <Card>
                                <CardBody>

                                    <SortableList items={productsList} onSortEnd={onSortEnd} lockOffset={false} axis={"xy"} />

                                </CardBody>
                            </Card>
                        </div>
                    </HasPermissions>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    onResetProducts: () => {
        dispatch(resetProduct());
    },
    onGetProducts: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getProducts(conditional, limit, page)),
    onReorderProduct: (data, history) => dispatch(reorderProduct(data, history)),
})

const mapStateToProps = state => {
    const {products, loading, meta, refresh} = state.Product
    return {products, loading, meta, refresh}
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductOrderEdit)
)

ProductOrderEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}
