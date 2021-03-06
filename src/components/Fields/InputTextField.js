import {AvField} from "availity-reactstrap-validation";
import React from "react";
import PropTypes from "prop-types";
import messages from './messages';

const TextField = (props) => (
    <AvField
        id ={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange ? props.onChange : null}
        onBlur={props.onBlur ? props.onBlur : null}
        type={props.type ? props.type : "text"}
        className={`form-control ${props.className ? props.className : ''}` }
        validate={
            {
                required: { value: props.required ? true : false, errorMessage: messages.required },
                minLength: { value: props.minLength ? props.minLength: 0, errorMessage: messages.minLength.replace("{length}", props.minLength)},
                maxLength: { value: props.maxLength ? props.maxLength: 255, errorMessage: messages.maxLength.replace("{length}", props.maxLength)}
            }
        }
    />
)

TextField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
}
const NumberField = (props) => (
    <AvField
        id ={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange ? props.onChange : null}
        type={"number"}
        className="form-control"
        validate={
            {
                required: { value: props.required === true, errorMessage: messages.required },
                number: { value: true},
            }
        }
    />
)

NumberField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    placeholder: PropTypes.string,
    required: PropTypes.bool
}

const NumberDecimalField = (props) => (
    <AvField
        id ={props.id}
        name={props.name}
        value={props.value > 0 ? props.value : "0"}
        placeholder={props.placeholder}
        onChange={props.onChange ? props.onChange : null}
        type="number"
        className="form-control"
        min={props.min || "0.00"}
        step={props.step || "0.01"}
        max={props.max || "100.00"}
        presicion={2}
        validate={
            {
                required: { value: props.required === true, errorMessage: messages.required },
                number: { value: true},
            }
        }
    />
)

NumberDecimalField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    placeholder: PropTypes.string,
    required: PropTypes.bool
}

const EmailField = (props) => (
    <AvField
        id ={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        className="form-control"
        validate={
            {   required: {
                    value: props.required ? true : false,
                    errorMessage: messages.required },
                email: { value: true, errorMessage: messages.email_invalid } }
        }
    />
)

EmailField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool
}

export {
    TextField,
    NumberField,
    NumberDecimalField,
    EmailField
};
