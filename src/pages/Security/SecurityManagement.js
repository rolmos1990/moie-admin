import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Label, Row} from "reactstrap"
import {map} from "lodash";
import {AvForm} from "availity-reactstrap-validation";
import {deleteDataApi, fetchDataApi, postApi, registerDataApi} from "../../helpers/backend_helper";
import * as url from "../../helpers/url_helper";
import {FieldSelect, FieldText} from "../../components/Fields";

const SecurityManagement = (props) => {

    const [permissions, setPermissions] = useState([]);//list
    const [permissionsMap, setPermissionsMap] = useState({});
    const [permissionsOptions, setPermissionsOptions] = useState([]);
    const [roles, setRoles] = useState([]);//group
    const [roleSelected, setRoleSelected] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [rolEdited, setRolEdited] = useState(null);
    const [newRole, setNewRole] = useState(null);

    useEffect(() => {
        getPermissions();
        getRoles();
    }, [setPermissions]);

    useEffect(() => {
        if (roleSelected && roleSelected.id) {
            const currentPermissions = roleSelected.permissions.map(p => p.id);
            setPermissionsOptions(permissions.filter(p => !currentPermissions.includes(p.id)).map(p => ({label: p.permission, value: p.id})));
        }
    }, [roleSelected]);

    const getRoles = () => {
        fetchDataApi(url.SECURITY_ROLES).then(resp => {
            console.log('url.SECURITY_ROLES', resp);
            setRoles(resp.data);
        })
    };

    const getPermissions = () => {
        fetchDataApi(url.SECURITY_PERMISSIONS).then(resp => {
            console.log('url.SECURITY_PERMISSIONS', resp);
            setPermissions(resp.data);
            setPermissionsOptions((resp.data || []).map(p => ({label: p.permission, value: p.id})));

            const map = {};
            resp.data.forEach(r => map[r.id] = r)
            setPermissionsMap(map)
        })
    };

    const onAddPermission = (ev, data) => {
        const payload = {permission: data.permission.value};
        console.log(payload)
        postApi(`${url.SECURITY_ROLES}/${roleSelected.id}/addPermission`, payload).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                getRoles();
            }
        })
    };

    const onRemovePermission = (p) => {
        const payload = {permission: p.id};
        console.log(payload)
        postApi(`${url.SECURITY_ROLES}/${roleSelected.id}/removePermission`, payload).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                getRoles();
            }
        })
    };

    const onAddRole = () => {
        const list = {...roles};
        list.unshift({name: ''});
        setRoles(list);
    };

    const onSaveRole = (ev, data) => {
        registerDataApi(url.SECURITY_ROLES, {name: data.name}).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                getRoles();
            }
        })
    };

    const onDeleteRole = (role) => {
        deleteDataApi(url.SECURITY_ROLES, role.id, {}).then(resp => {
            console.log(resp)
            if (resp.success) {
                getRoles();
            }
        })
    };

    const onDeletePermission = (permission) => {
        deleteDataApi(url.SECURITY_PERMISSIONS, permission.id, {}).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                getPermissions();
            }
        })
    };

    const onCreatePermission = (ev, data) => {
        registerDataApi(url.SECURITY_PERMISSIONS, data).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                getPermissions();
            }
        })
    };

    return (
        <Row>
            <Col md={12}>
                <Card id={'order-tabs'} className="p-3">
                    <ul className="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="false" onClick={() => setActiveTab(1)}>
                                <span className="d-block d-sm-none"><i className="fas fa-home"> </i></span>
                                <span className="d-none d-sm-block">Roles</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false" onClick={() => setActiveTab(2)}>
                                <span className="d-block d-sm-none"><i className="far fa-user"> </i></span>
                                <span className="d-none d-sm-block">Permisos</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content p-3 text-muted">
                        <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} id="tab1" role="tabpanel">
                            <Row>
                                <Col md={5}>
                                    <Card>
                                        <CardBody>
                                            <Row className="mb-3">
                                                {/*<Col sm={9}>
                                                        <FieldText id={"name"} name={"name"} required/>
                                                    </Col>*/}
                                                <Col sm={12}>
                                                    <button size="small" type="submit" className="btn btn-sm text-primary" onClick={() => onAddRole()}>
                                                        <i className="uil uil-plus font-size-18"> </i> Agregar
                                                    </button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onSaveRole(e, v)}>
                                                        <table className="table table-bordered table-condensed">
                                                            <thead>
                                                            <tr>
                                                                <th style={{width: '80%'}}>Rol</th>
                                                                <th style={{width: '20%'}}>Acciones</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {map(roles, (rol, key) => (
                                                                <tr key={key} className={rol.id === roleSelected.id ? 'bg-light' : ''}>
                                                                    <td>
                                                                        {rolEdited !== rol.id && (
                                                                            <>
                                                                                {rol.name}
                                                                            </>
                                                                        )}
                                                                        {rolEdited === rol.id && (
                                                                            <>
                                                                                <FieldText id={"name"} name={"name"} value={rol.name} required/>
                                                                            </>
                                                                        )}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <ul className="list-inline font-size-20 contact-links mb-0">
                                                                            <li className="list-inline-item">
                                                                                <div className="btn-group">
                                                                                    <div className="btn-group">

                                                                                        {(rolEdited !== rol.id && rol.id) && (
                                                                                            <div>
                                                                                                <button type="button" size="small" className="btn btn-sm text-primary" disabled={rolEdited}
                                                                                                        onClick={() => setRolEdited(rol.id)}>
                                                                                                    <i className="uil uil-pen font-size-18"> </i>
                                                                                                </button>
                                                                                                <button type="button" size="small" className="btn btn-sm text-danger" disabled={rolEdited}
                                                                                                        onClick={() => setRolEdited(rol.id)}>
                                                                                                    <i className="uil uil-trash-alt font-size-18"> </i>
                                                                                                </button>
                                                                                                <button type="button" size="small" className="btn btn-sm text-primary" disabled={rolEdited}
                                                                                                        onClick={() => setRoleSelected(rol)}>
                                                                                                    <i className="uil uil-eye font-size-18"> </i>
                                                                                                </button>
                                                                                                <button type="button" size="small" className="btn btn-sm text-danger" disabled={rolEdited}
                                                                                                        onClick={() => onDeleteRole(rol)}>
                                                                                                    <i className="uil uil-trash-alt font-size-18"> </i>
                                                                                                </button>
                                                                                            </div>
                                                                                        )}
                                                                                        {(rolEdited === rol.id || !rol.id) && (
                                                                                            <div>
                                                                                                <button type="submit" size="small" className="btn btn-sm text-success">
                                                                                                    <i className="uil uil-check font-size-18"> </i>
                                                                                                </button>
                                                                                                {rol.id && (
                                                                                                    <button type="button" size="small" className="btn btn-sm text-primary" onClick={() => setRolEdited(null)}>
                                                                                                        <i className="uil uil-multiply font-size-18"> </i>
                                                                                                    </button>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </AvForm>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={7}>
                                    <Card>
                                        <CardBody>
                                            <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onAddPermission(e, v)}>
                                                <Row className="mb-3">
                                                    <Col sm={9}>
                                                        <Label className="control-label">Nombre del permiso</Label>
                                                        <FieldSelect
                                                            id={"permission"}
                                                            name={"permission"}
                                                            options={permissions}
                                                            isSearchable
                                                            required
                                                            disabled={!(roleSelected && roleSelected.id)}
                                                        />
                                                    </Col>
                                                    <Col sm={3}>
                                                        {!!(roleSelected && roleSelected.id) && (
                                                            <button size="small" type="submit" className="btn btn-sm text-primary">
                                                                <i className="uil uil-plus font-size-18"> </i> Agregar
                                                            </button>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </AvForm>
                                            <Row>
                                                <Col>
                                                    <table className="table table-bordered table-condensed">
                                                        <thead>
                                                        <tr>
                                                            <th>Nombre</th>
                                                            <th style={{width: '20%'}}>Acciones</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {map(roleSelected.permissions, (p, key) => (
                                                            <tr key={key}>
                                                                <td>{p.name}</td>
                                                                <td className="text-center">
                                                                    <button type="button" size="small"
                                                                            className="btn btn-sm text-danger"
                                                                            onClick={() => onRemovePermission(p)}>
                                                                        <i className="uil uil-trash-alt font-size-18"> </i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} id="tab2" role="tabpanel">
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onCreatePermission(e, v)}>
                                                        <table className="table table-bordered table-condensed">
                                                            <thead>
                                                            <tr>
                                                                <th style={{width: '80%'}}>Permiso</th>
                                                                <th style={{width: '80%'}}>Descripcion</th>
                                                                <th style={{width: '20%'}}>Acciones</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td><FieldText id={"permission"} name={"permission"} required/></td>
                                                                <td><FieldText id={"description"} name={"description"} required/></td>
                                                                <td className="text-center">
                                                                    <ul className="list-inline font-size-20 contact-links mb-0">
                                                                        <li className="list-inline-item">
                                                                            <div className="btn-group">
                                                                                <button type="submit" size="small" className="btn btn-sm text-info">
                                                                                    <i className="uil uil-plus font-size-18"> </i>
                                                                                </button>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            {map(permissions, (permission, key) => (
                                                                <tr key={key} className={permission.id === roleSelected.id ? 'bg-light' : ''}>
                                                                    <td>{permission.permission}</td>
                                                                    <td>{permission.description}</td>
                                                                    <td className="text-center">
                                                                        <ul className="list-inline font-size-20 contact-links mb-0">
                                                                            <li className="list-inline-item">
                                                                                <div className="btn-group">
                                                                                    <button type="button" size="small"
                                                                                            className="btn btn-sm text-danger"
                                                                                            onClick={() => onDeletePermission(permission)}>
                                                                                        <i className="uil uil-trash-alt font-size-18"> </i>
                                                                                    </button>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </AvForm>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </Col>

        </Row>
    )
}

SecurityManagement.propTypes = {
    fieldOptions: PropTypes.array,
    onGetFieldOptions: PropTypes.func,
    onCreateFieldOption: PropTypes.func,
    onUpdateFieldOption: PropTypes.func,
    onDeleteFieldOption: PropTypes.func,
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SecurityManagement)
