import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import CategoryList from "./list/categoryList";
import {PERMISSIONS} from "../../helpers/security_rol";
import HasRole from "../../components/HasRole";

const Categories = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/categories" title={null} item="Categorias"/>
                    <HasRole role={PERMISSIONS.CATEGORY_LIST}>
                    <CategoryList/>
                    </HasRole>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Categories;
