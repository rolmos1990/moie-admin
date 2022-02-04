import React, {useState} from 'react'
import PropTypes from "prop-types";

export const ButtonCopy = ({text}) => {

    const [copying, setCopying] = useState(false);

    const copyToClipboard = () => {
        setCopying(true)
        var textField = document.createElement('textarea')
        textField.innerText = text;
        document.body.appendChild(textField)
        textField.select();
        document.execCommand("copy");
        textField.remove();
        setTimeout(() => {
            setCopying(false);
        }, 1300);
    }

    return (
        <button className="btn btn-xs btn-primary mr-2" onClick={copyToClipboard}>
            <i className="mdi mdi-content-copy"> </i> {copying && (<span className="animated fadeIn">Copiado</span>)}
        </button>
    )
}

ButtonCopy.propTypes = {
    text: PropTypes.string.isRequired,
};
