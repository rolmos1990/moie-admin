import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import StatesList from "./list/statesList";

const States = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/states" title={null} breadcrumbItem="Estados"/>
                    <StatesList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default States;
