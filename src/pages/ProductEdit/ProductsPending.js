import React, {useEffect} from "react";
import {Col, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Card} from "@material-ui/core";
import {map} from "lodash";
import {pendingProducts} from "../../store/product/actions";

const ProductsPendingList = (props) => {

    const {onGetProductsPending, product, productsPending=[]} = props;

    useEffect(() => {
        if(product && product.id) {
            onGetProductsPending(product.id);
            //TODO revisar porque no retorna ordenes para el product codigo A1
        }
    }, [product]);

    return (
        <React.Fragment>
            <Card className="p-3">
                <Row>
                    <Col md={12}>
                        <h4 className="card-title text-info">Ordenes pendientes</h4>
                    </Col>
                </Row>
                <Row>
                   <Col md={12}>
                       <table className="table table-sm table-striped table-bordered table-centered table-nowrap font-size-11">
                           <thead>
                           <tr>
                               <th style={{width: '25%'}} className="text-center">Pedido #</th>
                               <th style={{width: '25%'}} className="text-center">Color</th>
                               <th style={{width: '25%'}} className="text-center">Talla</th>
                               <th style={{width: '25%'}} className="text-center">Cantidad</th>
                               <th style={{width: '25%'}} className="text-center">Cliente</th>
                               <th style={{width: '25%'}} className="text-center">Estado del pedido</th>
                           </tr>
                           </thead>
                           <tbody>
                           {map(productsPending, (prod, key) => (
                               <tr key={key}>
                                   <td className="text-center">{prod.order.id}</td>
                                   <td className="text-center">{prod.color}</td>
                                   <td className="text-center">{prod.size}</td>
                                   <td className="text-center">{prod.quantity}</td>
                                   <td className="text-center">{prod.customer.name}</td>
                                   <td className="text-center">{prod.order.status}</td>
                               </tr>
                           ))}
                           {productsPending.length === 0 && (
                               <tr>
                                   <td colSpan={8} className="text-center text-muted">No hay ordenes pendientes</td>
                               </tr>
                           )}
                           </tbody>
                       </table>
                   </Col>
                </Row>
            </Card>
        </React.Fragment>
    ) ;
}

const mapStateToProps = state => {
    const {error, product, loading} = state.Product
    return {error, product, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetProductsPending: (id) => dispatch(pendingProducts(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductsPendingList)
)

ProductsPendingList.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object,
    product: PropTypes.object,
}
