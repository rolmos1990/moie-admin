import React, {useState} from "react"
import {connect} from "react-redux"
import {Card, Col, Row} from "reactstrap"
import SecurityPermissions from "./SecurityPermissions";
import SecurityRoles from "./SecurityRoles";

const SecurityManagement = ({}) => {

    const [activeTab, setActiveTab] = useState(1);
    const [reloadPermissions, setReloadPermissions] = useState(false);

    const onChangeTab = (tab) => {
        if (tab === 1) {
            setReloadPermissions(true);
        } else {
            setReloadPermissions(false);
        }
        setActiveTab(tab);
    }

    return (
        <Row>
            <Col md={12}>
                <Card id={'order-tabs'} className="p-3">
                    <ul className="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} data-bs-toggle="tab" role="tab" aria-selected="false" onClick={() => onChangeTab(1)}>
                                <span className="d-block d-sm-none"><i className="fas fa-home"> </i></span>
                                <span className="d-none d-sm-block">Roles</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} data-bs-toggle="tab" role="tab" aria-selected="false" onClick={() => onChangeTab(2)}>
                                <span className="d-block d-sm-none"><i className="far fa-user"> </i></span>
                                <span className="d-none d-sm-block">Permisos</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content p-3 text-muted">
                        <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} role="tabpanel">
                            <SecurityRoles reloadPermissions={reloadPermissions}/>
                        </div>
                        <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} role="tabpanel">
                            <SecurityPermissions/>
                        </div>
                    </div>
                </Card>
            </Col>

        </Row>
    )
}

SecurityManagement.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SecurityManagement)
