import React, {useEffect, useState} from "react"
import {AvForm} from "availity-reactstrap-validation"
import {Col, Row} from "reactstrap"
import {Button, Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomizedTimeline from "../../pages/CustomerEdit/TimeLine";
import ButtonSubmit from "./ButtonSubmit";
import {ConfirmationModalAction} from "../Modal/ConfirmationModal";
import {printPartOfPage, threeDots} from "../../common/utils";
import {deleteComment, getCommentsByEntity, registerComment} from "../../store/comment/actions";
import {findFieldOptionByGroup} from "../../helpers/service";
import order from "../../store/order/reducer";
import {doPrintBatchRequest, nextStatusOrder, printBatchRequest} from "../../store/order/actions";
import CustomModal from "../Modal/CommosModal";

const PrintBatchRequest = (props) => {

    const {data, error, meta, conditionals, doRequest, loading} = props;
    const [orderPrint, setOrderPrint] = useState('');
    const [openPrintConfirmModal, setOpenPrintConfirmModal] = useState(false);

    useEffect(() => {
        if (conditionals && doRequest) {
            props.onPrintBatchRequest(conditionals);
        }
    }, [conditionals, doRequest]);

    useEffect(() => {
        if (data && data.body) {
            let html = null;
            data.body.forEach((body) => {
                if(html){
                    html += '<br/>';
                }else{
                    html = '';
                }
                html += body.html;
            })
            printOrder(html)
        }
    }, [data]);

    const printOrder = (text) => {
        printPartOfPage(text || orderPrint);
        setTimeout(() => setOpenPrintConfirmModal(true), 3000);
    }

    const onConfirmPrintOrder = () => {
        setOpenPrintConfirmModal(false);
        console.log('onConfirmPrintOrder');
       // props.onNextStatusOrder(order.id);
    }

    return (
        <React.Fragment>
            <CustomModal title={"Confirmar impresión de la(s) orden(s)"} showFooter={false} isOpen={openPrintConfirmModal} onClose={() => setOpenPrintConfirmModal(false)}>
                <Row>
                    <Col md={12}>
                        ¿Logró imprimir lo(s) pedidos(s)?
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12} className="text-right">
                        <button type="button" className="btn btn-light" onClick={() => setOpenPrintConfirmModal(false)}>NO</button>
                        <Button color="primary" type="button" onClick={onConfirmPrintOrder}>SI</Button>
                    </Col>
                </Row>
            </CustomModal>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {batchRequest} = state.Order
    const {data, error, meta, conditionals, doRequest, loading} = batchRequest
    return {data, error, meta, conditionals, doRequest, loading}
}

const mapDispatchToProps = dispatch => ({
    onPrintBatchRequest: (conditional ) => dispatch(printBatchRequest(conditional)),
    onNextStatusOrder: (id = []) => dispatch(nextStatusOrder({order: id})),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PrintBatchRequest)
)

PrintBatchRequest.propTypes = {
    conditionals: PropTypes.string.isRequired,
}
