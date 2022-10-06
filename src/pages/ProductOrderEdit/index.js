import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Spinner} from "reactstrap"
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
import {getImageByGroup, getImageByQuality, productPriceWithDiscount} from "../../common/utils";
import {getCategory} from "../../store/category/actions";

const SortableItem = SortableElement(({value, index}) => (
    <Col xs={3} className={`text-center ${!value.published || (value.productAvailable && value.productAvailable.available <= 0) ? 'opacity-50' : ''}`} style={{padding: '20px', position:"relative"}}>
        {value.quantity}
        <div className={`border-1`} id={`product-${index}`} role="tabpanel">
            <Images src={`${getImageByQuality(getImageByGroup(value.productImage, 1), 'medium')}`}
                    alt={"image"}
                    height={350}
                    className="img-fluid d-block"
                    styles={{height: '250px', width: '303px', borderRadius: '8px', 'marginLeft': '4px'}}
            />
            <div style={{ position:"absolute", bottom:"20px" }}>
                <span style={{"fontWeight": "bold", "fontSize": "15px"}} className={"text-danger border badge rounded-pill p-2  bg-soft-danger m-2"}>{value.reference}</span>
                <span style={{"fontWeight": "bold"}} className={"border text-white badge rounded-pill p-2  bg-soft-secondary"}>{productPriceWithDiscount(value)}</span>
            </div>
        </div>
    </Col>
));

const SortableList = SortableContainer(({items}) => {
    return (
            <div style={{margin: "80px 30px",minWidth: "920px"}}>
            <Row>
            {items && items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} index={index} value={value} />
            ))}
            </Row>
            </div>
    );
});


const ProductOrderEdit = (props) => {
    const {onGetProducts, products, onReorderProduct, onGetCategory, category} = props;
    const [categoryData, setCategoryData] = useState(null);
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        if(onGetCategory){
            const _category = props.match.params.id;
            onGetCategory(_category);
        }
    }, [onGetCategory]);

    useEffect(() => {
        if(category && onGetProducts){
            setCategoryData(category);
            const conditions = new Conditionals.Condition;
            conditions.add('category', category.id);
            onGetProducts(conditions.condition, 10000, 0);
        }
    }, [category]);

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
            const productToMove = products[oldIndex];

            const dataToMove = {
                orden: (newIndex + 1),
                category: categoryData.id
            };

            onReorderProduct(productToMove.id, dataToMove, props.history);
            setProductsList(arrayMove(productsList, oldIndex, newIndex));
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/categories" title={category.name} item={"Orden de Producto"}/>

                    <HasPermissions permissions={[PERMISSIONS.PRODUCT_ORDER]} renderNoAccess={() => <NoAccess/>}>

                        <div>
                            <Card>
                                <CardBody>
                                    {categoryData == null ? (
                                        <Spinner size="lg" className="m-5" color="primary"/>
                                    ) : <div></div>}

                                    {productsList.length > 0 && (
                                        <SortableList items={productsList} onSortEnd={onSortEnd} lockOffset={false} axis={"xy"} />
                                    )}
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
    onGetCategory: (id) => dispatch(getCategory(id))
})

const mapStateToProps = state => {
    const {products, loading, meta, refresh} = state.Product
    const {category} = state.Category
    return {products, loading, meta, refresh, category}
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductOrderEdit)
)

ProductOrderEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

