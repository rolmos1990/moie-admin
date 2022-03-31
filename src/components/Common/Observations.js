import React, {useEffect, useState} from "react"
import {AvForm} from "availity-reactstrap-validation"
import {Col, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomizedTimeline from "../../pages/CustomerEdit/TimeLine";
import ButtonSubmit from "./ButtonSubmit";
import {ConfirmationModalAction} from "../Modal/ConfirmationModal";
import {threeDots} from "../../common/utils";
import {deleteComment, getCommentsByEntity, registerComment} from "../../store/comment/actions";
import {findFieldOptionByGroup} from "../../helpers/service";
import HasRole from "../HasRole";
import {PERMISSIONS} from "../../helpers/security_rol";

const Observations = (props) => {

    const {user, observations, onGetObservations, onCreateObservation, onDeleteObservation, onGetCommentSuggested, entitySuggested, entity, entityId} = props;
    const [observation, setObservation] = useState(undefined);
    const [observationsSuggested, setObservationsSuggested] = useState([]);
    const [observationList, setObservationList] = useState([]);

    useEffect(() => {
        onGetObservations(entity, entityId);
        if(entitySuggested) onGetCommentSuggested(entitySuggested).then(data => setObservationsSuggested(data.map(item => item.value)));
    }, [entityId]);

    useEffect(() => {
        if (observations[entity] && observations[entity].length > 0) {
            if(observations[entity].some(o => o.entity === entity)) setObservationList(observations[entity].filter(o => o.entity === entity));
        }else{
            setObservationList([]);
        }
    }, [observations[entity]]);

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar este registro?',
            description: 'Usted está eliminado este registro, una vez eliminado no podrá ser recuperado.',
            id: '_observationsModal',
            onConfirm: () => {
                const item = observationList.find(cl => cl.id === id);
                if(onDeleteObservation) onDeleteObservation(item);
            }
        });
    }

    const onAdd = (comment) => {
        if(onCreateObservation) onCreateObservation(entityId, {entity: entity, comment: comment});
    }

    const handleValidSubmit = (event) => {
        if (!observation || observation === '') return;
        setObservation(undefined);
        event.target.reset();
        onAdd(observation);
    }

    return (
        <React.Fragment>
            <Card id={''} className="p-3">
                {(observationsSuggested && observationsSuggested.length > 0) && (
                    <Row>
                        <Col md={12}>
                            <h4 className="card-title text-info">Observaciones sugeridas</h4>
                        </Col>
                        <Col md={12}>
                            {observationsSuggested.map((suggest, k) => (
                               <span key={k}>
                                   <Tooltip placement="bottom" title={suggest} aria-label="add">
                                       <button className="btn bg-light m-1" onClick={() => onAdd(suggest)}>
                                        <span className="font-sm m-0"><i className={"uil uil-star"}> </i> &nbsp;
                                            {threeDots(suggest, 30)}
                                        </span>
                                       </button>
                                   </Tooltip>
                               </span>
                            ))}
                        </Col>
                        <hr/>
                    </Row>
                )}
                <Row>
                    <Col md={12}>
                        <h4 className="card-title text-info">Agregar observación</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                            <Row>
                                <Col md={10}>
                                    <input id={"observation"} name={"observation"} className="form-control" value={observation} onChange={(e) => setObservation(e.target.value)} required/>
                                </Col>
                                <Col md={2}>
                                    <HasRole role={PERMISSIONS.COMMENT_CREATE}>
                                        <ButtonSubmit loading={props.loading} disabled={!observation}/>
                                    </HasRole>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                    <Col md={12}>
                        <hr/>
                        <h4 className="card-title text-info">Observaciones</h4>
                    </Col>
                    <HasRole role={PERMISSIONS.COMMENT_EDIT}>
                    <Col md={12} style={{maxHeight: '500px', overflowY: 'auto'}}>
                        {observationList.length > 0 ? (<CustomizedTimeline data={observationList} onDelete={onDelete}/>) : "No hay observaciones"}
                    </Col>
                    </HasRole>
                </Row>
            </Card>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {user} = state.Login
    const {comments} = state.Comment
    return {user, observations: comments}
}

const mapDispatchToProps = dispatch => ({
    onGetObservations: (entity, idRelated) => dispatch(getCommentsByEntity(entity, idRelated)),
    onCreateObservation: (entityId, comment) => dispatch(registerComment(entityId, comment)),
    onDeleteObservation: (comment) => dispatch(deleteComment(comment)),
    onGetCommentSuggested: findFieldOptionByGroup,
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Observations)
)

Observations.propTypes = {
    entitySuggested: PropTypes.string,
    entity: PropTypes.string.isRequired,
    entityId: PropTypes.number.isRequired,
}
