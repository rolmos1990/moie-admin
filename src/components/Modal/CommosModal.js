import PropTypes from "prop-types";
import {Modal} from "reactstrap";

const CustomModal = (props) => {
    const {isOpen, scrollable, id, onAccept, onClose, title, description, children, showFooter=true} = props;
    return (
        <Modal
            isOpen={isOpen}
            scrollable={scrollable || true}
            id={id || "staticModal"}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                <button type="button" className="btn-close"
                        onClick={() => onClose()} aria-label="Close">
                </button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            {showFooter && (
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={() => onClose()}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={() => onAccept()}>Aceptar</button>
                </div>
            )}
        </Modal>
    )
};

CustomModal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    isOpen: PropTypes.bool,
    scrollable: PropTypes.bool,
    onClose: PropTypes.func,
    onAccept: PropTypes.func
}

export default CustomModal;