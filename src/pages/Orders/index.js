import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import OrderList from "./orderList";
import HasRole from "../../components/HasRole";
import {PERMISSIONS} from "../../helpers/security_rol";

const Orders = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/orders" title={null} item="Pedidos"/>
                    <HasRole role={PERMISSIONS.ORDER_LIST}>
                        <OrderList/>
                    </HasRole>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default Orders;
