import {connect} from 'react-redux';
import PropTypes from "prop-types";

const HasRole = ({roles, role, children, renderNoAccess}) => {
    if (role === "public") {
        return children;
    }

    if (!roles || roles.length === 0 || !roles.includes(role)) {
        return children;
        //return renderNoAccess ? renderNoAccess() : null;
    }
    return children;
};

HasRole.propTypes = {
    role: PropTypes.string.isRequired,
    renderNoAccess: PropTypes.func
}

const mapStateToProps = (state, props) => {
    const {user} = state.Login;
    let roles = [];
    if (user && user.securityRol) {
        roles = user.securityRol.permissions;
    }
    return [
        roles
    ];


}

export default connect(mapStateToProps)(HasRole);
