import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {Link} from "react-router-dom"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import {TableFilter} from "../../../components/TableFilter";
import {normalizeColumnsList} from "../../../common/converters";
import {getUsers} from "../../../store/user/actions";
import userColumns from "./userColumn";

const UserList = props => {
    const {users, meta, onGetUsers, onDeleteState, loading, refresh} = props;
    const [usersList, setCategoriesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta.totalRegisters, // replace later with size(users),
        custom: true,
    }
    const {SearchBar} = Search

    useEffect(() => {
        onGetUsers();
    }, [refresh])

    useEffect(() => {
        onGetUsers()
    }, [onGetUsers])

    useEffect(() => {
        setCategoriesList(users)
    }, [users])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        onGetUsers(conditional, DEFAULT_PAGE_LIMIT, (page - 1)*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetUsers(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        onDeleteState(id);
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar el Usuario?',
            description: 'Usted está eliminado este usuario, una vez eliminado no podrá ser recuperado.',
            id: '_clienteUserModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };

    const columns = userColumns(onDelete);

    const NoDataIndication = () => (
        <div className="spinner">
            <div className="rect1"/>
            <div className="rect2"/>
            <div className="rect3"/>
            <div className="rect4"/>
            <div className="rect5"/>
        </div>
    );
    return (
        <Row>
            <TableFilter
                onPressDisabled={() => setFilter(false)}
                isActive={filter}
                fields={columns}
                onSubmit={onFilterAction.bind(this)}/>

            <Col lg={filter ? "8" : "12"}>
                <Card>
                    <CardBody>
                        <PaginationProvider pagination={paginationFactory(pageOptions)}>
                            {({paginationProps, paginationTableProps}) => (
                                <ToolkitProvider
                                    keyField="id"
                                    data={usersList || []}
                                    columns={normalizeColumnsList(columns)}
                                    bootstrap4
                                    search
                                >
                                    {toolkitProps => (
                                        <React.Fragment>
                                            <Row className="row mb-2">
                                                <Col md={6}>
                                                    <div className="form-inline mb-3">
                                                        <div className="search-box ms-2">
                                                            {!filter && (
                                                                <div className="position-relative">
                                                                    <SearchBar {...toolkitProps.searchProps}/>
                                                                    <i className="mdi mdi-magnify search-icon"> </i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3 float-md-end">
                                                        {columns.some(s => s.filter) && (
                                                            <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add" >
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}> </i>
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <Link to={"/user"} className="btn btn-primary waves-effect waves-light text-light">
                                                            <i className="mdi mdi-plus"> </i> Nuevo usuario
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl="12">
                                                    <div className="table-responsive mb-4">
                                                        <BootstrapTable
                                                            remote
                                                            responsive
                                                            loading={true}
                                                            bordered={false}
                                                            striped={true}
                                                            classes={
                                                                "table table-centered table-nowrap mb-0"
                                                            }
                                                            noDataIndication={() => <NoDataIndication/>}
                                                            {...toolkitProps.baseProps}
                                                            onTableChange={handleTableChange}
                                                            {...paginationTableProps}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="float-sm-start">
                                                <PaginationListStandalone {...paginationProps} />
                                            </div>
                                        </React.Fragment>
                                    )}
                                </ToolkitProvider>
                            )}
                        </PaginationProvider>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

UserList.propTypes = {
    users: PropTypes.array,
    onGetUsers: PropTypes.func,
}

const mapStateToProps = state => {
    const {users, loading, meta, refresh} = state.User
    return {users, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetUsers: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getUsers(conditional, limit, page)),
    // onDeleteStates: (id) => dispatch(deleteState(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)
