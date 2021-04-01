import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
import {Card, Col, Row, CardBody, Media, Label, Spinner} from "reactstrap"
import {Link} from "react-router-dom"
import {FieldSelect, FieldText} from "../../components/Fields";
import {STATUS} from "../../common/constants";
import {map} from "lodash";
import CardProduct from "../Product/ProductList/cardProduct";
import {arrayToOptions} from "../../common/converters";
import {Button} from "@material-ui/core";

const SizeTemplateProduct = props => {
    const {template, sizeModelList, setSizeModelList} = props
    const [sizeModel, setSizeModel] = useState({});
    const [selectValues, setSelectValues] = useState([]);

    useEffect(() => {

        if (template && template.sizes) {
            const model = {color: ''};
            template.sizes.forEach(size => sizeModel[size] = '');
            setSizeModel(model);
            setSizeModelList([model]);
        }

        if (selectValues.length === 0) {
            const selectVal = [];
            for (let i = 0; i <= 1000; i++) {
                selectVal.push({label: i, value: i});
            }
            setSelectValues(selectVal);
        }

    }, [template])

    const addColor = () => {
        setSizeModelList([...sizeModelList, sizeModel]);
    }
    const removeColor = (index) => {
        let list = [...sizeModelList];
        list.splice(index);
        console.log("remove", sizeModelList, list);
        setSizeModelList(list);
    }
    console.log(template, sizeModel);

    return (
        <React.Fragment>
            <Row>
                <Col md="12">
                    <div className={"table-responsivee"}>
                        <table className="table table-card-list table-condensed">
                            <thead>
                            <tr>
                                <th>Color</th>
                                {map(template.sizes, (s, key) => (
                                    <th key={'th_' + key} className="text-center">{s}</th>
                                ))}
                                <th>Borrar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {map(sizeModelList, (model, k1) => (
                                <tr key={'tr_' + k1}>
                                    <td>
                                        <FieldText
                                            id={"field_color" + k1}
                                            name={"color"}
                                            value={model.color}
                                            placeholder={'Ingrese el color'}
                                            minLength={3}
                                            maxLength={20}
                                            required/>
                                    </td>
                                    {map(template.sizes, (s, k2) => (
                                        <td key={'td_' + k1 + '_' + k2} style={{minWidth: '30px'}} className="text-center">
                                            <select
                                                id={"select" + k1 + '_' + k2}
                                                name={s}
                                                value={model[s]}
                                                className="form-control"
                                            >
                                                {map(selectValues, (s, k3) => (
                                                    <option key={'op_' + k1 + '_' + k2 + '_' + k3} value={s.value}>{s.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                    ))}
                                    <th>
                                        <button size="small" className="btn btn-sm text-danger" onClick={() => removeColor(k1)}>
                                            <i className="uil uil-trash-alt font-size-18"> </i>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <div className="text-center m-3">
                        <Button color="primary" type="button" onClick={() => addColor()}>
                            Agregar color
                        </Button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

SizeTemplateProduct.propTypes = {
    template: PropTypes.object
}

export default SizeTemplateProduct
