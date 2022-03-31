import React from "react"
import { Container } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import ProductList from "./ProductList/products-list";
import HasRole from "../../components/HasRole";
import {PERMISSIONS} from "../../helpers/security_rol";
const Product = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/products" title={null} item="Productos" />
                    <HasRole role={PERMISSIONS.PRODUCT_LIST}>
                        <ProductList />
                    </HasRole>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Product
