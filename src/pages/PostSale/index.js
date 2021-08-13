import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import PostSaleList from "./postSaleList";

const PostSale = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/postSales" title={null} item="Post Venta"/>
                    <PostSaleList/>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default PostSale;
