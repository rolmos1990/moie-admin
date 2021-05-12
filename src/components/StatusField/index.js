import React from "react";

export const STATUS_COLORS = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
};

export const StatusField = (props) => {
    switch(props.color){
        case STATUS_COLORS.DANGER:
            return <span className="badge rounded-pill bg-soft-danger  p-2">{props.children}</span>
        case STATUS_COLORS.SUCCESS:
            return <span className="badge rounded-pill bg-soft-success  p-2">{props.children}</span>
        case STATUS_COLORS.WARNING:
            return <span className="badge rounded-pill bg-soft-warning  p-2">{props.children}</span>
        case STATUS_COLORS.INFO:
            return <span className="badge rounded-pill bg-soft-info  p-2">{props.children}</span>
        default:
            return <span className="badge rounded-pill bg-light  p-2">{props.children}</span>
    }
}
