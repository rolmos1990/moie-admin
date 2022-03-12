import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Label, Row} from "reactstrap"
import {map} from "lodash";
import {AvForm} from "availity-reactstrap-validation";
import {deleteDataApi, fetchDataApi, registerDataApi, updateDataApi} from "../../helpers/backend_helper";
import * as url from "../../helpers/url_helper";
import {FieldSelect, FieldText} from "../../components/Fields";

const SecurityManagement = (props) => {

    const [permissions, setPermissions] = useState([]);//list
    const [permissionsMap, setPermissionsMap] = useState({});
    const [permissionsOptions, setPermissionsOptions] = useState([]);
    const [roles, setRoles] = useState([]);//group
    const [roleSelected, setRoleSelected] = useState({});

    useEffect(() => {
        getPermissions();
        getRoles();
    }, [setPermissions]);

    useEffect(() => {
        if (roleSelected && roleSelected.id) {
            const currentPermissions = roleSelected.permissions.map(p => p.id);
            setPermissionsOptions(permissions.filter(p => !currentPermissions.includes(p.id)).map(p => ({label: p.name, value: p.id})));
        }
    }, [roleSelected]);

    const getRoles = () => {
        fetchDataApi(url.SECURITY_ROLES).then(resp => {
            setRoles(resp);
        })
    };

    const getPermissions = () => {
        fetchDataApi(url.SECURITY_PERMISSIONS).then(resp => {
            setPermissions(resp);

            const map = {};
            resp.forEach(r => map[r.id] = r)
            setPermissionsMap(map)
        })
    };

    const onAddPermission = (ev, data) => {
        roleSelected.permissions.push({name: data.value});
        updateDataApi(url.SECURITY_ROLES, roleSelected).then(resp => {
            console.log(resp)
            getRoles();
        })
    };

    const onDeletePermission = (index) => {
        roleSelected.permissions.splice(index, 1);
        updateDataApi(url.SECURITY_ROLES, roleSelected).then(resp => {
            console.log(resp)
            getRoles();
        })
    };

    const onAddRole = (ev, data) => {
        registerDataApi(url.SECURITY_ROLES, {name: data.name}).then(resp => {
            console.log(resp)
            getRoles();
        })
    };

    const onDeleteRole = (role) => {
        deleteDataApi(url.SECURITY_ROLES, role.id, {}).then(resp => {
            console.log(resp)
            getRoles();
        })
    };

    return (
        <Row>
            <Col md={5}>
                <Card>
                    <CardBody>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onAddRole(e, v)}>
                            <Row>
                                <Col sm={9}>
                                    <FieldText id={"name"} name={"name"} required/>
                                </Col>
                                <Col sm={3}>
                                    <button size="small" type="submit" className="btn btn-sm text-primary">
                                        <i className="uil uil-plus font-size-18"> </i> Agregar
                                    </button>
                                </Col>
                            </Row>
                        </AvForm>
                        <Row>
                            <Col>
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
                                            <td>{rol.name}</td>
                                            <td className="text-center">
                                                <ul className="list-inline font-size-20 contact-links mb-0">
                                                    <li className="list-inline-item">
                                                        <div className="btn-group">
                                                            <button type="button" size="small" className="btn btn-sm text-primary" onClick={() => setRoleSelected(rol)}>
                                                                <i className="uil uil-eye font-size-18"> </i>
                                                            </button>
                                                            <button type="button" size="small"
                                                                    className="btn btn-sm text-danger"
                                                                    onClick={() => onDeleteRole(rol)}>
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
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md={7}>
                <Card>
                    <CardBody>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onAddPermission(e, v)}>
                            <Row>
                                <Col sm={9}>
                                    <Label className="control-label">Nombre del permiso</Label>
                                    <FieldSelect
                                        id={"permission"}
                                        name={"permission"}
                                        options={permissions}
                                        isSearchable
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
                                                        onClick={() => onDeletePermission(key)}>
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
