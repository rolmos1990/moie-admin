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
import {resetOrderCategoryApi} from "../../helpers/backend_helper";
import HasPermissionsFunc from "../../components/HasPermissionsFunc";

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
    const {onGetProducts, products, onReorderProduct, onGetCategory, category, loading} = props;
    const [gloading, setGloading] = useState(false);
    const [page, setPage] = useState(0);
    const [categoryData, setCategoryData] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const limited = 200;

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

            const order = {field: "orden", type: "asc"}
            onGetProducts(conditions.condition, limited, page, order);
            setPage(page );
        }
    }, [category]);

    useEffect(() => {
        if (products && products.length > 0) {
            let merged = productsList.concat(products);
            setProductsList(merged);
        }
    }, [products]);

    const onSortEnd = ({oldIndex, newIndex}) => {

        const _newOrder = newIndex + 1;
        const _oldOrder = oldIndex + 1;

        if(category && (oldIndex !== newIndex)) {

            const productToMove = (productsList.filter(item => item.orden == _oldOrder))[0];

            const dataToMove = {
                orden: _newOrder,
                category: categoryData.id
            };

            onReorderProduct(productToMove.id, dataToMove, props.history);

            const newProductsLists = productsList.map(item => {
               if(item.orden == _oldOrder){
                   item.orden = _newOrder;
                   return item;
               } else if(item.orden == _newOrder){
                   item.orden = _oldOrder;
                   return item;
               }

               return item;
            });

            newProductsLists.sort(function(a, b) {
                const x = a['orden'];
                const y = b['orden'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            setProductsList(newProductsLists);
        }
    }

    const getMore = () => {
        const nextPage = page + limited;
        const conditions = new Conditionals.Condition;
        conditions.add('category', category.id);
        const order = {field: "orden", type: "asc"}
        onGetProducts(conditions.condition, limited, nextPage, order);
        setPage(nextPage);
    }

    const reorder = () => {
        if((category && category.id) && !gloading) {
            setGloading(true);
            resetOrderCategoryApi(category.id).then(function (resp) {
                const conditions = new Conditionals.Condition;
                conditions.add('category', category.id);
                const order = {field: "orden", type: "asc"}
                onGetProducts(conditions.condition, limited, 0, order);
                setPage(0);
                setGloading(false);
            });
        }
    }

    const canReorder = (HasPermissionsFunc([PERMISSIONS.CATEGORY_REORDER]));


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/categories" title={category.name} item={"Orden de Producto"}/>

                    <HasPermissions permissions={[PERMISSIONS.PRODUCT_ORDER]} renderNoAccess={() => <NoAccess/>}>

                        <div>
                            <Card>
                                <CardBody>
                                    <div className={"text-center"}>
                                        {canReorder && (
                                            <button size="small" className="btn btn-md btn-primary" onClick={() => reorder()}>
                                                {gloading && <Spinner size="sm" className="m-1" color="white"/>}
                                                Re-organizar &nbsp; <i className="fa fa-sync-alt"> </i>
                                            </button>
                                        )}
                                    </div>
                                    {categoryData == null ? (
                                        <Spinner size="lg" className="m-5" color="primary"/>
                                    ) : <div></div>}

                                    {productsList.length > 0 && (
                                        <SortableList items={productsList} onSortEnd={onSortEnd} lockOffset={false} axis={"xy"} />
                                    )}
                                    {!loading && (
                                        <div className={"text-center"}>
                                        <button size="small" className="btn btn-md btn-primary" onClick={() => getMore()}>
                                            Mostrar m&aacute;s <i className="fa fa-ellipsis-h"> </i>
                                        </button>
                                        </div>
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
    onGetProducts: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page, order) => dispatch(getProducts(conditional, limit, page, order)),
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

