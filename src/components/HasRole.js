import {connect} from 'react-redux';
import PropTypes from "prop-types";

const HasRole = ({roles, role, children, renderNoAccess}) => {
    if (role === "public") {
        return children;
    }

    if (!roles || roles.length === 0 || !roles.includes(role)) {
        return renderNoAccess ? renderNoAccess() : null;
    }
    return children;
};

HasRole.propTypes = {
    role: PropTypes.string.isRequired,
    renderNoAccess: PropTypes.func
}

const mapStateToProps = (state, props) => ({
    roles: state.Login.roles || []
})

export default connect(mapStateToProps)(HasRole);
