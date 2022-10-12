import React, {Component, useEffect, useState} from "react"
import {countUsersOrders} from "../../helpers/service";
import {connect} from "react-redux";
import {priceFormat} from "../../common/utils";
import FlipMove from 'react-flip-move';
import userImage from "../../assets/images/users/user.png"
import {baseImagePathNew} from "../../helpers/api_helper";

class ListItem extends Component {
    render() {
        const listClass = `list-item card`;
        const style = {zIndex: 100 - this.props.index, float: 'left', margin: '0 2px'};
        const user = this.props.user;

        return (
            <li id={this.props.key} className={listClass} style={style}>
                <div style={{display: 'flex', alignItems: 'center', margin: '0 5px'}}>
                    <img src={user.image} className="rounded-circle header-profile-user" alt="user-pic"/>
                    <div className="flex-1">
                        <small className="mt-0 mb-1">{user.hasCrown && <i className={"mdi mdi-crown mr-1 text-warning"}> </i>}{user.name} </small>
                        <br/>
                        <small><small className="m-0">Pedidos: <b>{user.sales}</b></small></small>
                    </div>
                </div>
            </li>
        );
    }
};

const FooterUsers = ({data, user}) => {

    const [currentTimeout, setCurrentTimeout] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        getData();
    }, [data])

    const findData = () => {
        countUsersOrders().then(resp => {
            if (resp && resp.data && resp.data.length > 0) {
                let u = [];
                resp.data.filter(o => o.user && o.user.id).forEach((o, i) => u.push({
                    id: o.user.id,
                    name: o.user.name,
                    sales: o.origen,
                    amount: priceFormat(o.totalAmount),
                    image: o.user.photo ? baseImagePathNew + '/' + o.user.photo : userImage
                }));

                const limit = 6;

                u = u.sort((a, b) => a.sales === b.sales ? 0 : (a.sales > b.sales) ? 1 : -1);

                if (u.length > limit) {
                    u.splice(limit);
                }

                if (u.length > 0) {
                    let user = u[u.length - 1];
                    user.hasCrown = true;
                }
                setUsers(u);
            }
        });
    }

    const getData = () => {
        if (!user || !user.id) {
            return;
        }
        findData();
        let newTimeout = setTimeout(() => {
            getData();
        }, 45000);

        if (currentTimeout) clearTimeout(currentTimeout);
        setCurrentTimeout(newTimeout);
    }

    const render = () => {
        return users.map((user, i) => (
            <ListItem
                key={user.id}
                index={i}
                user={user}
            />
        ))
    }

    return (
        <React.Fragment>
            <FlipMove
                staggerDurationBy="30"
                duration={500}
                enterAnimation={"accordionHorizontal"}
                leaveAnimation='accordionHorizontal'
                typeName="ul"
            >
                {render()}
            </FlipMove>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {user} = state.Login
    return {user}
}
const mapDispatchToProps = dispatch => ({
    countUsersOrders,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterUsers)

