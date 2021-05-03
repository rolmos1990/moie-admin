import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"

import {parseJson} from "../../common/utils";
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {deleteFieldOption, getFieldOptionByGroup, getProductFieldOption, registerFieldOption, updateFieldOption} from "../../store/fieldOptions/actions";
import {GROUPS, NAMES} from "../../common/constants";
import {map} from "lodash";
import {FieldNumber, FieldSelect, FieldText} from "../../components/Fields";
import {AvForm} from "availity-reactstrap-validation";

const groups = Object.keys(GROUPS).map(k => ({label: GROUPS[k], value: GROUPS[k]}));
const names = Object.keys(NAMES).map(k => ({label: NAMES[k], value: NAMES[k]}));
names.unshift({label: '-', value: undefined});
groups.unshift({label: '-', value: undefined});

const ConfigsList = props => {
    const {
        fieldOptions, meta, loading, refresh,
        onGetFieldOptions, onCreateFieldOption, onUpdateFieldOption, onDeleteFieldOption
    } = props;

    const [fieldOptionsList, setFieldOptionsList] = useState([]);
    const [fieldOption, setFieldOption] = useState({options: []});
    const [fieldOptionEdited, setFieldOptionEdited] = useState(null);
    const [defaultFieldOption, setDefaultFieldOption] = useState({group: undefined, name: undefined});

    useEffect(() => {
        onGetFieldOptions();
    }, [onGetFieldOptions, refresh])

    useEffect(() => {
        if (fieldOptions && fieldOptions.length > 0) {
            const options = {};
            fieldOptions.forEach(op => {
                const key = op.group;
                if (!options[key]) {
                    options[key] = {group: op.group, options: []};
                }
                options[key].options.push({id: op.id, name: op.name, op: op.value});
            });

            const list = [];
            Object.keys(options).forEach(op => list.push(options[op]))

            setFieldOptionsList(list);
            if (fieldOption.group) {
                onSelect(list.find(l => (l.group === fieldOption.group)));
            }
        } else {
            setFieldOptionsList([])
        }

    }, [fieldOptions])

    const isReferenceGroup = (group) => {
        return GROUPS.REFERENCE_KEY === group;
    }
    const handleTableChange = (type, {page, searchText}) => {
        onGetFieldOptions(DEFAULT_PAGE_LIMIT, page - 1);
    }
    const onFilterAction = (condition) => {
        onGetFieldOptions(DEFAULT_PAGE_LIMIT, 0);
    }

    const onAddFieldOptions = (ev, data) => {
        if(!data.group || !data.group.value) return;

        const items = fieldOptionsList ? fieldOptionsList : [];

        //If item doesnt exist It will be added
        if(items.some(i => i.group === data.group.value)) return;

        const item = {group: data.group.value, options: [{id: null, name: null,  op: ''}]};
        items.push(item);
        setFieldOptionsList(items);
        onSelect(item);

        //Empty fields
        setDefaultFieldOption({group: undefined});
    };

    const onAddFieldOption = () => {
        setFieldOptionEdited(null);
        setFieldOption({...fieldOption, options: [...fieldOption.options,{id: null,  name: null, op: ''}]});
    };

    const onSelect = (op) => {
        setFieldOptionEdited(null);
        setFieldOption(op);
    };

    const onDeleteOption = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar este registro?',
            description: 'Usted está eliminado este registro, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onDeleteFieldOption(id)
        });
    };

    const handleValidSubmit = (ev, data) => {
        console.log(data, fieldOption);
        const payload = {
            group: fieldOption.group,
            name: data.name ? data.name : data.value,
            value: data.value
        }

        if (fieldOptionEdited) {
            onUpdateFieldOption(fieldOptionEdited, payload);
        } else {
            onCreateFieldOption(payload);
        }
    };

    return (
        <Row>
            <Col md={5}>
                <Card>
                    <CardBody>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => onAddFieldOptions(e, v)}>
                            <Row>
                                <Col>
                                    <table className="table table-bordered table-condensed">
                                        <thead>
                                        <tr>
                                            <th style={{width: '80%'}}>Grupo</th>
                                            <th style={{width: '20%'}}>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr >
                                            <td>
                                                <FieldSelect
                                                    id={"group"}
                                                    name={"group"}
                                                    options={groups}
                                                    defaultValue={defaultFieldOption.group}
                                                    onChange={(val)=>setDefaultFieldOption({...defaultFieldOption,group: val.value})}
                                                    required
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button type="submit" size="small" className="btn btn-sm text-primary">
                                                    <i className="uil uil-plus font-size-18"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                        {map(fieldOptionsList, (item, key) => (
                                            <tr key={key} className={item.group ===fieldOption.group? 'bg-light':''}>
                                                <td>{item.group}</td>
                                                <td className="text-center">
                                                    <ul className="list-inline font-size-20 contact-links mb-0">
                                                        <li className="list-inline-item">
                                                            <button type="button" size="small" className="btn btn-sm text-primary" onClick={() => onSelect(item)}>
                                                                <i className="uil uil-eye font-size-18"> </i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </Col>
            <Col md={7}>
                <Card>
                    <CardBody>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                            <Row>
                                <Col className="text-right p-2">
                                    {fieldOption.group && (
                                        <button size="small" type="button" className="btn btn-sm text-primary" onClick={() => onAddFieldOption()}>
                                            <i className="uil uil-plus font-size-18"> </i> Agregar
                                        </button>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <table className="table table-bordered table-condensed">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            {fieldOption.group === GROUPS.REFERENCE_KEY && (
                                                <>
                                                    <th>Inicia en</th>
                                                </>
                                            )}
                                            <th style={{width: '20%'}}>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {map(fieldOption.options, (option, key) => (
                                            <tr key={key}>
                                                {fieldOption.group === GROUPS.REFERENCE_KEY && (
                                                    <>
                                                        {fieldOptionEdited !== option.id && (
                                                            <>
                                                                <td>{option.name}</td>
                                                                <td>{option.op}</td>
                                                            </>
                                                        )}
                                                        {fieldOptionEdited === option.id && (
                                                            <>
                                                                <td>
                                                                    <FieldText
                                                                        id={"name"}
                                                                        name={"name"}
                                                                        value={option.name}
                                                                        required/>
                                                                </td>
                                                                <td>
                                                                    <FieldNumber
                                                                        id={"value"}
                                                                        name={"value"}
                                                                        value={option.op}
                                                                        required/>
                                                                </td>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                                {fieldOption.group !== GROUPS.REFERENCE_KEY && (
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
                                                <td className="text-center">
                                                    <div className="btn-group">

                                                        {(!fieldOptionEdited && option.id) && (
                                                            <div>
                                                                <button type="button"size="small" className="btn btn-sm text-primary" onClick={() => setFieldOptionEdited(option.id)}>
                                                                    <i className="uil uil-pen font-size-18"> </i>
                                                                </button>
                                                                <button type="button" size="small" className="btn btn-sm text-danger" onClick={() => onDeleteOption(option.id)}>
                                                                    <i className="uil uil-trash-alt font-size-18"> </i>
                                                                </button>
                                                            </div>
                                                        )}
                                                        {(fieldOptionEdited || !option.id) && (
                                                            <div>
                                                                <button type="submit" size="small" className="btn btn-sm text-success">
                                                                    <i className="uil uil-check font-size-18"> </i>
                                                                </button>
                                                                {option.id && (
                                                                    <button type="button" size="small" className="btn btn-sm text-primary" onClick={() => setFieldOptionEdited(null)}>
                                                                        <i className="uil uil-redo font-size-18"> </i>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>

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
    onGetFieldOptions: (group = null, limit = 500, page) => dispatch(getFieldOptionByGroup([], limit, page)),
    onCreateFieldOption: (data, history) => dispatch(registerFieldOption(data, history)),
    onUpdateFieldOption: (id, data, history) => dispatch(updateFieldOption(id, data, history)),
    onDeleteFieldOption: (id, history) => dispatch(deleteFieldOption(id, history))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigsList)
