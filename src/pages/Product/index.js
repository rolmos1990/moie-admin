import React from "react"
import { Container } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import ProductList from "./ProductList/products-list";
const Product = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/products" title={null} breadcrumbItem="Productos" />
                    <ProductList />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Product
