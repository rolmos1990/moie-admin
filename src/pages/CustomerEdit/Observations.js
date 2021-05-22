import React, {useEffect, useState} from "react"
import {AvForm} from "availity-reactstrap-validation"
import {Col, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCustomer} from "../../store/customer/actions";
import CustomizedTimeline from "./TimeLine";
import ButtonSubmit from "../../components/Common/ButtonSubmit";
import {ConfirmationModalAction} from "../../components/Modal/ConfirmationModal";
import {sortArray, threeDots} from "../../common/utils";

const Observations = (props) => {

    const {observations, observationsSuggested, user, onAddObservation, onDeleteObservation} = props;
    const [observation, setObservation] = useState(undefined);
    const [observationList, setObservationList] = useState([]);

    useEffect(() => {
        if (observations) {
            setObservationList(observations);
        }
    }, [observations]);

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar este registro?',
            description: 'Usted está eliminado este registro, una vez eliminado no podrá ser recuperado.',
            id: '_observationsModal',
            onConfirm: () => {
                const list = [...observationList];
                const item = list.find(cl => cl.id === id);
                list.splice(list.indexOf(item), 1);
                setObservationList(list);//TODO delete this line after adding the service

                if(onDeleteObservation) onDeleteObservation(item);
            }
        });
    }

    const onAdd = (obs) => {
        const list = [...observationList];
        let item = {id: new Date().getTime(), user: user.username, userId: user.id, comment: obs, date: new Date()};
        list.push(item);
        setObservationList(list);//TODO delete this line after adding the service

        if(onAddObservation) onAddObservation(item);
    }

    const handleValidSubmit = (event, values) => {
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
                                <Tooltip placement="bottom" title={suggest} aria-label="add">
                                    <button className="btn bg-light m-1" onClick={() => onAdd(suggest)}>
                                        <p className="font-sm m-0">{threeDots(suggest, 30)}</p>
                                    </button>
                                </Tooltip>
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
                                    <ButtonSubmit loading={props.loading} disabled={!observation}/>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                    <Col md={12}>
                        <hr/>
                        <h4 className="card-title text-info">Observaciones</h4>
                    </Col>
                    <Col md={12}>
                        {observationList.length > 0 ? (<CustomizedTimeline data={observationList.sort((a, b) => sortArray(a.id, b.id, false))} onDelete={onDelete}/>) : "No hay observaciones"}
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {user} = state.Login
    return {user}
}

export default withRouter(
    connect(mapStateToProps, {getCustomer})(Observations)
)

Observations.propTypes = {
    onAddObservation: PropTypes.func,
    onRemoveObservation: PropTypes.func,
    observationsSuggested: PropTypes.array,
    observations: PropTypes.array,
    error: PropTypes.any,
    history: PropTypes.object
}