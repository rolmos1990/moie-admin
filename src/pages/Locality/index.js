import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import CategoryList from "./list/localityList";
import {PERMISSIONS} from "../../helpers/security_rol";
import HasPermissions from "../../components/HasPermissions";
import NoAccess from "../../components/Common/NoAccess";

const Categories = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/deliveryLocality" title={null} item="Localidades"/>
                    <HasPermissions permission={PERMISSIONS.DELIVERY_LOCALITY_LIST} renderNoAccess={() => <NoAccess/>}>
                        <CategoryList/>
                    </HasPermissions>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Categories;
