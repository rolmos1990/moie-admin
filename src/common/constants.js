export const BOOLEAN_STRING = {
    YES: 'Si',
    NO: 'No'
}

export const STATUS = {
    ACTIVE: true,
    INACTIVE: false
};


//FIELD OPTIONS GROUPS
export const GROUPS = {
    REFERENCE_KEY: 'REFERENCE_KEY',
    MATERIALS: 'MATERIALS',
    PROVIDERS: 'PROVIDERS',
    ORDERS_ORIGIN: 'ORDERS_ORIGIN',
    MAYORISTA_DISC: 'MAYORISTA_DISC',
    OP_GROUPS: 'GROUPS',
    CUSTOMER_OBSERVATIONS: 'CUSTOMER_OBSERVATIONS',
    ORDER_OBSERVATIONS: 'ORDER_OBSERVATIONS',
    TEMPLATE_MENTIONS: 'TEMPLATE_MENTIONS',
};
//FIELD OPTIONS NAMES
export const NAMES = {
    PRODUCT: 'PRODUCT',
};
export const COMMENT_ENTITIES = {
    CUSTOMER: 'customer',
    ORDER: 'order',
};

export const DELIVERY_TYPES = [
    {id: 1, name: "PREVIOUS_PAYMENT", label: "PREVIO PAGO"},
    {id: 2, name: "PAY_ONLY_DELIVERY", label: "PREVIO PAGO COD"},
    {id: 3, name: "CHARGE_ON_DELIVERY", label: "CONTRA PAGO"}
]

export const DELIVERY_METHODS_PAYMENT_TYPES = ['MENSAJERO'];

export const DELIVERY_METHODS = {
    INTERRAPIDISIMO: 'INTERRAPIDISIMO',
    MENSAJERO: 'MENSAJERO',
};
export const DELIVERY_METHODS_LIST = Object.keys(DELIVERY_METHODS).map((k,i) => ({label: DELIVERY_METHODS[k], value: i+1}));

export const PAYMENT_TYPES = {
    CASH: 'EFECTIVO',
    TRANSFER: 'TRANSFERENCIA',
};

export const PAYMENT_TYPES_LIST = Object.keys(PAYMENT_TYPES).map(k => ({label: PAYMENT_TYPES[k], value: PAYMENT_TYPES[k]}));

export const ORDER_STATUS = {
    1: {name: 'Pendiente', color:'danger', colorCss: "#f44336"},
    2: {name: 'Confirmada', color:'success', colorCss: "#4caf50"},
    3: {name: 'Impresa', color:'warning', colorCss: "#ffeb3b"},
    4: {name: 'Enviada', color:'warning', colorCss: "#ffeb3b"},
    5: {name: 'Conciliada', color:'info', colorCss: "#2196f3"},
    6: {name: 'Anulada', color:'info', colorCss: "#2196f3"},
};

export const ORDER_STATUS_LIST = Object.keys(ORDER_STATUS).map(s => ({label:ORDER_STATUS[s].name, value:s}))
