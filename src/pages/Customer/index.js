import React from "react"
import { Container } from "reactstrap"
import CustomersList from "./CustomerList/customers-list";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {CustomerFilter} from "./CustomerFilter";
const Customer = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/customers" title={null} item="Clientes" />
                    <CustomersList />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Customer
