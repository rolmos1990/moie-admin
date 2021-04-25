import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import OrderList from "./orderList";

const Orders = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/orders" title={null} item="Pedidos"/>
                    <OrderList/>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default Orders;
