/*
*  {field: 1, operator: $lk, value: 1, value: 2}
* */

/* recibe un arreglo de objetos y lo transforma en una condicion */
function getConditionalFormat(options) {
    if(options && options.length > 0){
        let conditions = options.map(item => {
            if(!item.moreValues) {
                return (item.field + item.operator + item.value)
            } else {
                item.moreValues = item.moreValues.join("::");
                return (item.field + item.operator + item.value + "::" + item.moreValues)
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
    if(offset || offset == 0){
        data.offset = offset;
    }

    const searchParams = new URLSearchParams(data);
    return searchParams;
}

/* recibe field, value, operador y en caso de tener 2 o mas valores moreValues (Array) */
class Condition {
    condition = [];
    add(field, value, operator = null, moreValues = []){
        if(operator === null){
            this.condition.push({field, value, operator: "::"});
        } else if(moreValues.length > 0){
            this.condition.push({field, value, operator, moreValues});
        } else {
            if([OPERATORS.TRUE, OPERATORS.FALSE].includes(operator)){
                this.condition.push({field, value:"", operator});
            }
            else {
                this.condition.push({field, value, operator});
            }
        }
    }
    all(){
        return this.condition;
    }
}

const OPERATORS = {
    EQUAL: '::',
    LK: '$lk',
    NULL: '$null',
    NOT_NULL: '$nnull',
    TRUE: '$true',
    FALSE: '$false',
    NOT_EMPTY: '$nempty',
    EMPTY: '$empty',
    NOT_LIKE: '$nlk',
    LIKE: '$lk',
    NOT_BETWEEN: '$nbt',
    BETWEEN: '$bt',
    LESS_THAN_OR_EQUAL: '$lte',
    LESS_THAN: '$lt',
    GREATER_THAN_OR_EQUAL: '$gte',
    GREATER_THAN: '$gt',
    NOT_IN: '$nin',
    IN: '$in'
};

const Conditionals = {
    Condition,
    buildHttpGetQuery,
    getConditionalFormat,
    OPERATORS
};

export default Conditionals;
