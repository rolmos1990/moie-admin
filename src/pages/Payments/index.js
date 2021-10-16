import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import PaymentsList from "./list/paymentsList";

const Payments = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/payments" title={null} item="Estados"/>
                    <PaymentsList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Payments;
