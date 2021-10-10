import React, {useEffect, useState} from "react"
import {countUsersOrders} from "../../helpers/service";
import {connect} from "react-redux";
import {priceFormat} from "../../common/utils";
import avatar3 from "../../assets/images/users/avatar-3.jpg";

const FooterUsers = ({data}) => {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [mainUser, setMainUser] = useState({})

    useEffect(() => {
        findData();
    }, [data])

    const findData = () => {
        setLoading(true);
        countUsersOrders().then(resp => {
            setLoading(false);
            if (resp && resp.data && resp.data.length > 0) {
                let u = [];
                resp.data.filter(o => o.user && o.user.id).forEach(o => u.push({name: o.user.name, sales: o.origen, amount: priceFormat(o.totalAmount), image: avatar3}))
                u = u.sort((a, b) => a.sales === b.sales ? 0 : (a.sales > b.sales) ? -1 : 1);


                u.push(u[0])
                u.push(u[0])
                u.push(u[0])
                u.push(u[0])
                u.push(u[0])
                u.push(u[0])
                u.push(u[0])

                if (u.length > 6) {
                    u.splice(6);
                }
                setUsers(u);
                setMainUser(u[0]);
            }
        });
    }
    return (
        <React.Fragment>
            {users.map((user, k) => (
                <div key={k} style={{display: 'flex', alignItems: 'center', margin: '0 5px'}}>
                    <img src={user.image} className="rounded-circle header-profile-user" alt="user-pic"/>
                    <div className="flex-1">
                        <small className="mt-0 mb-1">{k === 0 && <i className={"mdi mdi-crown mr-1 text-warning"}> </i>}{user.name} </small>
                        <br/>
                        <small><small className="m-0">Pedidos: <b>{user.sales}</b></small></small>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => ({
    countUsersOrders,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterUsers)

