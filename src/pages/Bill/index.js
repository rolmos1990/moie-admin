import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import BillList from "./list/billList";

const Bills = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/bills" title={null} item="Facturas"/>
                    <BillList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Bills;
