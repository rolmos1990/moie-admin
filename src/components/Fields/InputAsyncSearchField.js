import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AsyncSelect from 'react-select/async';
import {FormGroup, FormText} from "reactstrap";
import './style.scss';
import {getData} from "../../helpers/service";
import {arrayToOptionsByFieldName, getEmptyOptions} from "../../common/converters";
import {AvBaseInput} from "availity-reactstrap-validation";
import messages from "./messages";
import Conditionals from "../../common/conditionals";

const InputAsyncSearchField = (props) => {
    const {defaultValue, conditionalOptions, defaultConditions} = props;
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    return (
        <AvAsyncSearchInput
            validate={{required: {value: props.required === true, errorMessage: messages.required}}}
            name={props.name}
            hasWild={props.hasWild || false}
            value={selected}
            placeholder={props.placeholder}
            urlStr={props.urlStr}
            onChange={(value) => {
                setSelected(value)
                if (props.onChange) {
                    props.onChange(value);
                }
            }}
            conditionalOptions={conditionalOptions}
            defaultConditions={defaultConditions}
        />
    )
}

InputAsyncSearchField.propTypes = {
    urlStr: PropTypes.string.isRequired,
};


class AvAsyncSearchInput extends AvBaseInput {
    render() {
        const {name, value, onChange, validate, hasWild, urlStr, conditionalOptions, defaultConditions, placeholder, helpMessage} = this.props;
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
                            const cond = {...conditionalOptions};
                            let textSearch = inputValue +'';
                            if(hasWild && inputValue.includes("*")){
                                cond.operator = Conditionals.OPERATORS.LIKE;
                                textSearch = textSearch.replace('*', '')
                            }
                            return getData(urlStr, textSearch, cond, defaultConditions).then(response => {
                                const fieldName = conditionalOptions && conditionalOptions.fieldName ? conditionalOptions.fieldName : 'name';
                                const options = arrayToOptionsByFieldName(response.data, fieldName);
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
