import React, {useEffect, useState} from "react"
import {CardBody, Col, Container, Label, Row} from "reactstrap"
import {AvForm} from "availity-reactstrap-validation"
import {Button, Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {apiError} from "../../store/auth/login/actions";
import PropTypes from "prop-types";
import {addAttachmentWallet, getWallet, registersWallet, updateWallet} from "../../store/wallet/actions";
import {FieldDate, FieldDecimalNumber, FieldSelect, FieldText} from "../../components/Fields";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {STATUS} from "../../common/constants";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import {PERMISSIONS} from "../../helpers/security_rol";
import NoAccess from "../../components/Common/NoAccess";
import HasPermissions from "../../components/HasPermissions";
import {DATE_MODES} from "../../components/Fields/InputDate";
import {DATE_FORMAT, formatDate, priceFormat} from "../../common/utils";
import HasPermissionsFunc from "../../components/HasPermissionsFunc";
import DropZoneIcon from "../../components/Common/DropZoneIcon";
import Images from "../../components/Common/Image";
import moment from "moment";

const WalletEdit = (props) => {
    const {getWallet, wallet, refresh, loading} = props;
    const [walletData, setWalletData] = useState({_status: STATUS.ACTIVE});
    const [walletAttachment, setWalletAttachment] = useState({});
    const isEdit = props.match.params.id;

    //carga inicial
    useEffect(() => {
        if (isEdit && getWallet) {
            getWallet(props.match.params.id);
        }
        setWalletAttachment(false);
    }, [getWallet, refresh]);

    //cargar la información del cliente
    useEffect(() => {
        if (wallet.id && isEdit) {
            setWalletData({...wallet, _status:wallet.status});
        }
    }, [wallet]);

    const handleValidSubmit = (event, values) => {
        if(canEdit) {
            const data = Object.assign({}, values, {status: values._status});
            delete data._status;

            if(data.type){
                data.amount = (data.type && data.type.value == 1) ? priceFormat(Math.abs(data.amount)) : priceFormat(Math.abs(data.amount) * -1);
            }

            if (!isEdit) {
                props.registersWallet(data, props.history)
            } else {
                props.updateWallet(props.match.params.id, data, props.history)
            }
        }
    }

    const handleAcceptedFiles = (files) => {
        if(canEdit) {
            const payload = {
                description: 'test',
                file: files.base64,
                filename: files.f.name
            };
            setWalletAttachment(payload);
        }
    }

    const handleConfirmFiles = (event, values) => {
        if(!loading && canEdit) {
            walletAttachment.description = values.description;
            props.addAttachmentWallet(wallet.id, walletAttachment);
        }
    }

    const handleCancelFiles = () => {
        if(canEdit) {
            setWalletAttachment(false);
        }
    }

    const addDays = moment(walletData.date, "YYYY-MM-DD").add(4, 'days');
    const isNotExpired = moment().isSameOrBefore(addDays);

    const canEdit = ((HasPermissionsFunc([PERMISSIONS.WALLET_EDIT])) && isEdit && isNotExpired || !isEdit);

    //only show mode
    const renderShowMode = <HasPermissions permissions={[PERMISSIONS.WALLET_CREATE, PERMISSIONS.WALLET_EDIT]} renderNoAccess={() => <NoAccess/>}>
        <AvForm className="needs-validation" autoComplete="off"
                onValidSubmit={(e, v) => {}}>
            <Row>
                <Col xl="8">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Label htmlFor="field_type">Tipo <span className="text-danger">*</span></Label>
                                        <FieldSelect
                                            id={"field_type"}
                                            name={"type"}
                                            options={[
                                                {value: 1, label: 'INGRESO'},
                                                {value: 2, label: 'EGRESO'}
                                            ]}
                                            defaultValue={1}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Label htmlFor="field_date">Fecha <span className="text-danger">*</span></Label>
                                        <FieldText
                                            disabled
                                            id={"field_date"}
                                            name={"date"}
                                            value={formatDate(walletData.date, DATE_FORMAT.ONLY_DATE)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Label htmlFor="field_amount">Monto <span className="text-danger">*</span></Label>
                                        <FieldText
                                            disabled
                                            id={"field_amount"}
                                            name={"amount"}
                                            value={walletData.amount ? walletData.amount.toFixed(2) : "0.00"}
                                        />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Label htmlFor="field_name">Descripción <span className="text-danger">*</span></Label>
                                        <FieldText
                                            disabled
                                            id={"field_description"}
                                            name={"description"}
                                            value={walletData.description}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <div className="mb-3">
                                        <Label htmlFor="field_comment">Comentario <span className="text-danger">*</span></Label>
                                        <FieldText
                                            disabled
                                            id={"field_comment"}
                                            name={"comment"}
                                            type={"textarea"}
                                            value={walletData.comment}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AvForm>
    </HasPermissions>;

    const renderAttachments = wallet.attachments && wallet.attachments.length > 0 && wallet.attachments.map(item => (
                    <Col md={4} className="image-left-panel" style={{minHeight: '225px'}}>
                        <div className={`nav flex-column nav-pills`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a href={item.fileUrl} target={"_blank"}>
                            <div className={`cursor-pointer nav-link`}>
                                <Images src={item.fileUrl}
                                alt={item.fileUrl}
                                className="img-fluid mx-auto d-block tab-img rounded"/>
                                <div className="text-center"><p>{item.description}</p>
                                </div>
                            </div>
                            </a>
                        </div>
                    </Col>
                    ))

    const addAttachment = <DropZoneIcon
        maxFiles={1}
        mode="icon"
        onDrop={(files) => {
            handleAcceptedFiles(files);
        }}
    />

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb hasBack path="/wallets" title={walletData.name} item={"Billeteras"}/>
                    {!canEdit ? (
                        <div>
                            <div>{ renderShowMode }</div>
                                <div>
                                    <hr />
                                    <Row>
                                        <Col xl="8">
                                            <Card>
                                                <hr />
                                                <div style={{"padding": "20px"}}>
                                                    <Row>
                                                        {renderAttachments}
                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                        </div>
                    ) : (
                        <HasPermissions permissions={[PERMISSIONS.WALLET_CREATE, PERMISSIONS.WALLET_EDIT]} renderNoAccess={() => <NoAccess/>}>
                            <AvForm className="needs-validation" autoComplete="off"
                                    onValidSubmit={(e, v) => {
                                        handleValidSubmit(e, v)
                                    }}>
                                <Row>
                                    <Col xl="8">
                                        <Card>
                                            <CardBody>
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="field_type">Tipo <span className="text-danger">*</span></Label>
                                                            <FieldSelect
                                                                id={"field_type"}
                                                                name={"type"}
                                                                options={[
                                                                    {value: 1, label: 'INGRESO'},
                                                                    {value: 2, label: 'EGRESO'}
                                                                ]}
                                                                defaultValue={1}
                                                                required
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="field_date">Fecha <span className="text-danger">*</span></Label>
                                                            <FieldDate
                                                                id={"field_date"}
                                                                name={"date"}
                                                                mode={DATE_MODES.SINGLE}
                                                                defaultValue={walletData.date}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="field_amount">Monto <span className="text-danger">*</span></Label>
                                                            <FieldDecimalNumber
                                                                id={"field_amount"}
                                                                name={"amount"}
                                                                value={walletData.amount ? walletData.amount.toFixed(2) : "0.00"}
                                                                required/>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="field_name">Descripción <span className="text-danger">*</span></Label>
                                                            <FieldText
                                                                id={"field_description"}
                                                                name={"description"}
                                                                value={walletData.description}
                                                                minLength={3}
                                                                maxLength={100}
                                                                required
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <div className="mb-3">
                                                            <Label htmlFor="field_comment">Comentario <span className="text-danger">*</span></Label>
                                                            <FieldText
                                                                id={"field_comment"}
                                                                name={"comment"}
                                                                type={"textarea"}
                                                                value={walletData.comment}
                                                                minLength={2}
                                                                maxLength={255}
                                                                required
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className="text-right">
                                                        <ButtonSubmit loading={props.loading}/>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </AvForm>
                            <hr />
                            <Row>
                                <Col xl="8">
                                    <Card>
                                        <div style={{padding: "40px"}}>
                                            <h2>Nuevo Adjunto</h2>

                                        {walletAttachment && walletAttachment.file ? (
                                                <AvForm className="needs-validation" autoComplete="off"
                                                        onValidSubmit={(e, v) => {
                                                            handleConfirmFiles(e, v)
                                                        }}>
                                            <div className="text-center">
                                                <Images src={walletAttachment.file}
                                                        alt={walletAttachment.file}
                                                        className="img-fluid mx-auto d-block tab-img rounded"/>
                                                        <div style={{"margin": "20px"}}>
                                                <FieldText
                                                    id={"field_description_image"}
                                                    name={"description"}
                                                    value={""}
                                                    minLength={2}
                                                    maxLength={30}
                                                    maxWidth="200"
                                                    placeholder={"Description de imagen"}
                                                />
                                                        </div>
                                                <>
                                                    <Tooltip placement="bottom" title="Aceptar" aria-label="add">
                                                        <ButtonSubmit loading={props.loading}/>
                                                    </Tooltip>
                                                    <Tooltip placement="bottom" title="Cancelar" aria-label="add">
                                                        <Button color="default" onClick={() => handleCancelFiles()}>
                                                            Cancelar
                                                        </Button>
                                                    </Tooltip>
                                                </>
                                            </div>
                                           </AvForm>
                                        ) : addAttachment}
                                        </div>
                                        <hr />
                                        <div style={{"padding": "20px"}}>
                                        <Row>
                                            {renderAttachments}
                                        </Row>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </HasPermissions>
                    )}
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapWalletToProps = state => {
    const {wallet, error, loading, refresh} = state.Wallet
    return {error, wallet, loading, refresh}
}

export default withRouter(
    connect(mapWalletToProps, {apiError, registersWallet, updateWallet, getWallet, addAttachmentWallet})(WalletEdit)
)

WalletEdit.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}

