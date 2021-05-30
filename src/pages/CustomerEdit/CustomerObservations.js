import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "reactstrap"
import {Card, Tooltip} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {formatDate} from "../../common/utils";
import NoDataIndication from "../../components/Common/NoDataIndication";
import {getCustomer} from "../../store/customer/actions";
import OrderCardList from "../Orders/OrderCardList";
import {STATUS_COLORS, StatusField} from "../../components/StatusField";
import {ConverterCustomerStatus} from "../Customer/customer_status";
import Observations from "../../components/Common/Observations";
import {deleteFieldOption, getFieldOptionByGroup, registerFieldOption, updateFieldOption} from "../../store/fieldOptions/actions";
import {GROUPS} from "../../common/constants";

const CustomerObservations = (props) => {

    const {onGetCustomerObservations, onGetByGroup, customerId, fieldOptions} = props;
    const [observationsSuggested, setObservationsSuggested] = useState([]);

    useEffect(() => {
        // onGetCustomerObservations(customerId);
        onGetByGroup(GROUPS.CUSTOMER_OBSERVATIONS);
    }, [onGetCustomerObservations]);

    useEffect(() => {
        if (fieldOptions && fieldOptions.length > 0) {
            setObservationsSuggested(fieldOptions.filter(item => item.groups === GROUPS.CUSTOMER_OBSERVATIONS).map(item => item.value))
        }
    }, [fieldOptions])

    const onDeleteObservation = (observation) => {
        console.log('onDeleteObservation', observation);
    }

    const onAddObservation = (observation) => {
        console.log('onAddObservation', observation);
    }

    return (
        <React.Fragment>
            <Observations
                observations={[]}
                onAddObservation={onAddObservation}
                onDeleteObservation={onDeleteObservation}
                observationsSuggested={observationsSuggested}/>
        </React.Fragment>
    ) ;
}

const mapStateToProps = state => {
    const {error, customer, loading} = state.Customer
    const {fieldOptions} = state.FieldOption
    return {error, customer,fieldOptions, loading}
}

const mapDispatchToProps = dispatch => ({
    onGetCustomerObservations: (id) => dispatch(getCustomer(id)),
    onGetByGroup: (group) => dispatch(getFieldOptionByGroup(group, 500, 0)),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CustomerObservations)
)

CustomerObservations.propTypes = {
    customerId: PropTypes.number.isRequired,
    error: PropTypes.any,
    history: PropTypes.object
}