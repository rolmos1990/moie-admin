import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";

const Reports = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/reports" title={null} item="Reportes"/>
                    <h1>building</h1>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default Reports;
