import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import TemplateList from "./list/templateList";

const Templates = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/categories" title={null} item="Plantillas"/>
                    <TemplateList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Templates;
