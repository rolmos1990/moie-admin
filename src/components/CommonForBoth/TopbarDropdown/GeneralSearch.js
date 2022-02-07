import React, {useEffect, useState} from "react"
import Conditionals from "../../../common/conditionals";
import {generateReportRestart} from "../../../store/reports/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategoriesApi, fetchCustomersApi, fetchProductsApi} from "../../../helpers/backend_helper";

const PREFIXES = {
    PRODUCT: "p:",
    CUSTOMER: "c:",
    CATEGORY: "ca:"
}

const GeneralSearch = (props) => {
    const [text, setText] = useState(null)
    const [prefix, setPrefix] = useState(null)

    useEffect(() => {
        if (prefix === PREFIXES.PRODUCT) {
            findProduct();
        }
        if (prefix === PREFIXES.CUSTOMER) {
            findCustomer();
        }
        if (prefix === PREFIXES.CATEGORY) {
            findCategory();
        }
    }, [prefix])

    const search = (e) => {
        e.preventDefault();
        let pre = null;
        Object.keys(PREFIXES).forEach(pre => {
            if (text.toLowerCase().startsWith(PREFIXES[pre])) {
                pre = PREFIXES[pre];
            }
        })
        if (null === pre) {
            if (props.history.location.pathname === '/products') {
                pre = PREFIXES.PRODUCT;
            } else if (props.history.location.pathname === '/customers') {
                pre = PREFIXES.CUSTOMER;
            } else if (props.history.location.pathname === '/categories') {
                pre = PREFIXES.CATEGORY;
            }
        }
        setPrefix(pre)
    };

    const findProduct = () => {
        const params = parseConditions("reference");
        fetchProductsApi(params).then((p => {
            if (p && p.data && p.data.length > 0) {
                props.history.push(`/product/detail/${p.data[0].id}`);
            }
        }))
    };

    const findCustomer = () => {
        const params = parseConditions("name");
        fetchCustomersApi(params).then((p => {
            if (p && p.data && p.data.length > 0) {
                props.history.push(`/customer/detail/${p.data[0].id}`);
            }
        }))
    };

    const findCategory = () => {
        const params = parseConditions("name");
        fetchCategoriesApi(params).then((p => {
            if (p && p.data && p.data.length > 0) {
                props.history.push(`/category/${p.data[0].id}`);
            }
        }))
    };

    const parseConditions = (fieldName) => {
        const conditions = new Conditionals.Condition;
        conditions.add(fieldName, text.replace(prefix, ""), Conditionals.OPERATORS.EQUAL);
        const cond = Conditionals.getConditionalFormat(conditions.all());
        return Conditionals.buildHttpGetQuery(cond, 1);
    };

    return (
        <>
            <form className="app-search d-none d-lg-block" onSubmit={search}>
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                        onChange={(e) => setText(e.target.value)}
                    />
                    <span className="uil-search"></span>
                </div>
            </form>
        </>
    )
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    onRestartReport: () => dispatch(generateReportRestart()),
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GeneralSearch)
)



