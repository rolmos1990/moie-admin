import React from "react";

export const STATUS_COLORS = {
    DANGER: 'danger',
    SUCCESS: 'success'
};

export const StatusField = (props) => {
    switch(props.color){
        case STATUS_COLORS.DANGER:
            return <span className="badge rounded-pill bg-soft-danger font-size-12 p-2">{props.children}</span>
        case STATUS_COLORS.SUCCESS:
            return <span className="badge rounded-pill bg-soft-success font-size-12 p-2">{props.children}</span>
        default:
            return '';
    }
}
