import React from "react"
import { Container } from "reactstrap"
import CustomersList from "./CustomerList/customers-list";

const Customer = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h3>
                        Clientes
                    </h3>
                    <CustomersList />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Customer
