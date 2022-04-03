import React, {useEffect} from "react"
import {Col, Container, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {formatDate} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {createCreditNote, getBill} from "../../store/bill/actions";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {BILL_STATUS} from "../../common/constants";
import {PERMISSIONS} from "../../helpers/security_rol";
import NoAccess from "../../components/Common/NoAccess";
import HasPermissions from "../../components/HasPermissions";

const BillDetail = (props) => {

    const {onGetBill, refresh, bill} = props;

    useEffect(() => {
        if (props.match.params.id) {
            onGetBill(props.match.params.id);
        }
    }, [onGetBill, refresh]);

    const createCreditNote = () => {
        ConfirmationModalAction({
            title: `¿Está seguro de generar una nota de crédito para la factura # ${bill.id}?`,
            description: 'Esta acción no puede revertirse.',
            id: '_creditNoteModal',
            onConfirm: () => props.onCreateCreditNote(bill.id)
        });
    }

    const formatLog = (_log) => {
        if (_log) {
            const replaceRegex = /Paso+/g;
            _log = _log.replace(replaceRegex, "<br /><br />Paso");
            return _log;
        } else {
            return "No hay registros al momento";

        }
    }

    return (bill && bill.id) ? (
        <React.Fragment>
            <div className="page-content">
                <Container fluid className="pb-3">
                    <Breadcrumb hasBack path="/bills" title={`Factura #${bill.id}`} item={`Factura #${bill.id}`}/>

                    <HasPermissions permissions={[PERMISSIONS.BILL_LIST]} renderNoAccess={() => <NoAccess/>}>
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className={"mb-3 float-md-start"}>

                                </div>
                                <div className={"mb-3 float-md-end"}>
                                    <div className="button-items">
                                        {!!(bill.status === BILL_STATUS.SENT && !bill.creditNote) && (
                                            <Tooltip placement="bottom" title="Generar nota de crédito" aria-label="add">
                                                <button type="button" color="primary" className="btn-sm btn btn-outline-info waves-effect waves-light" onClick={() => createCreditNote()}>
                                                    <i className={`uil-bill text-danger`}> </i>
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Card id={'details'} className="mb-3 p-3">
                            <Row>
                                <Col md={12}>
                                    <h4 className="card-title text-info">Información básica</h4>
                                    <hr/>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={6}>
                                            <label>ID: </label>
                                            <span className="p-1">{bill.id}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <label>Número legal: </label>
                                            <span className="p-1">{bill.legalNumber}</span>
                                        </Col>
                                        <Col md={6}>
                                            <label>Pedido: </label>
                                            <span className="p-1">{bill.order.id}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <label>Estatus:</label>
                                            <span className="p-1">{bill.status}</span>
                                        </Col>
                                        <Col md={6}>
                                            <label>Fecha: </label>
                                            <span className="p-1">{formatDate(bill.createdAt)}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <label>Cliente:</label>
                                            <span className="p-1">{bill.order.customer.name}</span>
                                        </Col>
                                        <Col md={6}>
                                            <label>Correo: </label>
                                            <span className="p-1">{bill.order.customer.email}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        <Card id={'log'} className="mb-3 p-3">
                            <Row>
                                <Col md={12}>
                                    <h4 className="card-title text-info">Bitacora Dian</h4>
                                    <hr/>
                                    <div dangerouslySetInnerHTML={{__html: formatLog(bill.dianLog)}}/>
                                </Col>
                            </Row>
                        </Card>
                    </HasPermissions>
                </Container>
            </div>
        </React.Fragment>
    ) : <NoDataIndication/>;
}

const mapStateToProps = state => {
    const {bill, loading, refresh, creditNote} = state.Bill
    return {bill, refresh, loading, loadingCreditNote: creditNote.loading}
}

const mapDispatchToProps = dispatch => ({
    onGetBill: (id) => dispatch(getBill(id)),
    onCreateCreditNote: (id) => dispatch(createCreditNote(id)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BillDetail)
)

BillDetail.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}
