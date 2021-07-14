import React, {useEffect, useState} from "react"
import {AvForm} from "availity-reactstrap-validation"
import {Col, Row} from "reactstrap"
import {Button, Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomizedTimeline from "../CustomerEdit/TimeLine";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {printPartOfPage, threeDots} from "../../common/utils";
import {deleteComment, getCommentsByEntity, registerComment} from "../../store/comment/actions";
import {findFieldOptionByGroup} from "../../helpers/service";
import order from "../../store/order/reducer";
import {doPrintBatchRequest, nextStatusOrder, printBatchRequest, resetBatchRequest} from "../../store/order/actions";
import CustomModal from "../../components/Modal/CommosModal";

const PrintBatchRequest = (props) => {

    const {batch, conditionals, doRequest} = props;
    const [openPrintConfirmModal, setOpenPrintConfirmModal] = useState(false);

    useEffect(() => {
        if (conditionals && doRequest) {
            props.onPrintBatchRequest(conditionals);
        }
    }, [conditionals, doRequest]);

    useEffect(() => {
        if (batch && batch.body) {
            let html = null;
            batch.body.forEach((body) => {
                if (html) {
                    html += '<br/>';
                } else {
                    html = '';
                }
                html += body.html;
            })
            printOrder(html)
        }
    }, [batch]);

    const printOrder = (text) => {
        printPartOfPage(text);
        setTimeout(() => setOpenPrintConfirmModal(true), 3000);
    }

    const onConfirmPrintOrder = () => {
        setOpenPrintConfirmModal(false);
        props.onNextStatusOrder(batch.id);
    }

    const onCancelPrintOrder = () => {
        setOpenPrintConfirmModal(false);
        props.onResetBatchRequest();
    }

    return (
        <React.Fragment>
            <CustomModal title={"Confirmar impresión de la(s) orden(s)"} showFooter={false} isOpen={openPrintConfirmModal} onClose={() => onCancelPrintOrder()}>
                <Row>
                    <Col md={12}>
                        ¿Logró imprimir lo(s) pedidos(s)?
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12} className="text-right">
                        <button type="button" className="btn btn-light" onClick={() => onCancelPrintOrder()}>NO</button>
                        <Button color="primary" type="button" onClick={onConfirmPrintOrder}>SI</Button>
                    </Col>
                </Row>
            </CustomModal>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {batchRequest} = state.Order
    const {batch, error, meta, conditionals, doRequest, loading} = batchRequest
    return {batch, error, meta, conditionals, doRequest, loading}
}

const mapDispatchToProps = dispatch => ({
    onPrintBatchRequest: (conditional) => dispatch(printBatchRequest(conditional)),
    onNextStatusOrder: (id = []) => dispatch(nextStatusOrder({batch: id})),
    onResetBatchRequest: (id = []) => dispatch(resetBatchRequest()),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PrintBatchRequest)
)

PrintBatchRequest.propTypes = {
    conditionals: PropTypes.array.isRequired,
}
