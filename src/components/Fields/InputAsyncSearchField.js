import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AsyncSelect from 'react-select/async';
import {FormGroup, FormText} from "reactstrap";
import './style.scss';
import {getData} from "../../helpers/service";
import {arrayToOptions, getEmptyOptions} from "../../common/converters";
import {AvBaseInput} from "availity-reactstrap-validation";
import messages from "./messages";

const InputAsyncSearchField = (props) => {
    const [ selected, setSelected ,defaultValue,] = useState(null);

    useEffect(() => {
        if(defaultValue && defaultValue.value > 0) {
            setSelected(defaultValue);
        }
    }, [defaultValue]);

    return (
        <AvAsyncSearchInput
            validate={{
                required: {value: props.required ? true : false, errorMessage: messages.required}
            }}
            name={props.name}
            value={selected}
            placeholder={props.placeholder}
            urlStr={props.urlStr}
            onChange={(value) => {
                setSelected(value)
                if(props.onChange){
                    props.onChange(value);
                }
            }}
        />
    )
}

InputAsyncSearchField.propTypes = {
    urlStr: PropTypes.string.isRequired,
};


class AvAsyncSearchInput extends AvBaseInput {
    render() {
        const {name, value, onChange, validate, urlStr, placeholder, helpMessage} = this.props;
        const validation = this.context.FormCtrl.getInputState(this.props.name);
        const feedback = validation.errorMessage ? (<div className="invalid-feedback" style={{display: "block"}}>{validation.errorMessage}</div>) : null;
        const help = helpMessage ? (<FormText>{helpMessage}</FormText>) : null;
        const isInvalid = validation.errorMessage ? "select-is-invalid" : "";

        return (

            <FormGroup className={isInvalid}>
                <div>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        loadOptions={inputValue => {
                            return getData(urlStr, inputValue).then(response => {
                                const options = arrayToOptions(response.data);
                                options.unshift(getEmptyOptions());
                                return options
                            })
                        }}
                    />
                </div>
                {feedback}
                {help}
            </FormGroup>
        );
    }
};


export default InputAsyncSearchField;
