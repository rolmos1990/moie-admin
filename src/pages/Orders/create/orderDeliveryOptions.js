import React, {useState, useEffect} from "react"
import {Col, Label, Row, Spinner} from "reactstrap"
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../../store/auth/login/actions";
import PropTypes from "prop-types";
import {FieldAsyncSelect, FieldNumber, FieldSelect, FieldSelectBasic} from "../../../components/Fields";
import {GET_PRODUCT} from "../../../helpers/url_helper";
import {getProduct} from "../../../store/product/actions";
import {getEmptyOptions} from "../../../common/converters";
import {AvForm} from "availity-reactstrap-validation";
import {map} from "lodash";
import Images from "../../../components/Common/Image";
import {buildNumericOptions, getImageByQuality, priceFormat} from "../../../common/utils";
import Conditionals from "../../../common/conditionals";

const OrderDeliveryOptions = (props) => {
    const {onChange} = props;

    return (
        <React.Fragment>
            <AvForm className="needs-validation" autoComplete="off">
                <Row>
                    <Col>
                        <h5 className="text-info">Opciones de envio</h5>
                    </Col>
                </Row>
            </AvForm>
        </React.Fragment>
    )
}

OrderDeliveryOptions.propTypes = {
    onChange: PropTypes.func.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => {
    const {product, error, loading} = state.Product
    return {product, error, loading};
}

export default withRouter(connect(mapStateToProps, {apiError, getProduct})(OrderDeliveryOptions))
