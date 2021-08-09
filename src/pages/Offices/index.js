import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import OfficeList from "./list/officeList";

const Offices = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/offices" title={null} item="Despachos"/>
                    <OfficeList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Offices;
