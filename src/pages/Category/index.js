import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import CategoryList from "./list/categoryList";

const Categories = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/categories" title={null} breadcrumbItem="Categorias"/>
                    <CategoryList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Categories;
