import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {AvBaseInput} from "availity-reactstrap-validation";
import messages from "./messages";
import {FormText, FormGroup} from "reactstrap";
import './style.scss';

const InputSearchField = (props) => {
    const [ selected, setSelected ] = useState(null);

    useEffect(() => {
        if(props.defaultValue !== undefined) {
            setSelected(props.defaultValue);
        }
    }, props.defaultValue)
    useEffect(() => {
        setSelected(null);
    }, props.options);

    return (
    <AvSearchInput
        validate={
            {
                required: { value: props.required ? true : false, errorMessage: messages.required }
            }
        }
        name={props.name}
        value={selected}
        placeholder={props.placeholder}
        onChange={(value) => {
            setSelected(value)
            if(props.onChange){
                props.onChange(value);
            }
        }}
        options={props.options || []}
        classNamePrefix="select2-selection"
    />
)}

InputSearchField.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
};

class AvSearchInput extends AvBaseInput {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    render() {
        const { name, value, onChange, validate, options, placeholder, helpMessage } = this.props;
        const validation = this.context.FormCtrl.getInputState(this.props.name);
        const feedback = validation.errorMessage ? (<div className="invalid-feedback" style={{display: "block"}}>{validation.errorMessage}</div>) : null;
        const help = helpMessage ? (<FormText>{helpMessage}</FormText>) : null;
        const isInvalid = validation.errorMessage ? "select-is-invalid" : "";

        return (
            <FormGroup className={isInvalid}>
                <div>
                <Select
                id={name}
                name={name}
                value={value}
                validate={validate}
                placeholder={placeholder || ""}
                onChange={onChange}
                options={options || []}
                classNamePrefix="select2-selection"
            />
                </div>
                {feedback}
                {help}
            </FormGroup>
        );
    }
};

export default InputSearchField;
