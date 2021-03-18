/*
*  {field: 1, operator: $lk, value: 1, value: 2}
* */

/* recibe un arreglo de objetos y lo transforma en una condicion */
function getConditionalFormat(options) {
    if(options && options.length > 0){
        let conditions = options.map(item => {
            if(!item.value2) {
                return (item.field + item.operator + item.value)
            } else {
                return (item.field + item.operator + item.value + "::" + item.value2)
            }
        });
        conditions = conditions.join("|");
        return conditions;
    }
    return null;
}

/* Construye un formato valido para las peticiones GET (URL) */
function buildHttpGetQuery(cond = null, limit = null, offset = null){
    const data = {};
    if(cond){
        data.conditional = cond;
    }
    if(limit){
        data.limit = limit;
    }
    if(offset){
        data.offset = offset;
    }

    const searchParams = new URLSearchParams(data);
    return searchParams;
}

class Condition {
    condition = [];
    add(field, value, operator = null){
        if(operator === null){
            this.condition.push({field, value, operator: "::"});
        } else {
            this.condition.push({field, value, operator});
        }
    }
    all(){
        return this.condition;
    }
}

const OPERATORS = {
    EQUAL: '::',
    LK: '$lk',
};

const Conditionals = {
    Condition,
    buildHttpGetQuery,
    getConditionalFormat,
    OPERATORS
};

export default Conditionals;
