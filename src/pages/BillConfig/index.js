import React from "react"
import {Container} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import BillConfigList from "./list/billConfigList";

const BillConfigs = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb path="/billConfigs" title={null} item="Configuración de Facturación"/>
                    <BillConfigList/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default BillConfigs;
