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
        type={props.type ? props.type : "text"}
        className="form-control"
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
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
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
    EmailField
};