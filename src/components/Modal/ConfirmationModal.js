import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Modal} from "reactstrap";
import ReactDOM from 'react-dom';

export const ConfirmationModal = (props) => {
    const [openmodal, setOpenmodal] = useState(true);

    useEffect(() => {
        if(!openmodal) {
            ReactDOM.render("", document.getElementById('modal'));
        }
    }, [openmodal]);

    const confirmAction = () => {
        props.onConfirm();
        setOpenmodal(false);
    }
    return (
    <Modal
    isOpen={openmodal}
    scrollable={props.scrollable}
    id={props.id || "staticModalUnique"}
>
    <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
        <button type="button" className="btn-close"
                onClick={() => setOpenmodal(false)} aria-label="Close"></button>
    </div>
    <div className="modal-body">
        <p>{props.description}</p>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-light" onClick={() => setOpenmodal(false)}>Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => confirmAction()}>Confirmar</button>
    </div>
</Modal>
)};

export const ConfirmationModalAction = (props) => {
    return ReactDOM.render(<ConfirmationModal {...props} />, document.getElementById('modal') )
}

ConfirmationModal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    isOpen: PropTypes.bool,
    scrollable: PropTypes.bool,
    id: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func
}
