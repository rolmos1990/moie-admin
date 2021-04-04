import {Card, CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {DEFAULT_PAGE_LIMIT} from "../../../common/pagination";
import {connect} from "react-redux";
import {getProducts} from "../../../store/product/actions";
import React, {useEffect, useState} from "react";
import {TableFilter} from "../../../components/TableFilter";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import {normalizeColumnsList} from "../../../common/converters";
import {Button, Tooltip} from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import NoDataIndication from "../../../components/Common/NoDataIndication";
import productColumns from "./productColumn";

const ProductList = props => {

    const {refresh, onGetProducts, products, meta} = props;
    const [productList, setProductList] = useState([]);
    const [filter, setFilter] = useState(false);
    const [conditional, setConditional] = useState(null);
    const {SearchBar} = Search

    const pageOptions = {
        sizePerPage: DEFAULT_PAGE_LIMIT,
        totalSize: meta?.totalRegisters,
        custom: true,
    };
    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
    };

    useEffect(() => {
        onGetProducts();
    }, [refresh])

    useEffect(() => {
        onGetProducts()
    }, [onGetProducts])

    useEffect(() => {
        setProductList(products)
    }, [products])

    const onFilterAction = (condition) => {
        setConditional(condition);
        onGetProducts(condition, DEFAULT_PAGE_LIMIT, 0);
    }

    const handleTableChange = (type, {page, searchText}) => {
        onGetProducts(conditional, DEFAULT_PAGE_LIMIT, page - 1);
    }


    const columns = productColumns();

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
                                    data={productList || []}
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
                                                            <Tooltip placement="bottom" title="Filtros Avanzados" aria-label="add">
                                                                <Button onClick={() => setFilter(!filter)}>
                                                                    <i className={"mdi mdi-filter"}> </i>
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <Link to={"/product"} className="btn btn-primary waves-effect waves-light text-light">
                                                            <i className="mdi mdi-plus"> </i> Nuevo Producto
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
                                                            onTableChange={handleTableChange}
                                                            {...toolkitProps.baseProps}
                                                            {...paginationTableProps}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="float-sm-end">
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

ProductList.propTypes = {
    onGetProducts: PropTypes.func,
    products: PropTypes.array,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    refresh: PropTypes.bool,
}

const mapStateToProps = state => {
    const {products, loading, meta, refresh} = state.Product
    return {products, loading, meta, refresh}
}

const mapDispatchToProps = dispatch => ({
    onGetProducts: (conditional = null, limit = DEFAULT_PAGE_LIMIT, page) => dispatch(getProducts(conditional, limit, page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
