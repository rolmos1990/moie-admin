import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import SecurityManagement from "./SecurityManagement";

const Security = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/security" title={null} item="Seguridad"/>
                    <SecurityManagement/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Security;
