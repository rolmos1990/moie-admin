import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Card, CardBody, Col, Row} from "reactstrap"
import paginationFactory, {PaginationListStandalone, PaginationProvider,} from "react-bootstrap-table2-paginator"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import {Link} from "react-router-dom"
import {Button, Tooltip} from "@material-ui/core";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {ConfirmationModalAction} from "../../../components/Modal/ConfirmationModal";
import {TableFilter} from "../../../components/TableFilter";
import {normalizeColumnsList} from "../../../common/converters";
import {doCatalogPrintBatchRequest, getCategories} from "../../../store/category/actions";
import categoryColumns from "./categoryColumn";
import Conditionals from "../../../common/conditionals";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import StatsStatusCard from "../../../components/Common/StatsStatusCard";
import StatsRegisteredCard from "../../../components/Common/StatsRegisteredCard";
import CountUp from "react-countup";
import {getCatalogBatchRequest} from "../../../helpers/service";
import {formatDate} from "../../../common/utils";
import {resetProduct} from "../../../store/product/actions";

const CategoryList = props => {
    const {categories, onGetCategories, onResetCategories, onDeleteState, getCatalogBatchRequest, onCatalogPrintBatchRequest, refresh} = props;
    const [categoriesList, setCategoriesList] = useState([])
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [printCategoriesId, setPrintCategoriesId] = useState([]);
    const [catalogs, setCatalogs] = useState([]);

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        //totalSize: meta?.totalRegisters, // replace later with size(users),
        custom: true,
    }

    useEffect(() => {
        if(currentPage) onGetCategories(conditional, DEFAULT_PAGE_LIMIT,currentPage*DEFAULT_PAGE_LIMIT);
        onGetCatalogBatchRequest();
    }, [refresh])

    useEffect(() => {
        onResetCategories();
        onGetCategories();
        onGetCatalogBatchRequest();
    }, [onGetCategories])

    useEffect(() => {
        setCategoriesList(categories)
    }, [categories])

    // eslint-disable-next-line no-unused-vars
    const handleTableChange = (type, {page, searchText}) => {
        let p = page - 1;
        setCurrentPage(p);
        onGetCategories(conditional, DEFAULT_PAGE_LIMIT, p*DEFAULT_PAGE_LIMIT);
    }

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetCategories(condition, DEFAULT_PAGE_LIMIT, 0);
    }
    const onConfirmDelete = (id) => {
        onDeleteState(id);
    };
    const onGetCatalogBatchRequest = () => {
        getCatalogBatchRequest().then(resp => {
            if(resp && resp.data && resp.data.length > 0){
                let arr = [...resp.data];
                arr = arr.sort((a, b) => a.id === b.id ? 0 : (a.id > b.id) ? -1 : 1);
                if(arr.length > 4){
                    arr.splice(4);
                }
                setCatalogs(arr);
            }
        });
    };

    const onDelete = (id) => {
        ConfirmationModalAction({
            title: '¿Seguro desea eliminar el Estado?',
            description: 'Usted está eliminado este Estado, una vez eliminado no podrá ser recuperado.',
            id: '_clienteModal',
            onConfirm: () => onConfirmDelete(id)
        });
    };

    const printCatalogs= () => {
        let conditionals = conditional || [];

        if(printCategoriesId && printCategoriesId.length === 1){
            conditionals.push({field:'id', value:printCategoriesId[0], operator: Conditionals.OPERATORS.EQUAL});
        }
        if(printCategoriesId && printCategoriesId.length > 1){
            conditionals.push({field:'id', value:printCategoriesId.join('::'), operator: Conditionals.OPERATORS.IN});
        }
        onCatalogPrintBatchRequest(conditionals);
    }

    const columns = categoryColumns(onDelete);

    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: (row) => {
            let list = [...printCategoriesId]
            const index = list.indexOf(row.id);
            if(index >= 0){
                list.splice(index, 1);
            } else{
                list.push(row.id);
            }
            setPrintCategoriesId(list);
        },
        onSelectAll: (rows) => {
            setPrintCategoriesId([]);
        }
    };

    return (
        <>
            {!!(catalogs && catalogs.length > 0) && (
                <Row className="text-center">
                    {catalogs.map((catalog, k) => (
                        <Col sm={6} md={3} key={k}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col xs={8}>
                                            <h5 className="mb-1 mt-2"> Catálogo</h5>
                                            <div className="text-muted mb-0 mt-3">
                                                <small>{formatDate(catalog.createdAt)}</small>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <Tooltip placement="bottom" title="Imprimir Catálogo" aria-label="add">
                                                <Button color="primary" onClick={() => onCatalogPrintBatchRequest(null, catalog)}>
                                                    <i className="mdi mdi-printer font-size-24"> </i>
                                                </Button>
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}

                </Row>
            )}
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
                                        data={categoriesList || []}
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
                                                            <h4 className="text-info"><i className="uil-box me-2 me-2"></i> Categorias</h4>
                                                            {/*{!filter && (
                                                                <div className="position-relative">
                                                                    <SearchBar {...toolkitProps.searchProps}/>
                                                                    <i className="mdi mdi-magnify search-icon"> </i>
                                                                </div>
                                                            )}*/}
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
                                                            <Tooltip placement="bottom" title="Impresión multiple" aria-label="add">
                                                                <Button color="primary" onClick={() => printCatalogs()} disabled={printCategoriesId.length === 0 && (!conditional || conditional.length === 0)}>
                                                                    <i className="mdi mdi-printer"> </i>
                                                                </Button>
                                                            </Tooltip>
                                                            <Link to={"/category"} className="btn btn-primary waves-effect waves-light text-light">
                                                                <i className="mdi mdi-plus"> </i> Nueva Categoria
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl="12">
                                                        <div className="table-responsive mb-4">
                                                            <BootstrapTable
                                                                selectRow={selectRowProp}
                                                                remote
                                                                responsive
                                                                loading={true}
                                                                bordered={false}
                                                                striped={true}
                                                                classes={"table table-centered table-nowrap mb-0"}
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
        </>

    )
}

CategoryList.propTypes = {
    categories: PropTypes.array,
    onGetCategories: PropTypes.func,
    // onDeleteStates: PropTypes.func,
}

const mapStateToProps = state => {
    const {categories, loading, meta, refresh} = state.Category
    return {categories, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onResetCategories: () => {
        dispatch(resetProduct());
    },
    onGetCategories: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getCategories(conditional, limit, page)),
    onCatalogPrintBatchRequest: (conditional, catalog ) => dispatch(doCatalogPrintBatchRequest(conditional, catalog)),
    getCatalogBatchRequest,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)
