import React from "react";
import {Button, Card, CardBody, Col, Label, Row} from "reactstrap";
import {AvForm} from "availity-reactstrap-validation";
import PropTypes from "prop-types";
import {Button as ButtonMaterial} from "@material-ui/core";
import Conditionals from "../../common/conditionals";
import {FieldAsyncSelect, FieldNumber, FieldSelect, FieldText} from "../Fields";
import {isValidOption, isValidString} from "../../common/utils";

export const TableFilter = (props) => {
    const {fields} = props;
    const form = React.createRef();

    if (!props.isActive) {
        return false;
    }

    const handleValidSubmit = (event, values) => {
        if (props.onSubmit) {
            const conditions = new Conditionals.Condition;

            Object.keys(values)//FieldNames
                .filter(dataField => values[dataField] && values[dataField] !== "")
                .forEach(dataField => {

                    //Se borra el "_" del inicio porque algunos campos se renderizan mal, ejemplo el status
                    const fieldName = dataField.substr(1);

                    const field = fields.filter(field => field.filter).filter(field => field.dataField === fieldName);
                    if (field && field.length) {
                        const filter = field[0];
                        const value = values[dataField];

                        let operator;
                        if (filter.filterType === "text") {
                            operator = filter.filterCondition ? filter.filterCondition : Conditionals.OPERATORS.LIKE;
                            conditions.add(fieldName, value, operator);
                        }
                        if (filter.filterType === "select" && isValidOption(filter.filterOptions, value.value)) {//for status
                            operator = resolveOperator(filter, (value.value ? Conditionals.OPERATORS.TRUE : Conditionals.OPERATORS.FALSE));
                            conditions.add(fieldName, null, operator);
                        }
                        if (filter.filterType === "asyncSelect" && value.value) {
                            operator = resolveOperator(filter, Conditionals.OPERATORS.EQUAL);
                            conditions.add(fieldName, value.value, operator);
                        }
                        if (filter.filterType === "number" && isValidString(value)) {

                            if (fieldName.includes("numberA_")) {
                                operator = resolveOperator(filter, Conditionals.OPERATORS.GREATER_THAN_OR_EQUAL);
                                conditions.add(fieldName.replace("numberA_"), value, operator);

                            } else if (fieldName.includes("numberB_")) {
                                operator = resolveOperator(filter, Conditionals.OPERATORS.LESS_THAN);
                                conditions.add(fieldName.replace("numberB_"), value, operator);
                            }
                        }
                    }
                });

            props.onSubmit(conditions.all());
        }
    }

    const resolveOperator = (filter, defaultOperator) => {
        return  filter.filterCondition ? filter.filterCondition : defaultOperator;
    }

    const cleanFilters = () => {
        const conditions = new Conditionals.Condition;
        props.onSubmit(conditions.all());
        form && form.current && form.current.reset();
    }

    return (<div className="col-md-4">
        <Card>
            <CardBody>
                {props.onPressDisabled && (
                    <div className={"float-end"}>
                        <ButtonMaterial color="primary" size="small" onClick={props.onPressDisabled}>
                            <i className={"mdi mdi-minus"}> </i>
                        </ButtonMaterial>
                    </div>
                )}
                <div className="mb-4">
                    <h5><i className={"mdi mdi-filter-menu"}> </i> Filtros Avanzados &nbsp;</h5>
                </div>
                <AvForm className="needs-validation" autoComplete="off"
                        onValidSubmit={(e, v) => {
                            handleValidSubmit(e, v)
                        }}
                        ref={form}>

                        {fields.filter(f => f.filter).map((field, idx) => (
                            <Row key={idx}>
                                {field.filterType === 'text' && (
                                    <Col md="12" >
                                        <div className="mb-3">
                                            <Label htmlFor={"_" + field.dataField}>{field.text}</Label>
                                            <FieldText name={"_" + field.dataField}
                                                       defaultValue={field.filterDefaultOption}
                                                       placeholder={field.text}/>
                                        </div>
                                    </Col>
                                )}
                                {field.filterType === 'number' && (
                                        <Col md="12" >
                                            <div className="mb-3">
                                                <Label htmlFor={"_" + field.dataField}>{field.text}</Label>
                                                <Row>
                                                    <Col xs="6">
                                                        <FieldNumber name={"_numberA_" + field.dataField}
                                                                     defaultValue={field.filterDefaultOption}
                                                                     placeholder="Desde"
                                                        />
                                                    </Col>
                                                    <Col xs="6">
                                                        <FieldNumber name={"_numberB_" + field.dataField}
                                                                     defaultValue={field.filterDefaultOption}
                                                                     placeholder="Hasta"
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                )}
                                {field.filterType === 'select' && (
                                    <Col md="12" >
                                        <div className="mb-3">
                                            <Label htmlFor={"_" + field.dataField}>{field.text}</Label>
                                            <FieldSelect
                                                name={"_" + field.dataField}
                                                options={field.filterOptions}
                                                defaultValue={field.filterDefaultOption}
                                                placeholder={field.text}
                                            />
                                        </div>
                                    </Col>
                                )}
                                {field.filterType === 'asyncSelect' && (
                                    <Col md="12" >
                                        <div className="mb-3">
                                            <Label htmlFor={"_" + field.dataField}>{field.text}</Label>
                                            <FieldAsyncSelect
                                                name={"_" + field.dataField}
                                                urlStr={field.urlStr}
                                                placeholder={field.text}
                                                defaultValue={field.filterDefaultOption}
                                            />
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        ))}
                    <Row>
                        <Col md={"12"}>
                            <div className={"float-end"}>
                                <Button type="submit" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                    <i className={"mdi mdi-magnify"}> </i> Buscar
                                </Button>
                            </div>
                            <div className={"float-end ml-5"}>
                                <Button type="button"
                                        onClick={cleanFilters}
                                        color="default"
                                        className="btn-sm btn-rounded waves-effect waves-light">
                                    Limpiar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </AvForm>
            </CardBody>
        </Card>
    </div>)
}
TableFilter.propTypes = {
    isActive: PropTypes.bool,
    onSubmit: PropTypes.func,
    onPressDisabled: PropTypes.func,
    fields: PropTypes.array.isRequired
};
