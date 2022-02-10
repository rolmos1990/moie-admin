import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import Stats from "./Stats";

const Reports = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/reports" title={null} item="Reportes"/>
                    <Stats/>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default Reports;
