import React, {useEffect, useState} from "react"
import {AvForm} from "availity-reactstrap-validation"
import {Col, Row} from "reactstrap"
import {Card} from "@material-ui/core";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCustomer} from "../../store/customer/actions";
import CustomizedTimeline from "./TimeLine";
import ButtonSubmit from "../../components/Common/ButtonSubmit";

const Observations = (props) => {

    const {getCustomer, comments} = props;
    const [comment, setComment] = useState(undefined);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        if (comments && comments.length > 0) {
            setCommentList(comments);
        }
    }, [comments]);

    const onDelete = (id) => {
        console.log(id);

        //CALL SERVICE
        const list = [...commentList];
        const item = list.find(cl => cl.id === id);
        list.splice(list.indexOf(item), 1);
        setCommentList(list);
    }

    const handleValidSubmit = (event, values) => {
        if (!comment || comment === '') return;
        setComment(undefined);
        event.target.reset();

        const list = [...commentList];
        list.push({id: new Date().getTime(), user: "Usuario 1", comment: comment, date: new Date()});
        setCommentList(list);
    }

    return (
        <React.Fragment>
            <Card id={''} className="p-3">
                <Row>
                    <Col md={12}>
                        <h4 className="card-title text-info">Agregar observacion</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <AvForm className="needs-validation" autoComplete="off" onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                            <Row>
                                <Col md={10}>
                                    <input id={"comment"} name={"comment"} className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} required/>
                                </Col>
                                <Col md={2}>
                                    <ButtonSubmit loading={props.loading}/>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                    <Col md={12}>
                        <hr/>
                        <h4 className="card-title text-info">Observaciones</h4>
                    </Col>
                    <Col md={12}>
                        {commentList.length > 0 ? (<CustomizedTimeline data={commentList} onDelete={onDelete}/>) : "No hay observaciones"}
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    const {error, customer, loading} = state.Customer
    return {error, customer, loading}
}

export default withRouter(
    connect(mapStateToProps, {getCustomer})(Observations)
)

Observations.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object
}