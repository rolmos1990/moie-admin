import React from "react";

export const STATUS_COLORS = {
    DANGER: 'danger',
    SUCCESS: 'success'
};

export const StatusField = (props) => {
    switch(props.color){
        case 'danger':
            return <span className="badge rounded-pill bg-soft-danger font-size-12 p-2">{props.children}</span>
            break;
        case 'success':
            return <span className="badge rounded-pill bg-soft-success font-size-12 p-2">{props.children}</span>
            break;
        default:
            return '';
            break;
    }
}
