import React, {useEffect} from "react"
import {CardBody, Container} from "reactstrap"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {getBillConfig} from "../../store/billConfig/actions";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Card} from "@material-ui/core";
import BillConfigForm from "./BillConfigForm";

const BillConfigEdit = (props) => {
    const {getBillConfig, billConfig} = props;
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getBillConfig) {
            getBillConfig(props.match.params.id);
        }
    }, [getBillConfig]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/billConfigs" title={billConfig.name} item={"Resolucion"}/>
                    <Card>
                        <CardBody>
                            <BillConfigForm billConfig={billConfig}/>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {error, billConfig, loading} = state.BillConfig
    return {error, billConfig, loading}
}

export default withRouter(
    connect(mapStateToProps, {apiError, getBillConfig})(BillConfigEdit)
)

BillConfigEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

