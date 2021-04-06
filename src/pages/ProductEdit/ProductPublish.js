import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import {Col, Label, Row, Spinner} from "reactstrap"
import {FieldNumber, FieldSwitch, FieldText} from "../../components/Fields";
import {connect} from "react-redux";
import {AvForm} from "availity-reactstrap-validation";
import {updateProduct} from "../../store/product/actions";
import {STATUS} from "../../common/constants";
import {Button} from "@material-ui/core";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const ProductPublish = props => {
    const {product, updateProduct} = props
    const [productData, setProductData] = useState(product);

    useEffect(() => {
    }, [product])

    const handleValidSubmit = (event, values) => {
        const data = {
            published: values.published === true,
            discount: Number.parseFloat(values.discount)
        };
        updateProduct(product.id, data, props.history);
    }

    return (
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                <div className="p-4 border-top">
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label htmlFor="productpublished">Publicación Activa</Label>
                                <FieldSwitch name={"published"} defaultValue={productData.published}/>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label htmlFor="productdiscount">Descuento especial</Label>
                                <FieldNumber
                                    id={"field_discount"}
                                    name={"discount"}
                                    value={productData.discount}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className={"float-start m-3"}>
                                <ButtonSubmit loading={props.loading}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </AvForm>
        </React.Fragment>
    )
}

ProductPublish.propTypes = {
    product: PropTypes.object,
    onGetProductSizes: PropTypes.func,
}

const mapStateToProps = state => {
    const {product, loading, meta, refresh} = state.Product
    return {product, loading, meta, refresh}
}



export default  connect(mapStateToProps, {updateProduct})(ProductPublish)

