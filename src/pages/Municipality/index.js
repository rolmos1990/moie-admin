import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import MunicipalityList from "./list/municipalityList";

const Municipalities = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/municipalities" title={null} breadcrumbItem="Municipios"/>
                    <MunicipalityList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Municipalities;
