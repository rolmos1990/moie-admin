import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {parseJson} from "../../common/utils";
import {Link} from "react-router-dom"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {normalizeColumnsList} from "../../common/converters";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {deleteFieldOption, getProductFieldOption, registerFieldOption, updateFieldOption} from "../../store/fieldOptions/actions";
import {GROUPS} from "../../common/constants";
import configsColumns from "./configsColumn";
import {map} from "lodash";
import {FieldNumber, FieldText} from "../../components/Fields";
import {AvForm} from "availity-reactstrap-validation";

const groups = [GROUPS.MATERIAL, GROUPS.PROVIDERS, GROUPS.REFERENCE];
const ConfigsList = props => {
    const {
        fieldOptions, meta, loading, refresh,
        onGetFieldOptions, onCreateFieldOption, onUpdateFieldOption, onDeleteFieldOption
    } = props;

    const [fieldOptionsList, setFieldOptionsList] = useState([]);
    const [fieldOption, setFieldOption] = useState({options: []});
    const [fieldOptionEdited, setFieldOptionEdited] = useState(null);
    const [materialsList, setMaterialsList] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [referenceList, setReferenceList] = useState([]);

    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta.totalRegisters,
        custom: true,
    }
    const {SearchBar} = Search

    useEffect(() => {
        onGetFieldOptions();
    }, [onGetFieldOptions])

    useEffect(() => {
        if (fieldOptions && fieldOptions.length > 0) {
            const options = {};
            fieldOptions.forEach(op => {
                const key = op.group + '_' + op.name;
                if (!options[key]) {
                    options[key] = {group: op.group, name: op.name, options: []};
                }
                if (op.group === GROUPS.REFERENCE) {
                    options[key].options.push({id: op.id, op: parseJson(op.value)});
                } else {
                    options[key].options.push({id: op.id, op: op.value});
                }
            });
            const list = [];
            Object.keys(options).forEach(op => {
                list.push(options[op]);
            })
            setFieldOptionsList(list);
        } else {
            setFieldOptionsList([])
        }

    }, [fieldOptions])

    const handleTableChange = (type, {page, searchText}) => {
        onGetFieldOptions(DEFAULT_PAGE_LIMIT, page - 1);
    }
    const onFilterAction = (condition) => {
        onGetFieldOptions(DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        onDeleteFieldOption(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar este registro?',
            description: 'Usted está eliminado este registro, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };

    const onSelect = (op) => {
        setFieldOptionEdited(null);
        setFieldOption(op);
        console.log('onSelect', op)
    };
    const onDeleteOption = (id) => {
        console.log('onDeleteOption', id)
    };
    const handleValidSubmit = (data, ev) => {
        console.log('handleValidSubmit', data, ev)
    };
    console.log(fieldOptionsList, fieldOptionEdited, fieldOption);

    return (
        <Row>
            <Col md={5}>
                <Card>
                    <CardBody>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th style={{width: '40%'}}>Grupo</th>
                                <th style={{width: '40%'}}>Nombre</th>
                                <th style={{width: '20%'}}>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {map(fieldOptionsList, (item, key) => (
                                <tr key={key}>
                                    <td>{item.group}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <ul className="list-inline font-size-20 contact-links mb-0">
                                            <li className="list-inline-item">
                                                <button size="small" className="btn btn-sm text-primary" onClick={() => onSelect(item)}>
                                                    <i className="uil uil-eye font-size-18"> </i>
                                                </button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Col>
            <Col md={7}>
                <Card>
                    <CardBody>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    {fieldOption.group === GROUPS.REFERENCE && (
                                        <>
                                            <th style={{width: '40%'}}>Reference</th>
                                            <th style={{width: '40%'}}>Inicia en</th>
                                        </>
                                    )}
                                    {fieldOption.group !== GROUPS.REFERENCE && (
                                        <>
                                            <th>Value</th>
                                        </>
                                    )}
                                    <th style={{width: '20%'}}>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {map(fieldOption.options, (option, key) => (
                                    <tr key={key}>
                                        {fieldOption.group === GROUPS.REFERENCE && (
                                            <>
                                                {fieldOptionEdited !== option.id && (
                                                    <>
                                                        <td>{option.op.key}</td>
                                                        <td>{option.op.startFrom}</td>
                                                    </>
                                                )}
                                                {fieldOptionEdited === option.id && (
                                                    <>
                                                        <td>
                                                            <FieldText
                                                                id={"key"}
                                                                name={"key"}
                                                                value={option.op.key}
                                                                required/>
                                                        </td>
                                                        <td>
                                                            <FieldNumber
                                                                id={"startFrom"}
                                                                name={"startFrom"}
                                                                value={option.op.startFrom}
                                                                required/>
                                                        </td>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {fieldOption.group !== GROUPS.REFERENCE && (
                                            <td>
                                                {fieldOptionEdited !== option.id && (
                                                    <>
                                                        {option.op}
                                                    </>
                                                )}
                                                {fieldOptionEdited === option.id && (
                                                    <>
                                                        <FieldText
                                                            id={"value"}
                                                            name={"value"}
                                                            value={option.op}
                                                            required/>
                                                    </>
                                                )}
                                            </td>
                                        )}
                                        <td>
                                            <div className="btn-group">

                                                {!fieldOptionEdited && (
                                                    <div>
                                                        <button size="small" className="btn btn-sm text-primary" onClick={() => setFieldOptionEdited(option.id)}>
                                                            <i className="uil uil-pen font-size-18"> </i>
                                                        </button>
                                                        <button size="small" className="btn btn-sm text-danger" onClick={() => onDeleteOption(option.id)}>
                                                            <i className="uil uil-trash-alt font-size-18"> </i>
                                                        </button>
                                                    </div>
                                                )}
                                                {fieldOptionEdited && (
                                                    <div>
                                                        <button type="submit" size="small" className="btn btn-sm text-success">
                                                            <i className="uil uil-check font-size-18"> </i>
                                                        </button>
                                                        <button size="small" className="btn btn-sm text-primary" onClick={() => setFieldOptionEdited(null)}>
                                                            <i className="uil uil-redo font-size-18"> </i>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </AvForm>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

ConfigsList.propTypes = {
    fieldOptions: PropTypes.array,
    onGetFieldOptions: PropTypes.func,
    onCreateFieldOption: PropTypes.func,
    onUpdateFieldOption: PropTypes.func,
    onDeleteFieldOption: PropTypes.func,
}

const mapStateToProps = state => {
    const {fieldOptions, loading, meta, refresh} = state.FieldOption
    return {fieldOptions, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetFieldOptions: (group = null, limit = 100, page) => dispatch(getProductFieldOption(limit, page)),
    onCreateFieldOption: (data, history) => dispatch(registerFieldOption(data, history)),
    onUpdateFieldOption: (id, data, history) => dispatch(updateFieldOption(id, data, history)),
    onDeleteFieldOption: (id, history) => dispatch(deleteFieldOption(id, history))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigsList)
