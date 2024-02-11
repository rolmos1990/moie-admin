import React, {useEffect, useState} from "react";
import {Card, CardBody, Table} from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"

//Import Image
import {DEFAULT_PAGE_LIMIT} from "../../common/pagination";
import {getUsers} from "../../store/user/actions";
import {connect} from "react-redux";
import {fetchEventsApi, fetchInventoryProductsApi, fetchProductsApi} from "../../helpers/backend_helper";
import CountUp from "react-countup";
import {PERMISSIONS} from "../../helpers/security_rol";
import HasPermissions from "../../components/HasPermissions";
import {getEvents} from "../../store/items/actions";
import {getFieldOptionByGroups} from "../../store/fieldOptions/actions";
import {GROUPS} from "../../common/constants";

const EventItems = (props) => {
    const {onGetEvents, onGetFieldOptions, fieldOptions} = props;
    const [interrapidisimo, setInterrapidisimo] = useState({});
    const [bolsas, setBolsas] = useState({});
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        fetchEventsApi({}).then((p => {
            const event = p.event;
            setInterrapidisimo((event.filter(item => item.eventType == 1))[0]);
            setBolsas((event.filter(item => item.eventType == 2))[0]);
        }))

    }, [onGetEvents])

    useEffect(() => {
        if (onGetFieldOptions) {
            onGetFieldOptions();
        }
    }, [onGetFieldOptions]);

    useEffect(() => {
        if (fieldOptions && fieldOptions.length > 0) {
            const alarms = fieldOptions.filter(op => (op.groups === GROUPS.ALARMS)).map(op => {
                return {label: op.name, value: op.value};
            });
            setAlarms(alarms);
            console.log('alarms: ', alarms);
        } else {
            setAlarms([]);
        }
    }, [fieldOptions]);


    const getLimitColor = (type, value) => {
        if(alarms.length <= 0){
            return value;
        }
        const limits = alarms;
        const val = parseInt(value);
        const down = (limits.filter(item => item.label === type+'_DOWN'))[0];
        const medium = (limits.filter(item => item.label === type+'_MEDIUM'))[0];

        console.log('d- down: ', down);
        console.log('d- medium: ', medium);
        console.log('d- current value: ', value);

        console.log('d- is less: ', val, parseInt(down['value']));

        if(val < parseInt(down['value'])){
            return <p class="text-danger">{value}</p>
        } else if(val < parseInt(medium['value'])){
            return <p class="text-warning">{value}</p>
        } else {
            return <p class="text-success">{value}</p>
        }
    }

    const renderInventario = () => {
        return <Card>
            <CardBody>
                <h5>Alarmas</h5> <br />
                <div>
                    <h4 className="mb-1 mt-1">
                        <span>
                            <i class="me-2"></i> &nbsp; {getLimitColor('ICREDIT', interrapidisimo.amount)}
                        </span>
                    </h4>
                    <p className="text-muted mb-0">Credito Interrapidisimo</p>
                </div>

                <div>
                    <h4 className="mb-1 mt-1">
                        <span>
                            <i class="me-2"></i> &nbsp; {getLimitColor('BAGS', bolsas.amount)}
                        </span>
                    </h4>
                    <p className="text-muted mb-0">Bolsas</p>
                </div>
            </CardBody>
        </Card>
    }


    return (
        <React.Fragment>
            <HasPermissions permission={PERMISSIONS.DASHBOARD_INVENTORY} renderNoAccess={renderInventario}>

            </HasPermissions>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {fieldOptions} = state.FieldOption
    const {items, loading, meta, refresh} = state.Item
    return {items, loading, meta, refresh, fieldOptions}
}
const mapDispatchToProps = dispatch => ({
    onGetFieldOptions: (conditional = null, limit = 500, page) => dispatch(getFieldOptionByGroups([GROUPS.ALARMS], limit, page)),
    onGetEvents: () => dispatch(getEvents()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventItems)
