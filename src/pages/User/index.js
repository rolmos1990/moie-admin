import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import UserList from "./list/userList";

const Users = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/users" title={null} item="Usuarios"/>
                    <UserList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Users;
